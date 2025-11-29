import { BrowserWindow } from 'electron'
import LeagueConnect from 'league-connect'
import https from 'https'

const { authenticate, connect: connectWebSocket } = LeagueConnect
type LeagueWebSocket = Awaited<ReturnType<typeof connectWebSocket>>
type Credentials = Awaited<ReturnType<typeof authenticate>>

// LCU API için HTTPS agent (self-signed cert için)
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
})

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected'
export type GameflowPhase = 'None' | 'Lobby' | 'Matchmaking' | 'ReadyCheck' | 'ChampSelect' | 'GameStart' | 'InProgress' | 'WaitingForStats' | 'EndOfGame' | 'PreEndOfGame'

export interface LCUServiceCallbacks {
  onGameStart?: () => void
  onGameEnd?: () => void
  onGameflowChange?: (phase: GameflowPhase) => void
}

export class LCUService {
  private window: BrowserWindow | null
  private ws: LeagueWebSocket | null = null
  private credentials: Credentials | null = null
  private connectionStatus: ConnectionStatus = 'disconnected'
  private watchInterval: NodeJS.Timeout | null = null
  private isWatching: boolean = false
  private lastLoggedStatus: ConnectionStatus = 'disconnected'
  private connectionAttempts: number = 0
  private callbacks: LCUServiceCallbacks
  private currentGameflowPhase: GameflowPhase = 'None'

  constructor(window: BrowserWindow, callbacks: LCUServiceCallbacks = {}) {
    this.window = window
    this.callbacks = callbacks
  }

  /**
   * Pencere hala geçerli mi kontrol eder
   */
  private isWindowValid(): boolean {
    return this.window !== null && !this.window.isDestroyed()
  }

