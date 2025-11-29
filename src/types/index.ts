// ==========================================
// TEMEL TİPLER
// ==========================================

export type Role = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'

export type Archetype =
  | 'Engage'      // Savaş başlatıcı (Malphite R, Leona E)
  | 'Poke'        // Uzun menzil taciz (Xerath, Jayce)
  | 'Enchanter'   // Buff/Heal veren (Lulu, Janna)
  | 'HyperCarry'  // Geç oyun canavarı (Vayne, Kassadin)
  | 'Frontline'   // Ön cephe tank (Ornn, Sion)
  | 'Assassin'    // Tek hedef öldürücü (Zed, Talon)
  | 'Mage'        // Büyü hasarı (Syndra, Viktor)
  | 'Tank'        // Dayanıklı (Sejuani, Zac)
  | 'Bruiser'     // Yarı tank yarı hasar (Darius, Garen)
  | 'Marksman'    // ADC tipi (Jinx, Caitlyn)
  | 'Diver'       // Dalış yapan (Vi, Camille)
  | 'Artillery'   // Çok uzun menzil (Ziggs, Vel'Koz)
  | 'Splitpusher' // Bölünmüş itici (Tryndamere, Fiora)
  | 'Peel'        // Koruyucu (Thresh, Braum)
  | 'Support'     // Destek genel

export type PowerSpike =
  | 'EarlyGame'     // 1-15 dakika güçlü
  | 'MidGame'       // 15-30 dakika güçlü
  | 'LateGame'      // 30+ dakika güçlü
  | '1v1Beast'      // Teke tek üstün
  | 'TeamfightGod'  // Takım savaşında üstün

export type DamageType = 'Physical' | 'Magic' | 'Mixed' | 'True'

// ==========================================
// ŞAMPİYON VERİ YAPILARI
// ==========================================

export interface SynergyData {
  championId: number
  championName: string
  reason: string
  synergyScore: number // 1-100 arası
}

export interface CounterData {
  championId: number
  championName: string
  reason: string
  counterScore: number // 1-100 arası, yüksek = daha iyi counter
}

export interface ProArenaData {
  pickRate: number      // 0-100 arası yüzde
  winRate: number       // 0-100 arası yüzde
  banRate: number       // 0-100 arası yüzde
  popularity: number    // 1-10 arası popülerlik
}

export interface Champion {
  id: number
  name: string
  displayName: string   // Türkçe veya gösterim adı
  role: Role[]
  archetype: Archetype[]
  damageType: DamageType
  synergies: SynergyData[]
  counters: CounterData[]
  powerSpikes: PowerSpike[]
  proData: ProArenaData
}

// ==========================================
// DRAFT STATE TİPLERİ
// ==========================================

export interface PickedChampion {
  cellId: number
  championId: number
  assignedPosition: Role | null
  summonerId?: number
  isLocalPlayer: boolean
}

export type DraftPhase = 'none' | 'planning' | 'banning' | 'picking' | 'finalization'

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected'

// ==========================================
// ÖNERİ MOTORU TİPLERİ
// ==========================================

export type ReasonType =
  | 'composition'  // Takım kompozisyonu eksikliği
  | 'synergy'      // Takım arkadaşıyla uyum
  | 'counter'      // Rakibe karşı üstünlük
  | 'powerSpike'   // Güç eğrisi uyumu
  | 'proData'      // Pro arena verisi
  | 'womboCombo'   // Wombo combo potansiyeli
  | 'laneMatchup'  // Lane matchup avantajı
  | 'liveMeta'     // Canlı meta verisi (win rate, tier vb.)

export interface RecommendationReason {
  type: ReasonType
  description: string
  score: number
}

export interface Recommendation {
  championId: number
  score: number
  reasons: RecommendationReason[]
}

// ==========================================
// STORE TİPLERİ
// ==========================================

export interface PickIntent {
  championId: number
  championName: string
  source: 'hover' | 'declared' | 'locked'
}

