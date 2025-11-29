/**
 * LIVE GAME DATA SERVICE
 * 
 * Riot'un Live Client Data API'sini kullanarak
 * oyun içi gerçek zamanlı verileri çeker.
 * 
 * API: https://127.0.0.1:2999/liveclientdata/
 * Dokümantasyon: https://developer.riotgames.com/docs/lol#game-client-api
 */

// Polling interval (ms)
const POLL_INTERVAL = 1000 // 1 saniye

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface ActivePlayer {
  summonerName: string
  level: number
  currentGold: number
  fullRunes: {
    primaryRuneTree: { displayName: string }
    secondaryRuneTree: { displayName: string }
  }
  championStats: {
    abilityPower: number
    armor: number
    attackDamage: number
    attackSpeed: number
    currentHealth: number
    maxHealth: number
    magicResist: number
    moveSpeed: number
  }
}

export interface PlayerScore {
  kills: number
  deaths: number
  assists: number
  creepScore: number
  wardScore: number
}

export interface Player {
  summonerName: string
  championName: string
  team: 'ORDER' | 'CHAOS'
  position: string
  level: number
  scores: PlayerScore
  items: { itemID: number; displayName: string; count: number }[]
  skinID: number
  isBot: boolean
  isDead: boolean
  respawnTimer: number
  runes: {
    primaryRuneTree: { displayName: string }
    secondaryRuneTree: { displayName: string }
  }
}

export interface GameEvent {
  EventID: number
  EventName: string
  EventTime: number
  // Different events have different additional fields
  KillerName?: string
  VictimName?: string
  Assisters?: string[]
  DragonType?: string
  Stolen?: boolean
  TurretKilled?: string
  InhibKilled?: string
  Result?: string
}

export interface GameStats {
  gameMode: string
  gameTime: number
  mapName: string
  mapNumber: number
  mapTerrain: string
}

export interface AllGameData {
  activePlayer: ActivePlayer
  allPlayers: Player[]
  events: { Events: GameEvent[] }
  gameData: GameStats
}

export interface LiveGameState {
  isConnected: boolean
  gameTime: number
  activePlayer: ActivePlayer | null
  allPlayers: Player[]
  myTeam: Player[]
  enemyTeam: Player[]
  events: GameEvent[]
  recentEvents: GameEvent[]
  objectives: {
    dragonKills: number
    baronKills: number
    heraldKills: number
    turretKills: number
  }
}

// ==========================================
// LIVE GAME SERVICE
// ==========================================

class LiveGameServiceClass {
  private pollingInterval: NodeJS.Timeout | null = null
  private listeners: Set<(state: LiveGameState) => void> = new Set()
  private lastEventId: number = 0
  private state: LiveGameState = this.getInitialState()

  private getInitialState(): LiveGameState {
    return {
      isConnected: false,
      gameTime: 0,
      activePlayer: null,
      allPlayers: [],
      myTeam: [],
      enemyTeam: [],
      events: [],
      recentEvents: [],
      objectives: {
        dragonKills: 0,
        baronKills: 0,
        heraldKills: 0,
        turretKills: 0
      }
    }
  }

  /**
   * Tüm oyun verisini çek (IPC üzerinden main process'te)
   * Self-signed sertifika sorunu böylece çözülüyor
   */
  async fetchAllGameData(): Promise<AllGameData | null> {
    try {
      // Main process üzerinden çek (sertifika doğrulaması devre dışı)
      const data = await window.api.liveGame.getData()
      return data as AllGameData | null
    } catch {
      return null
    }
  }

  /**
   * Objective sayılarını hesapla
   */
  private calculateObjectives(events: GameEvent[]): LiveGameState['objectives'] {
    const objectives = {
      dragonKills: 0,
      baronKills: 0,
      heraldKills: 0,
      turretKills: 0
    }

    for (const event of events) {
      switch (event.EventName) {
        case 'DragonKill':
          objectives.dragonKills++
          break
        case 'BaronKill':
          objectives.baronKills++
          break
        case 'HeraldKill':
          objectives.heraldKills++
          break
        case 'TurretKilled':
          objectives.turretKills++
          break
      }
    }

    return objectives
  }

  /**
   * State'i güncelle ve listener'ları bilgilendir
   */
  private updateState(data: AllGameData): void {
    // Aktif oyuncunun takımını bul
    const activePlayerName = data.activePlayer.summonerName
    const activePlayerData = data.allPlayers.find(p => p.summonerName === activePlayerName)
    const myTeamSide = activePlayerData?.team || 'ORDER'

    // Takımları ayır
    const myTeam = data.allPlayers.filter(p => p.team === myTeamSide)
    const enemyTeam = data.allPlayers.filter(p => p.team !== myTeamSide)

    // Son eventleri bul (son 30 saniye)
    const currentTime = data.gameData.gameTime
    const recentEvents = data.events.Events.filter(
      e => currentTime - e.EventTime < 30 && e.EventID > this.lastEventId
    )

    // Son event ID'sini güncelle
    if (data.events.Events.length > 0) {
      this.lastEventId = Math.max(...data.events.Events.map(e => e.EventID))
    }

    this.state = {
      isConnected: true,
      gameTime: data.gameData.gameTime,
      activePlayer: data.activePlayer,
      allPlayers: data.allPlayers,
      myTeam,
      enemyTeam,
      events: data.events.Events,
      recentEvents,
      objectives: this.calculateObjectives(data.events.Events)
    }

    // Listener'ları bilgilendir
    this.notifyListeners()
  }

  /**
   * Bağlantı kesildiğinde state'i sıfırla
   */
  private resetState(): void {
    if (this.state.isConnected) {
      this.state = this.getInitialState()
      this.lastEventId = 0
      this.notifyListeners()
    }
  }

  /**
   * Listener'ları bilgilendir
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state))
  }

  /**
   * Polling başlat
   */
  startPolling(): void {
    if (this.pollingInterval) return

    console.log('[LiveGame] Starting polling...')

    // İlk veriyi hemen çek
    this.poll()

    // Periyodik polling
    this.pollingInterval = setInterval(() => {
      this.poll()
    }, POLL_INTERVAL)
  }

  /**
   * Tek seferlik veri çekme
   */
  private async poll(): Promise<void> {
    const data = await this.fetchAllGameData()

    if (data) {
      this.updateState(data)
    } else {
      this.resetState()
    }
  }

  /**
   * Polling durdur
   */
  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
      console.log('[LiveGame] Polling stopped')
    }
  }

  /**
   * Listener ekle
   */
  subscribe(callback: (state: LiveGameState) => void): () => void {
    this.listeners.add(callback)
    
    // Mevcut state'i hemen gönder
    callback(this.state)

    // Unsubscribe fonksiyonu döndür
    return () => {
      this.listeners.delete(callback)
    }
  }

  /**
   * Mevcut state'i al
   */
  getState(): LiveGameState {
    return this.state
  }

  /**
   * Bağlantı durumunu kontrol et
   */
  isConnected(): boolean {
    return this.state.isConnected
  }
}

// Singleton instance
export const liveGameService = new LiveGameServiceClass()

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Oyun süresini M:SS formatına çevir
 */
export function formatGameTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * KDA hesapla
 */
export function calculateKDA(kills: number, deaths: number, assists: number): string {
  if (deaths === 0) {
    return 'Perfect'
  }
  return ((kills + assists) / deaths).toFixed(2)
}

/**
 * CS/min hesapla
 */
export function calculateCSPerMin(cs: number, gameTimeSeconds: number): string {
  if (gameTimeSeconds < 60) return '0.0'
  return (cs / (gameTimeSeconds / 60)).toFixed(1)
}