  /**
   * Güvenli bir şekilde renderer'a mesaj gönderir
   */
  private safeSend(channel: string, ...args: unknown[]): void {
    if (this.isWindowValid()) {
      this.window!.webContents.send(channel, ...args)
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  private setConnectionStatus(status: ConnectionStatus): void {
    // Sadece değişiklik varsa güncelle ve bildir
    if (this.connectionStatus !== status) {
      const previousStatus = this.connectionStatus
      this.connectionStatus = status
      this.safeSend('lcu:connectionChange', status)
      
      // Durum değişikliğini logla
      if (status === 'connected' && previousStatus !== 'connected') {
        console.log('[LCU] Status: Connected')
      } else if (status === 'disconnected' && previousStatus === 'connected') {
        console.log('[LCU] Status: Disconnected from League client')
      }
    }
  }

  async startWatching(): Promise<void> {
    if (this.isWatching) return
    this.isWatching = true

    // Sessiz başlangıç - sadece bir kez log
    console.log('[LCU] Watching for League client in background...')
    this.attemptConnection()

    // Poll for connection every 10 seconds (sessiz)
    this.watchInterval = setInterval(() => {
      if (this.connectionStatus === 'disconnected') {
        this.attemptConnection()
      }
    }, 10000)
  }

  stopWatching(): void {
    this.isWatching = false
    if (this.watchInterval) {
      clearInterval(this.watchInterval)
      this.watchInterval = null
    }
    // Pencere kapatılırken sessizce bağlantıyı kes
    if (this.ws) {
      try {
        this.ws.close()
      } catch {
        // WebSocket zaten kapalı olabilir
      }
      this.ws = null
    }
    this.credentials = null
    this.connectionStatus = 'disconnected'
    this.window = null
  }

  reconnect(): void {
    this.disconnect()
    this.attemptConnection()
  }

  private async attemptConnection(): Promise<void> {
    if (this.connectionStatus === 'connecting') return
    if (!this.isWindowValid()) return

    // Connecting durumunu UI'a bildirme - sessiz kalmalı
    // setConnectionStatus('connecting') yapmıyoruz, doğrudan deniyoruz
    this.connectionAttempts++

    try {
      // Try to authenticate with the League client
      this.credentials = await authenticate({
        awaitConnection: false,
        pollInterval: 1000
      })

      // Başarılı bağlantı - logla
      console.log('[LCU] ✓ Connected to League client!')

      // Create WebSocket connection using credentials
      this.ws = await connectWebSocket(this.credentials)

      this.setupWebSocketListeners()
      this.setConnectionStatus('connected')
      this.connectionAttempts = 0 // Reset counter

    } catch (error: any) {
      // Sessiz başarısızlık - sadece ilk denemede ve her 12 denemede (2 dakikada bir) logla
      if (this.connectionAttempts === 1 || this.connectionAttempts % 12 === 0) {
        console.log('[LCU] League client not running (will keep trying in background)')
      }
      this.setConnectionStatus('disconnected')
    }
  }

  private setupWebSocketListeners(): void {
    if (!this.ws) return

    // Listen for champion select session updates
    this.ws.subscribe('/lol-champ-select/v1/session', (data, event) => {
      if (!this.isWindowValid()) return
      
      if (event.eventType === 'Update' || event.eventType === 'Create') {
        const sessionData = this.parseChampSelectSession(data)
        this.safeSend('lcu:champSelectUpdate', sessionData)
      } else if (event.eventType === 'Delete') {
        this.safeSend('lcu:champSelectEnd')
      }
    })

    // Listen for gameflow phase changes (OYUN BAŞLADI/BİTTİ tespiti)
    this.ws.subscribe('/lol-gameflow/v1/gameflow-phase', (data) => {
      const phase = data as GameflowPhase
      this.handleGameflowChange(phase)
    })

    // Handle WebSocket close - sessiz
    this.ws.on('close', () => {
      if (this.isWindowValid()) {
        this.setConnectionStatus('disconnected')
      }
      this.ws = null
      this.credentials = null
    })
  }

  /**
   * Gameflow fazı değiştiğinde çağrılır
   */
  private handleGameflowChange(phase: GameflowPhase): void {
    const previousPhase = this.currentGameflowPhase
    this.currentGameflowPhase = phase

    console.log(`[LCU] Gameflow: ${previousPhase} -> ${phase}`)
    
    // Renderer'a bildir
    this.safeSend('lcu:gameflowChange', phase)
    
    // Callback çağır
    this.callbacks.onGameflowChange?.(phase)

    // Oyun başladığında
    if ((phase === 'InProgress' || phase === 'GameStart') && 
        previousPhase !== 'InProgress' && previousPhase !== 'GameStart') {
      console.log('[LCU] 🎮 GAME STARTED!')
      this.callbacks.onGameStart?.()
    }

    // Oyun bittiğinde
    if ((phase === 'EndOfGame' || phase === 'PreEndOfGame' || phase === 'None' || phase === 'Lobby') &&
        (previousPhase === 'InProgress' || previousPhase === 'GameStart')) {
      console.log('[LCU] 🏁 GAME ENDED!')
      this.callbacks.onGameEnd?.()
    }
  }

  /**
   * Mevcut gameflow fazını döndürür
   */
  getCurrentGameflowPhase(): GameflowPhase {
    return this.currentGameflowPhase
  }

  /**
   * Oyun içi veri çeker (aktif oyun)
   */
  async getActiveGame(): Promise<ActiveGameData | null> {
    try {
      const data = await this.lcuRequest('GET', '/lol-gameflow/v1/session') as any
      
      if (!data || !data.gameData) return null

      return {
        gameId: data.gameData.gameId,
        gameMode: data.gameData.gameMode,
        gameType: data.gameData.gameType,
        mapId: data.gameData.mapId,
        teamOne: data.gameData.teamOne || [],
        teamTwo: data.gameData.teamTwo || [],
        gameStartTime: data.gameData.gameStartTime,
        gameLength: data.gameData.gameLength
      }
    } catch (error) {
      console.error('[LCU] Failed to get active game:', error)
      return null
    }
  }

  private disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.credentials = null
    this.setConnectionStatus('disconnected')
  }

  // ==========================================
  // LCU API - ŞAMPIYON SEÇİMİ
  // ==========================================

  /**
   * LCU API'ye HTTP isteği gönderir
   */
  private async lcuRequest(method: string, endpoint: string, body?: unknown): Promise<unknown> {
    if (!this.credentials) {
      throw new Error('Not connected to League client')
    }

    const { port, password } = this.credentials
    const url = `https://127.0.0.1:${port}${endpoint}`
    const auth = Buffer.from(`riot:${password}`).toString('base64')

    return new Promise((resolve, reject) => {
      const options = {
        method,
        hostname: '127.0.0.1',
        port,
        path: endpoint,
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        rejectUnauthorized: false
      }

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(data ? JSON.parse(data) : null)
            } catch {
              resolve(data)
            }
          } else {
            reject(new Error(`LCU API Error: ${res.statusCode} - ${data}`))
          }
        })
      })

      req.on('error', reject)
      
      if (body) {
        req.write(JSON.stringify(body))
      }
      req.end()
    })
  }

  /**
   * Şampiyona hover yapar (pick intent)
   */
  async hoverChampion(championId: number): Promise<boolean> {
    try {
      // Önce mevcut aksiyonu al
      const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
      
      if (!session || session.localPlayerCellId === undefined) {
        console.log('[LCU] No active session for hover')
        return false
      }

      // Aksiyon ID'sini bul (isInProgress veya bekleyen aksiyon)
      const actionId = this.findCurrentActionId(session, 'pick')
      if (actionId === null) {
        console.log('[LCU] No pick action available for champion:', championId)
        console.log('[LCU] Session actions:', JSON.stringify(session.actions, null, 2))
        return false
      }

      console.log(`[LCU] Found action ID: ${actionId} for champion: ${championId}`)

      // Şampiyonu hover et
      await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/actions/${actionId}`, {
        championId
      })

      console.log(`[LCU] Hovered champion: ${championId}`)
      return true
    } catch (error) {
      console.error('[LCU] Hover failed:', error)
      return false
    }
  }

  /**
   * Şampiyonu kilitler (lock in)
   */
  async lockInChampion(championId: number): Promise<boolean> {
    try {
      console.log(`[LCU] Attempting to lock in champion: ${championId}`)
      
      // Session al
      const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
      
      if (!session || session.localPlayerCellId === undefined) {
        console.log('[LCU] No active session for lock in')
        return false
      }

      // Aksiyon ID'sini bul
      const actionId = this.findCurrentActionId(session, 'pick')
      
      if (actionId === null) {
        console.log('[LCU] No pick action available for lock')
        return false
      }

      console.log(`[LCU] Found action ${actionId}, selecting and locking champion ${championId}`)

      // Şampiyonu seç ve kilitle - tek seferde
      await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/actions/${actionId}`, {
        championId,
        completed: true // Bu flag ile hem seçim hem kilitleme yapılır
      })
      
      console.log(`[LCU] Successfully locked in champion: ${championId}`)
      return true
    } catch (error: any) {
      console.error('[LCU] Lock in failed:', error?.message || error)
      
      // Alternatif yöntem: PATCH + POST complete ayrı ayrı dene
      try {
        console.log('[LCU] Trying alternative lock method...')
        const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
        const actionId = this.findCurrentActionId(session, 'pick')
        
        if (actionId) {
          // Önce seç
          await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/actions/${actionId}`, {
            championId
          })
          
          // Sonra kilitle
          await this.lcuRequest('POST', `/lol-champ-select/v1/session/actions/${actionId}/complete`)
          
          console.log(`[LCU] Alternative method succeeded for champion: ${championId}`)
          return true
        }
      } catch (altError) {
        console.error('[LCU] Alternative lock method also failed:', altError)
      }
      
      return false
    }
  }

  /**
   * Şampiyonu banlar
   */
  async banChampion(championId: number): Promise<boolean> {
    try {
      console.log(`[LCU] Attempting to ban champion: ${championId}`)
      
      const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
      
      if (!session || session.localPlayerCellId === undefined) {
        console.log('[LCU] No active session for ban')
        return false
      }

      // Ban aksiyonunu bul
      const actionId = this.findCurrentActionId(session, 'ban')
      if (actionId === null) {
        console.log('[LCU] No ban action available')
        return false
      }

      console.log(`[LCU] Found ban action ${actionId}, banning champion ${championId}`)

      // Şampiyonu seç ve banla - tek seferde
      await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/actions/${actionId}`, {
        championId,
        completed: true
      })
      
      console.log(`[LCU] Successfully banned champion: ${championId}`)
      return true
    } catch (error: any) {
      console.error('[LCU] Ban failed:', error?.message || error)
      
      // Alternatif yöntem
      try {
        console.log('[LCU] Trying alternative ban method...')
        const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
        const actionId = this.findCurrentActionId(session, 'ban')
        
        if (actionId) {
          await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/actions/${actionId}`, {
            championId
          })
          await this.lcuRequest('POST', `/lol-champ-select/v1/session/actions/${actionId}/complete`)
          
          console.log(`[LCU] Alternative ban method succeeded for champion: ${championId}`)
          return true
        }
      } catch (altError) {
        console.error('[LCU] Alternative ban method also failed:', altError)
      }
      
      return false
    }
  }

  /**
   * Mevcut aksiyon ID'sini bulur
   */
  private findCurrentActionId(session: RawChampSelectSession, actionType: 'pick' | 'ban'): number | null {
    if (!session.actions) return null

    const localCellId = session.localPlayerCellId

    console.log(`[LCU] Looking for ${actionType} action for cell ${localCellId}`)

    // Önce in progress olan aksiyonu ara
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (
          action.actorCellId === localCellId &&
          action.type === actionType &&
          action.isInProgress &&
          !action.completed
        ) {
          console.log(`[LCU] Found in-progress action: ${action.id}`)
          return action.id
        }
      }
    }

    // In progress yoksa, tamamlanmamış herhangi bir aksiyonu ara
    // (bazen aksiyon henüz "in progress" olmadan seçilebilir)
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (
          action.actorCellId === localCellId &&
          action.type === actionType &&
          !action.completed
        ) {
          console.log(`[LCU] Found available action (not in progress): ${action.id}`)
          return action.id
        }
      }
    }

    console.log(`[LCU] No ${actionType} action found for player`)
    return null
  }

  /**
   * Bağlantı durumunu döndürür (API için)
   */
  isConnected(): boolean {
    return this.connectionStatus === 'connected' && this.credentials !== null
  }

  // ==========================================
  // RUNE PAGE - Rün Sayfası Yönetimi
  // ==========================================

  /**
   * Mevcut rün sayfalarını getirir
   */
  async getRunePages(): Promise<RunePage[]> {
    try {
      const data = await this.lcuRequest('GET', '/lol-perks/v1/pages') as any[]
      return data || []
    } catch (error) {
      console.error('[LCU] Failed to get rune pages:', error)
      return []
    }
  }

  /**
   * Aktif rün sayfasını getirir
   */
  async getCurrentRunePage(): Promise<RunePage | null> {
    try {
      const data = await this.lcuRequest('GET', '/lol-perks/v1/currentpage') as any
      return data
    } catch (error) {
      console.error('[LCU] Failed to get current rune page:', error)
      return null
    }
  }

  /**
   * Yeni rün sayfası oluşturur veya mevcut sayfayı günceller
   */
  async setRunePage(runePage: RunePageInput): Promise<boolean> {
    try {
      // Önce mevcut sayfaları al
      const pages = await this.getRunePages()
      
      // DraftBetter sayfasını bul
      const existingPage = pages.find(p => p.name === 'DraftBetter')
      
      if (existingPage && existingPage.id) {
        // Mevcut sayfayı güncelle
        await this.lcuRequest('DELETE', `/lol-perks/v1/pages/${existingPage.id}`)
      }
      
      // Yeni sayfa oluştur
      const newPage = {
        name: runePage.name || 'DraftBetter',
        primaryStyleId: runePage.primaryStyleId,
        subStyleId: runePage.subStyleId,
        selectedPerkIds: runePage.selectedPerkIds,
        current: true
      }
      
      await this.lcuRequest('POST', '/lol-perks/v1/pages', newPage)
      console.log('[LCU] Rune page created/updated successfully')
      return true
    } catch (error) {
      console.error('[LCU] Failed to set rune page:', error)
      return false
    }
  }

  /**
   * Rün sayfasını siler
   */
  async deleteRunePage(pageId: number): Promise<boolean> {
    try {
      await this.lcuRequest('DELETE', `/lol-perks/v1/pages/${pageId}`)
      return true
    } catch (error) {
      console.error('[LCU] Failed to delete rune page:', error)
      return false
    }
  }

  // ==========================================
  // SUMMONER SPELLS - Sihirdar Büyüleri
  // ==========================================

  /**
   * Şampiyon seçiminde sihirdar büyüsü seçer
   */
  async setSummonerSpells(spell1Id: number, spell2Id: number): Promise<boolean> {
    try {
      // Şampiyon seçimi oturumunu al
      const session = await this.lcuRequest('GET', '/lol-champ-select/v1/session') as RawChampSelectSession
      if (!session) {
        console.error('[LCU] No active champion select session')
        return false
      }

      const localCellId = session.localPlayerCellId
      
      // Spell'leri patch ile güncelle
      await this.lcuRequest('PATCH', `/lol-champ-select/v1/session/my-selection`, {
        spell1Id,
        spell2Id
      })
      
      console.log(`[LCU] Summoner spells set: ${spell1Id}, ${spell2Id}`)
      return true
    } catch (error) {
      console.error('[LCU] Failed to set summoner spells:', error)
      return false
    }
  }

  // ==========================================
  // SUMMONER DATA - Sihirdar Bilgileri
  // ==========================================

  /**
   * Mevcut sihirdarın bilgilerini getirir
   */
  async getCurrentSummoner(): Promise<SummonerInfo | null> {
    try {
      const data = await this.lcuRequest('GET', '/lol-summoner/v1/current-summoner') as any
      if (!data) return null

      return {
        puuid: data.puuid,
        summonerId: data.summonerId,
        accountId: data.accountId,
        displayName: data.displayName || data.gameName,
        gameName: data.gameName,
        tagLine: data.tagLine,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel
      }
    } catch (error) {
      console.error('[LCU] Failed to get current summoner:', error)
      return null
    }
  }

  /**
   * Sihirdarın ranked istatistiklerini getirir
   */
  async getRankedStats(): Promise<RankedStats | null> {
    try {
      const data = await this.lcuRequest('GET', '/lol-ranked/v1/current-ranked-stats') as any
      if (!data) return null

      const soloQueue = data.queueMap?.RANKED_SOLO_5x5
      const flexQueue = data.queueMap?.RANKED_FLEX_SR

      return {
        soloQueue: soloQueue ? {
          tier: soloQueue.tier,
          division: soloQueue.division,
          leaguePoints: soloQueue.leaguePoints,
          wins: soloQueue.wins,
          losses: soloQueue.losses,
          winRate: soloQueue.wins + soloQueue.losses > 0 
            ? Math.round((soloQueue.wins / (soloQueue.wins + soloQueue.losses)) * 100) 
            : 0
        } : null,
        flexQueue: flexQueue ? {
          tier: flexQueue.tier,
          division: flexQueue.division,
          leaguePoints: flexQueue.leaguePoints,
          wins: flexQueue.wins,
          losses: flexQueue.losses,
          winRate: flexQueue.wins + flexQueue.losses > 0 
            ? Math.round((flexQueue.wins / (flexQueue.wins + flexQueue.losses)) * 100) 
            : 0
        } : null
      }
    } catch (error) {
      console.error('[LCU] Failed to get ranked stats:', error)
      return null
    }
  }

  /**
   * Sihirdarın champion mastery verilerini getirir (ilk N şampiyon)
   */
  async getChampionMasteries(count: number = 20): Promise<ChampionMasteryData[] | null> {
    try {
      const data = await this.lcuRequest('GET', `/lol-collections/v1/inventories/local/champion-mastery-score`) as any
      const masteries = await this.lcuRequest('GET', `/lol-champion-mastery/v1/local-player/champion-mastery`) as any[]
      
      if (!masteries) return null

      return masteries.slice(0, count).map(m => ({
        championId: m.championId,
        championLevel: m.championLevel,
        championPoints: m.championPoints,
        lastPlayTime: m.lastPlayTime
      }))
    } catch (error) {
      console.error('[LCU] Failed to get champion masteries:', error)
      return null
    }
  }

  /**
   * Son maç geçmişini getirir
   */
  async getMatchHistory(count: number = 20): Promise<MatchHistoryEntry[] | null> {
    try {
      const data = await this.lcuRequest('GET', `/lol-match-history/v1/products/lol/current-summoner/matches?begIndex=0&endIndex=${count}`) as any
      
      if (!data?.games?.games) return null

      return data.games.games.map((game: any) => ({
        gameId: game.gameId,
        championId: game.participants?.[0]?.championId,
        win: game.participants?.[0]?.stats?.win || false,
        kills: game.participants?.[0]?.stats?.kills || 0,
        deaths: game.participants?.[0]?.stats?.deaths || 0,
        assists: game.participants?.[0]?.stats?.assists || 0,
        cs: (game.participants?.[0]?.stats?.totalMinionsKilled || 0) + (game.participants?.[0]?.stats?.neutralMinionsKilled || 0),
        gameMode: game.gameMode,
        gameDuration: game.gameDuration,
        timestamp: game.gameCreation,
        role: game.participants?.[0]?.timeline?.role,
        lane: game.participants?.[0]?.timeline?.lane
      }))
    } catch (error) {
      console.error('[LCU] Failed to get match history:', error)
      return null
    }
  }

  /**
   * Belirli şampiyonla oynanmış maçları filtreler ve istatistik hesaplar
   */
  async getChampionStats(championId: number, matchCount: number = 50): Promise<ChampionPersonalStats | null> {
    try {
      const matches = await this.getMatchHistory(matchCount)
      if (!matches) return null

      const championMatches = matches.filter(m => m.championId === championId)
      if (championMatches.length === 0) return null

      const wins = championMatches.filter(m => m.win).length
      const totalKills = championMatches.reduce((sum, m) => sum + m.kills, 0)
      const totalDeaths = championMatches.reduce((sum, m) => sum + m.deaths, 0)
      const totalAssists = championMatches.reduce((sum, m) => sum + m.assists, 0)
      const totalCS = championMatches.reduce((sum, m) => sum + m.cs, 0)
      const totalDuration = championMatches.reduce((sum, m) => sum + m.gameDuration, 0)

      return {
        championId,
        gamesPlayed: championMatches.length,
        wins,
        losses: championMatches.length - wins,
        winRate: Math.round((wins / championMatches.length) * 100),
        avgKills: Math.round((totalKills / championMatches.length) * 10) / 10,
        avgDeaths: Math.round((totalDeaths / championMatches.length) * 10) / 10,
        avgAssists: Math.round((totalAssists / championMatches.length) * 10) / 10,
        avgCS: Math.round(totalCS / championMatches.length),
        avgCSPerMin: totalDuration > 0 ? Math.round((totalCS / (totalDuration / 60)) * 10) / 10 : 0,
        kda: totalDeaths > 0 ? Math.round(((totalKills + totalAssists) / totalDeaths) * 100) / 100 : totalKills + totalAssists
      }
    } catch (error) {
      console.error('[LCU] Failed to get champion stats:', error)
      return null
    }
  }

  private parseChampSelectSession(data: unknown): ChampSelectSessionData {
    const session = data as RawChampSelectSession

    // Oyuncu için ban aksiyonu var mı kontrol et
    const hasBanActionForPlayer = this.playerHasBanAction(session)
    const hasBanActionInGame = this.gameHasAnyBanAction(session)
    
    // Antrenman/Practice modunu algıla
    const isPracticeMode = this.detectPracticeMode(session, hasBanActionInGame)

    // Determine current phase - daha detaylı algılama
    let phase: 'planning' | 'banning' | 'picking' | 'finalization' = 'planning'
    
    // Timer phase'den algıla
    const timerPhase = session.timer?.phase?.toLowerCase() || ''
    
    // Aktif aksiyonlardan faz algıla
    const activeAction = this.findActiveAction(session)
    
    // Kullanıcının şampiyonu kilitli mi kontrol et
    const userLocked = this.isUserChampionLocked(session)

    // FINALIZATION = Tüm seçimler tamamlandı
    if (timerPhase === 'finalization') {
      phase = 'finalization'
    }
    // Kullanıcı şampiyonunu kilitlediyse
    else if (userLocked) {
      phase = 'finalization'
    }
    // Öncelik: Aktif aksiyon > Timer phase
    else if (activeAction && activeAction.isInProgress) {
      // Aktif bir aksiyon var
      if (activeAction.type === 'ban' && !isPracticeMode) {
        phase = 'banning'
      } else if (activeAction.type === 'pick') {
        phase = 'picking'
      }
    } else if (timerPhase) {
      // Timer'dan algıla
      if (timerPhase.includes('ban') || timerPhase === 'ban_pick') {
        if (hasBanActionForPlayer && !isPracticeMode) {
          phase = 'banning'
        } else {
          phase = 'picking'
        }
      } else if (timerPhase.includes('pick') || timerPhase.includes('planning')) {
        phase = 'picking'
      }
    }
    
    // Parse teams
    let myTeam = session.myTeam?.map(this.parseTeamMember) ?? []
    const theirTeam = session.theirTeam?.map(this.parseTeamMember) ?? []
    
    // Actions'dan seçilen şampiyonları da al (daha güvenilir)
    if (session.actions) {
      const actionChampions = this.getChampionFromActions(session)
      
      // myTeam'deki oyuncuları actions'dan gelen verilerle güncelle
      myTeam = myTeam.map(member => {
        const actionChamp = actionChampions.get(member.cellId)
        if (actionChamp && actionChamp > 0 && member.championId === 0) {
          return { ...member, championId: actionChamp }
        }
        return member
      })
    }
    
    // Fallback: Hiçbir ban yoksa ve oyuncu varsa picking
    if (phase === 'planning' && (myTeam.length > 0 || isPracticeMode)) {
      phase = 'picking'
    }

    // Find local player's assigned position
    const localPlayer = session.myTeam?.find(m => m.cellId === session.localPlayerCellId)
    const userRole = this.mapPositionToRole(localPlayer?.assignedPosition)

    // Pick Intent'leri çıkar
    const { userPickIntent, teamPickIntents } = this.extractPickIntents(session)

    console.log('[LCU] Session parsed:', {
      phase,
      isPracticeMode,
      userPickIntent: userPickIntent?.championId,
      teamPickIntentsCount: teamPickIntents.length
    })

    return {
      phase,
      myTeam,
      theirTeam,
      userRole,
      localPlayerCellId: session.localPlayerCellId,
      bans: {
        myTeamBans: session.bans?.myTeamBans ?? [],
        theirTeamBans: session.bans?.theirTeamBans ?? []
      },
      isPracticeMode,
      userPickIntent,
      teamPickIntents
    }
  }

  /**
   * Pick Intent'leri çıkarır - hangi şampiyonu oynamak istiyorlar?
   */
  private extractPickIntents(session: RawChampSelectSession): { 
    userPickIntent: PickIntentData | null, 
    teamPickIntents: PickIntentData[] 
  } {
    let userPickIntent: PickIntentData | null = null
    const teamPickIntents: PickIntentData[] = []

    if (!session.myTeam) {
      return { userPickIntent, teamPickIntents }
    }

    for (const member of session.myTeam) {
      // Pick intent'i kontrol et (hover edilen ama henüz kilitlenmemiş)
      const intentChampId = member.championPickIntent || 0
      const lockedChampId = member.championId || 0
      
      // Intent veya locked varsa
      const champId = lockedChampId || intentChampId
      if (champId > 0) {
        const source: 'hover' | 'declared' | 'locked' = 
          lockedChampId > 0 ? 'locked' : 
          intentChampId > 0 ? 'declared' : 'hover'
        
        const pickIntent: PickIntentData = {
          championId: champId,
          championName: '', // Store'da doldurulacak
          source
        }

        // Local player mı?
        if (member.cellId === session.localPlayerCellId) {
          userPickIntent = pickIntent
          console.log(`[LCU] User pick intent: ${champId} (${source})`)
        } else {
          teamPickIntents.push(pickIntent)
        }
      }
    }

    return { userPickIntent, teamPickIntents }
  }

  /**
   * Actions'dan her oyuncunun seçtiği şampiyonu çıkarır
   */
  private getChampionFromActions(session: RawChampSelectSession): Map<number, number> {
    const result = new Map<number, number>()
    
    if (!session.actions) return result
    
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.type === 'pick' && action.championId > 0) {
          // cellId -> championId mapping
          result.set(action.actorCellId, action.championId)
        }
      }
    }
    
    return result
  }

  /**
   * Kullanıcının şampiyonu kilitli mi kontrol eder
   */
  private isUserChampionLocked(session: RawChampSelectSession): boolean {
    if (!session.actions) return false
    
    const localCellId = session.localPlayerCellId
    
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.actorCellId === localCellId && 
            action.type === 'pick' && 
            action.completed && 
            action.championId > 0) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Oyuncunun aktif aksiyonunu bulur (ban veya pick)
   */
  private findActiveAction(session: RawChampSelectSession): RawChampSelectAction | null {
    if (!session.actions) return null
    
    const localCellId = session.localPlayerCellId
    
    // Önce in progress olan aksiyonu ara
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.actorCellId === localCellId && action.isInProgress && !action.completed) {
          return action
        }
      }
    }
    
    // In progress yoksa, tamamlanmamış herhangi birini ara
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.actorCellId === localCellId && !action.completed) {
          return action
        }
      }
    }
    
    return null
  }

  /**
   * Oyuncunun aktif ban aksiyonu var mı kontrol eder
   */
  private playerHasBanAction(session: RawChampSelectSession): boolean {
    if (!session.actions) return false
    
    const localCellId = session.localPlayerCellId
    
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.actorCellId === localCellId && action.type === 'ban') {
          return true
        }
      }
    }
    return false
  }

  /**
   * Oyunda herhangi bir ban aksiyonu var mı kontrol eder
   */
  private gameHasAnyBanAction(session: RawChampSelectSession): boolean {
    if (!session.actions) return false
    
    for (const actionSet of session.actions) {
      for (const action of actionSet) {
        if (action.type === 'ban') {
          return true
        }
      }
    }
    return false
  }

  /**
   * Antrenman modunu algılar
   */
  private detectPracticeMode(session: RawChampSelectSession, hasBanAction: boolean): boolean {
    // 1. Hiç ban aksiyonu yoksa practice mode
    if (!hasBanAction) {
      console.log('[LCU] Practice mode: No ban actions in game')
      return true
    }

    // 2. Tek oyuncu kontrolü
    if (session.myTeam && session.myTeam.length === 1) {
      if (!session.theirTeam || session.theirTeam.length === 0) {
        console.log('[LCU] Practice mode: Single player, no enemy team')
        return true
      }
    }

    // 3. Pozisyon atanmamış oyuncu kontrolü (practice tool'da genellikle pozisyon yok)
    if (session.myTeam) {
      const localPlayer = session.myTeam.find(m => m.cellId === session.localPlayerCellId)
      if (localPlayer && !localPlayer.assignedPosition) {
        // Pozisyon yok ve rakip takım boş/az
        if (!session.theirTeam || session.theirTeam.length === 0) {
          console.log('[LCU] Practice mode: No assigned position, no enemies')
          return true
        }
      }
    }

    return false
  }

  private parseTeamMember = (member: RawTeamMember): TeamMember => {
    // Şampiyon ID'si birden fazla alanda olabilir
    // championId: Kilitlenmiş şampiyon
    // championPickIntent: Hover edilen şampiyon (henüz kilitlenmemiş)
    const championId = member.championId || member.championPickIntent || 0
    
    return {
      cellId: member.cellId,
      championId,
      assignedPosition: this.mapPositionToRole(member.assignedPosition),
      summonerId: member.summonerId,
      isLocalPlayer: false // Will be set by the store
    }
  }

  private mapPositionToRole(position?: string): Role | null {
    if (!position) return null
    const map: Record<string, Role> = {
      'top': 'Top',
      'jungle': 'Jungle',
      'middle': 'Mid',
      'bottom': 'ADC',
      'utility': 'Support'
    }
    return map[position.toLowerCase()] ?? null
  }
}

// Type definitions for LCU data
type Role = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'

interface RawChampSelectAction {
  id: number
  actorCellId: number
  championId: number
  type: 'pick' | 'ban'
  isInProgress: boolean
  completed: boolean
}

interface RawChampSelectSession {
  myTeam?: RawTeamMember[]
  theirTeam?: RawTeamMember[]
  timer?: { phase?: string }
  localPlayerCellId?: number
  bans?: {
    myTeamBans?: number[]
    theirTeamBans?: number[]
  }
  actions?: RawChampSelectAction[][]
}

interface RawTeamMember {
  cellId: number
  championId?: number
  championPickIntent?: number
  assignedPosition?: string
  summonerId?: number
  // LCU'dan gelen ek alanlar
  spell1Id?: number
  spell2Id?: number
  selectedSkinId?: number
  wardSkinId?: number
  team?: number
}

interface TeamMember {
  cellId: number
  championId: number
  assignedPosition: Role | null
  summonerId?: number
  isLocalPlayer: boolean
}

interface PickIntentData {
  championId: number
  championName: string
  source: 'hover' | 'declared' | 'locked'
}

interface RunePage {
  id?: number
  name: string
  primaryStyleId: number
  subStyleId: number
  selectedPerkIds: number[]
  current?: boolean
  isEditable?: boolean
  isDeletable?: boolean
}

interface RunePageInput {
  name?: string
  primaryStyleId: number
  subStyleId: number
  selectedPerkIds: number[]
}

interface ChampSelectSessionData {
  phase: 'planning' | 'banning' | 'picking' | 'finalization'
  myTeam: TeamMember[]
  theirTeam: TeamMember[]
  userRole: Role | null
  localPlayerCellId?: number
  bans: {
    myTeamBans: number[]
    theirTeamBans: number[]
  }
  isPracticeMode?: boolean
  // Pick Intent bilgileri
  userPickIntent?: PickIntentData | null
  teamPickIntents?: PickIntentData[]
}

export interface ActiveGameData {
  gameId: number
  gameMode: string
  gameType: string
  mapId: number
  teamOne: any[]
  teamTwo: any[]
  gameStartTime: number
  gameLength: number
}

export interface SummonerInfo {
  puuid: string
  summonerId: number
  accountId: number
  displayName: string
  gameName: string
  tagLine: string
  profileIconId: number
  summonerLevel: number
}

export interface RankedStats {
  soloQueue: {
    tier: string
    division: string
    leaguePoints: number
    wins: number
    losses: number
    winRate: number
  } | null
  flexQueue: {
    tier: string
    division: string
    leaguePoints: number
    wins: number
    losses: number
    winRate: number
  } | null
}

export interface ChampionMasteryData {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
}

export interface MatchHistoryEntry {
  gameId: number
  championId: number
  win: boolean
  kills: number
  deaths: number
  assists: number
  cs: number
  gameMode: string
  gameDuration: number
  timestamp: number
  role?: string
  lane?: string
}

export interface ChampionPersonalStats {
  championId: number
  gamesPlayed: number
  wins: number
  losses: number
  winRate: number
  avgKills: number
  avgDeaths: number
  avgAssists: number
  avgCS: number
  avgCSPerMin: number
  kda: number
}

