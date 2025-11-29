/**
 * RIOT API SERVİSİ
 * 
 * Riot Games API'den veri çeken servis.
 * - Data Dragon: Şampiyon resimleri, isimler (ücretsiz, API key gereksiz)
 * - Riot API: Oyuncu verileri, maç geçmişi (API key gerekli)
 */

// Data Dragon CDN URL
const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com'
let DDRAGON_VERSION = '14.24.1' // Varsayılan, API'den güncellenir

// Riot API base URLs
const RIOT_API_BASE = {
  TR: 'https://tr1.api.riotgames.com',
  EUW: 'https://euw1.api.riotgames.com',
  EUNE: 'https://eun1.api.riotgames.com',
  NA: 'https://na1.api.riotgames.com',
  KR: 'https://kr.api.riotgames.com',
}

export type Region = keyof typeof RIOT_API_BASE

interface ChampionRates {
  winRate: number
  pickRate: number
  banRate: number
}

interface RiotApiConfig {
  apiKey: string
  region: Region
}

// NOT: Development API key 24 saatte bir yenilenmeli!
// Production key için: https://developer.riotgames.com/app-type
const EMBEDDED_API_KEY = 'RGAPI-e8ebeaca-7895-4edf-9204-b96ce32e0861'

class RiotApiService {
  private apiKey: string = EMBEDDED_API_KEY
  private region: Region = 'TR'
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private CACHE_DURATION = 5 * 60 * 1000 // 5 dakika
  private versionInitialized = false

  /**
   * Servisi başlat - versiyon kontrolü yap
   */
  async initialize(): Promise<void> {
    if (this.versionInitialized) return
    
    try {
      const latestVersion = await this.getLatestVersion()
      if (latestVersion) {
        DDRAGON_VERSION = latestVersion
        console.log(`[RiotAPI] Using Data Dragon version: ${latestVersion}`)
      }
      this.versionInitialized = true
    } catch (error) {
      console.warn('[RiotAPI] Could not fetch latest version, using default:', DDRAGON_VERSION)
    }
  }

  /**
   * Mevcut Data Dragon versiyonunu döndürür
   */
  getCurrentVersion(): string {
    return DDRAGON_VERSION
  }

  /**
   * API yapılandırmasını ayarlar
   */
  configure(config: Partial<RiotApiConfig>) {
    if (config.apiKey) this.apiKey = config.apiKey
    if (config.region) this.region = config.region
  }

  /**
   * API key'in ayarlanıp ayarlanmadığını kontrol eder
   */
  isConfigured(): boolean {
    return this.apiKey.length > 0 && this.apiKey.startsWith('RGAPI-')
  }

  /**
   * API Key'i günceller (yeni key aldığında)
   */
  updateApiKey(newKey: string): void {
    this.apiKey = newKey
  }