export interface DraftState {
  // Bağlantı durumu
  connectionStatus: ConnectionStatus
  
  // Draft aşaması
  phase: DraftPhase
  
  // Takımlar
  myTeam: PickedChampion[]
  theirTeam: PickedChampion[]
  
  // Banlar
  myTeamBans: number[]
  theirTeamBans: number[]
  
  // Kullanıcı bilgisi
  userRole: Role | null
  localPlayerCellId: number | null
  
  // Pick Intent - Kullanıcının oynamak istediği şampiyon
  userPickIntent: PickIntent | null
  
  // Takım arkadaşlarının pick intent'leri
  teamPickIntents: PickIntent[]
  
  // Öneriler
  recommendations: Recommendation[]
  banRecommendations: Recommendation[]
  
  // Demo modu
  isDemoMode: boolean
  
  // Antrenman modu
  isPracticeMode: boolean
}

export interface DraftActions {
  setConnectionStatus: (status: ConnectionStatus) => void
  setChampSelectData: (data: ChampSelectData) => void
  resetChampSelect: () => void
  updateRecommendations: (recommendations: Recommendation[]) => void
}

export interface ChampSelectData {
  phase: DraftPhase
  myTeam: PickedChampion[]
  theirTeam: PickedChampion[]
  userRole: Role | null
  localPlayerCellId?: number
  bans: {
    myTeamBans: number[]
    theirTeamBans: number[]
  }
  isPracticeMode?: boolean
  // Pick Intent bilgileri
  userPickIntent?: PickIntent | null
  teamPickIntents?: PickIntent[]
}

// ==========================================
// ELECTRON API TİPLERİ
// ==========================================

export interface LCUActionResult {
  success: boolean
  error?: string
}

export type GameflowPhase = 
  | 'None' 
  | 'Lobby' 
  | 'Matchmaking' 
  | 'ReadyCheck' 
  | 'ChampSelect' 
  | 'GameStart' 
  | 'InProgress' 
  | 'WaitingForStats' 
  | 'EndOfGame' 
  | 'PreEndOfGame'

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

// Rün sayfası tipleri
export interface RunePage {
  id?: number
  name: string
  primaryStyleId: number
  subStyleId: number
  selectedPerkIds: number[]
  current?: boolean
}

export interface RunePageInput {
  name?: string
  primaryStyleId: number
  subStyleId: number
  selectedPerkIds: number[]
}

declare global {
  interface Window {
    api: {
      window: {
        minimize: () => Promise<void>
        maximize: () => Promise<void>
        close: () => Promise<void>
      }
      lcu: {
        getStatus: () => Promise<string>
        reconnect: () => Promise<void>
        onConnectionChange: (callback: (status: string) => void) => () => void
        onChampSelectUpdate: (callback: (data: unknown) => void) => () => void
        onChampSelectEnd: (callback: () => void) => () => void
        // Gameflow
        onGameflowChange: (callback: (phase: string) => void) => () => void
        getGameflowPhase: () => Promise<GameflowPhase>
        getActiveGame: () => Promise<ActiveGameData | null>
        // Şampiyon seçimi aksiyonları
        hoverChampion: (championId: number) => Promise<LCUActionResult>
        lockInChampion: (championId: number) => Promise<LCUActionResult>
        banChampion: (championId: number) => Promise<LCUActionResult>
        // Rün sayfası yönetimi
        getRunePages: () => Promise<RunePage[]>
        setRunePage: (runePage: RunePageInput) => Promise<LCUActionResult>
        deleteRunePage: (pageId: number) => Promise<LCUActionResult>
        // Sihirdar büyüleri
        setSummonerSpells: (spell1Id: number, spell2Id: number) => Promise<LCUActionResult>
      }
      overlay: {
        show: () => Promise<void>
        hide: () => Promise<void>
        toggle: () => Promise<void>
        setPosition: (x: number, y: number) => Promise<void>
        setSize: (width: number, height: number) => Promise<void>
      }
      liveGame: {
        getData: () => Promise<any>
      }
    }
  }
}