  /**
   * Cache kontrolü
   */
  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T
    }
    return null
  }

  /**
   * Cache'e kaydet
   */
  private setCache(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  // ==========================================
  // DATA DRAGON (Ücretsiz, API Key gereksiz)
  // ==========================================

  /**
   * Şampiyon ismini Data Dragon formatına çevirir
   * Örn: "Kha'Zix" -> "Khazix", "Miss Fortune" -> "MissFortune"
   */
  public formatChampionName(name: string): string {
    // Özel karakter dönüşümleri (Data Dragon API formatı)
    const specialNames: Record<string, string> = {
      // Apostrof içerenler
      "Kha'Zix": "Khazix",
      "Kog'Maw": "KogMaw",
      "Cho'Gath": "Chogath",
      "Vel'Koz": "Velkoz",
      "Kai'Sa": "Kaisa",
      "Rek'Sai": "RekSai",
      "Bel'Veth": "Belveth",
      "K'Sante": "KSante",
      // Boşluk içerenler
      "Miss Fortune": "MissFortune",
      "Aurelion Sol": "AurelionSol",
      "Dr. Mundo": "DrMundo",
      "Jarvan IV": "JarvanIV",
      "Lee Sin": "LeeSin",
      "Master Yi": "MasterYi",
      "Tahm Kench": "TahmKench",
      "Twisted Fate": "TwistedFate",
      "Xin Zhao": "XinZhao",
      "Nunu & Willump": "Nunu",
      "Renata Glasc": "Renata",
      // Özel durumlar
      "Wukong": "MonkeyKing",
      "LeBlanc": "Leblanc",
      "Fiddlesticks": "Fiddlesticks",
      // Büyük/küçük harf farklılıkları
      "KhaZix": "Khazix",
      "KogMaw": "KogMaw",
      "ChoGath": "Chogath",
      "VelKoz": "Velkoz",
      "KaiSa": "Kaisa",
      "RekSai": "RekSai",
      "BelVeth": "Belveth",
      "KSante": "KSante"
    }
    
    // Özel isim varsa kullan
    if (specialNames[name]) {
      return specialNames[name]
    }
    
    // Boşlukları ve özel karakterleri kaldır
    return name.replace(/['\s.&]/g, '')
  }

  /**
   * Şampiyon splash art URL'i
   */
  getChampionSplashUrl(championName: string, skinNum: number = 0): string {
    const formatted = this.formatChampionName(championName)
    return `${DDRAGON_BASE}/cdn/img/champion/splash/${formatted}_${skinNum}.jpg`
  }

  /**
   * Şampiyon kare resim URL'i
   */
  getChampionSquareUrl(championName: string): string {
    const formatted = this.formatChampionName(championName)
    return `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/img/champion/${formatted}.png`
  }

  /**
   * Şampiyon loading screen URL'i
   */
  getChampionLoadingUrl(championName: string, skinNum: number = 0): string {
    const formatted = this.formatChampionName(championName)
    return `${DDRAGON_BASE}/cdn/img/champion/loading/${formatted}_${skinNum}.jpg`
  }

  /**
   * En son Data Dragon versiyonunu getirir
   */
  async getLatestVersion(): Promise<string> {
    const cached = this.getCached<string>('ddragon_version')
    if (cached) return cached

    try {
      const response = await fetch(`${DDRAGON_BASE}/api/versions.json`)
      const versions = await response.json()
      const latest = versions[0]
      this.setCache('ddragon_version', latest)
      return latest
    } catch (error) {
      console.error('[RiotAPI] Version fetch failed:', error)
      return DDRAGON_VERSION
    }
  }

  /**
   * Tüm şampiyon verilerini getirir
   */
  async getAllChampions(): Promise<Record<string, any>> {
    const cached = this.getCached<Record<string, any>>('all_champions')
    if (cached) return cached

    try {
      const version = await this.getLatestVersion()
      const response = await fetch(
        `${DDRAGON_BASE}/cdn/${version}/data/en_US/champion.json`
      )
      const data = await response.json()
      this.setCache('all_champions', data.data)
      return data.data
    } catch (error) {
      console.error('[RiotAPI] Champions fetch failed:', error)
      return {}
    }
  }

  // ==========================================
  // RIOT API (API Key gerekli)
  // ==========================================

  /**
   * API isteği yapar
   */
  private async apiRequest<T>(endpoint: string): Promise<T | null> {
    if (!this.apiKey) {
      console.warn('[RiotAPI] API key not configured')
      return null
    }

    const url = `${RIOT_API_BASE[this.region]}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'X-Riot-Token': this.apiKey
        }
      })

      if (!response.ok) {
        if (response.status === 403) {
          console.error('[RiotAPI] Invalid API key or expired')
        } else if (response.status === 429) {
          console.error('[RiotAPI] Rate limit exceeded')
        } else {
          console.error('[RiotAPI] Request failed:', response.status)
        }
        return null
      }

      return await response.json()
    } catch (error) {
      console.error('[RiotAPI] Request error:', error)
      return null
    }
  }

  /**
   * Oyuncu PUUID'sini getirir (isim ve tag ile)
   */
  async getAccountByRiotId(gameName: string, tagLine: string): Promise<{ puuid: string } | null> {
    const cacheKey = `account_${gameName}_${tagLine}`
    const cached = this.getCached<{ puuid: string }>(cacheKey)
    if (cached) return cached

    // Account API farklı endpoint kullanıyor
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
    
    try {
      const response = await fetch(url, {
        headers: { 'X-Riot-Token': this.apiKey }
      })
      
      if (!response.ok) return null
      
      const data = await response.json()
      this.setCache(cacheKey, data)
      return data
    } catch (error) {
      console.error('[RiotAPI] Account fetch failed:', error)
      return null
    }
  }

  /**
   * Oyuncunun şampiyon mastery verilerini getirir
   */
  async getChampionMasteries(puuid: string): Promise<ChampionMastery[] | null> {
    const cacheKey = `mastery_${puuid}`
    const cached = this.getCached<ChampionMastery[]>(cacheKey)
    if (cached) return cached

    const data = await this.apiRequest<ChampionMastery[]>(
      `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
    )
    
    if (data) {
      this.setCache(cacheKey, data)
    }
    return data
  }

  /**
   * Oyuncunun belirli şampiyonla mastery verisini getirir
   */
  async getChampionMastery(puuid: string, championId: number): Promise<ChampionMastery | null> {
    const masteries = await this.getChampionMasteries(puuid)
    return masteries?.find(m => m.championId === championId) || null
  }

  /**
   * Oyuncunun dereceli sıralama verilerini getirir
   */
  async getRankedStats(summonerId: string): Promise<RankedEntry[] | null> {
    const cacheKey = `ranked_${summonerId}`
    const cached = this.getCached<RankedEntry[]>(cacheKey)
    if (cached) return cached

    const data = await this.apiRequest<RankedEntry[]>(
      `/lol/league/v4/entries/by-summoner/${summonerId}`
    )
    
    if (data) {
      this.setCache(cacheKey, data)
    }
    return data
  }

  /**
   * Oyuncunun en çok oynadığı şampiyonları getirir
   */
  async getTopChampions(puuid: string, count: number = 5): Promise<ChampionMastery[] | null> {
    const masteries = await this.getChampionMasteries(puuid)
    return masteries?.slice(0, count) || null
  }
}

// Tip tanımları
interface ChampionMastery {
  puuid: string
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championPointsSinceLastLevel: number
  championPointsUntilNextLevel: number
  tokensEarned: number
}

interface RankedEntry {
  leagueId: string
  summonerId: string
  queueType: string
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
}

// Singleton instance
export const riotApi = new RiotApiService()

// Kullanım örneği:
// riotApi.configure({ apiKey: 'RGAPI-xxx', region: 'TR' })
// const mastery = await riotApi.getChampionMastery(puuid, 157)

