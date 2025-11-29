/**
 * SUMMONER SERVICE
 * 
 * Sihirdar bilgilerini ve kişisel istatistikleri yönetir.
 * LCU API üzerinden veri çeker ve önbelleğe alır.
 */

import { getChampionById } from '../data/ChampionKnowledgeBase'

// ==========================================
// TİP TANIMLARI
// ==========================================

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
  soloQueue: QueueStats | null
  flexQueue: QueueStats | null
}

export interface QueueStats {
  tier: string
  division: string
  leaguePoints: number
  wins: number
  losses: number
  winRate: number
}

export interface ChampionMasteryData {
  championId: number
  championLevel: number
  championPoints: number
  lastPlayTime: number
  championName?: string
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
  championName: string
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

export interface SummonerProfile {
  summoner: SummonerInfo
  ranked: RankedStats
  topChampions: ChampionMasteryData[]
  recentPerformance: {
    wins: number
    losses: number
    winRate: number
    avgKDA: number
  }
}

// ==========================================
// SUMMONER SERVICE
// ==========================================

class SummonerService {
  private currentSummoner: SummonerInfo | null = null
  private rankedStats: RankedStats | null = null
  private championMasteries: ChampionMasteryData[] = []
  private matchHistory: MatchHistoryEntry[] = []
  private championStatsCache: Map<number, ChampionPersonalStats> = new Map()
  private lastFetch: number = 0
  private CACHE_DURATION = 2 * 60 * 1000 // 2 dakika

  /**
   * Önbellek geçerli mi kontrol eder
   */
  private isCacheValid(): boolean {
    return Date.now() - this.lastFetch < this.CACHE_DURATION && this.currentSummoner !== null
  }

  /**
   * Tüm sihirdar verisini yükler
   */
  async loadSummonerData(): Promise<SummonerProfile | null> {
    if (this.isCacheValid()) {
      return this.getProfile()
    }

    try {
      // @ts-ignore
      const api = window.api

      // Paralel olarak tüm veriyi çek
      const [summoner, ranked, masteries, history] = await Promise.all([
        api.lcu.getCurrentSummoner(),
        api.lcu.getRankedStats(),
        api.lcu.getChampionMasteries(10),
        api.lcu.getMatchHistory(20)
      ])

      if (!summoner) {
        console.log('[SummonerService] Not connected to client')
        return null
      }

      this.currentSummoner = summoner
      this.rankedStats = ranked
      this.championMasteries = (masteries || []).map((m: ChampionMasteryData) => ({
        ...m,
        championName: getChampionById(m.championId)?.name || 'Unknown'
      }))
      this.matchHistory = history || []
      this.lastFetch = Date.now()

      console.log('[SummonerService] Loaded summoner data:', summoner.displayName)

      return this.getProfile()
    } catch (error) {
      console.error('[SummonerService] Failed to load data:', error)
      return null
    }
  }

  /**
   * Mevcut profili döndürür
   */
  getProfile(): SummonerProfile | null {
    if (!this.currentSummoner) return null

    // Son 20 maçtan performans hesapla
    const recentWins = this.matchHistory.filter(m => m.win).length
    const totalGames = this.matchHistory.length
    const totalKills = this.matchHistory.reduce((sum, m) => sum + m.kills, 0)
    const totalDeaths = this.matchHistory.reduce((sum, m) => sum + m.deaths, 0)
    const totalAssists = this.matchHistory.reduce((sum, m) => sum + m.assists, 0)

    return {
      summoner: this.currentSummoner,
      ranked: this.rankedStats || { soloQueue: null, flexQueue: null },
      topChampions: this.championMasteries.slice(0, 5),
      recentPerformance: {
        wins: recentWins,
        losses: totalGames - recentWins,
        winRate: totalGames > 0 ? Math.round((recentWins / totalGames) * 100) : 0,
        avgKDA: totalDeaths > 0 
          ? Math.round(((totalKills + totalAssists) / totalDeaths) * 100) / 100 
          : totalKills + totalAssists
      }
    }
  }

  /**
   * Belirli şampiyonla kişisel istatistikleri getirir
   */
  async getChampionStats(championId: number): Promise<ChampionPersonalStats | null> {
    // Önbellekte var mı?
    if (this.championStatsCache.has(championId)) {
      return this.championStatsCache.get(championId)!
    }

    try {
      // @ts-ignore
      const stats = await window.api.lcu.getChampionStats(championId)
      
      if (!stats) return null

      const champion = getChampionById(championId)
      const personalStats: ChampionPersonalStats = {
        ...stats,
        championName: champion?.name || 'Unknown'
      }

      this.championStatsCache.set(championId, personalStats)
      return personalStats
    } catch (error) {
      console.error('[SummonerService] Failed to get champion stats:', error)
      return null
    }
  }

  /**
   * Tüm şampiyonlar için kişisel win rate'leri hesaplar
   */
  getPersonalWinRates(): Map<number, number> {
    const winRates = new Map<number, number>()

    // Maç geçmişinden şampiyon bazlı istatistik çıkar
    const championGames = new Map<number, { wins: number; total: number }>()

    for (const match of this.matchHistory) {
      const existing = championGames.get(match.championId) || { wins: 0, total: 0 }
      championGames.set(match.championId, {
        wins: existing.wins + (match.win ? 1 : 0),
        total: existing.total + 1
      })
    }

    championGames.forEach((stats, championId) => {
      if (stats.total >= 2) { // En az 2 maç oynandıysa
        winRates.set(championId, Math.round((stats.wins / stats.total) * 100))
      }
    })

    return winRates
  }

  /**
   * Sihirdarın en iyi performans gösterdiği şampiyonları döndürür
   */
  getBestPerformingChampions(limit: number = 5): ChampionPersonalStats[] {
    const winRates = this.getPersonalWinRates()
    const performances: ChampionPersonalStats[] = []

    winRates.forEach((winRate, championId) => {
      const champion = getChampionById(championId)
      const matches = this.matchHistory.filter(m => m.championId === championId)
      
      if (matches.length >= 3) { // En az 3 maç
        const totalKills = matches.reduce((sum, m) => sum + m.kills, 0)
        const totalDeaths = matches.reduce((sum, m) => sum + m.deaths, 0)
        const totalAssists = matches.reduce((sum, m) => sum + m.assists, 0)
        const totalCS = matches.reduce((sum, m) => sum + m.cs, 0)

        performances.push({
          championId,
          championName: champion?.name || 'Unknown',
          gamesPlayed: matches.length,
          wins: matches.filter(m => m.win).length,
          losses: matches.filter(m => !m.win).length,
          winRate,
          avgKills: Math.round((totalKills / matches.length) * 10) / 10,
          avgDeaths: Math.round((totalDeaths / matches.length) * 10) / 10,
          avgAssists: Math.round((totalAssists / matches.length) * 10) / 10,
          avgCS: Math.round(totalCS / matches.length),
          avgCSPerMin: 0,
          kda: totalDeaths > 0 
            ? Math.round(((totalKills + totalAssists) / totalDeaths) * 100) / 100 
            : totalKills + totalAssists
        })
      }
    })

    // Win rate'e göre sırala
    return performances
      .sort((a, b) => b.winRate - a.winRate)
      .slice(0, limit)
  }

  /**
   * Profile icon URL'i döndürür
   */
  getProfileIconUrl(): string {
    if (!this.currentSummoner) return ''
    return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${this.currentSummoner.profileIconId}.png`
  }

  /**
   * Tier badge rengi döndürür
   */
  getTierColor(tier: string): string {
    const colors: Record<string, string> = {
      'IRON': '#5c5c5c',
      'BRONZE': '#cd7f32',
      'SILVER': '#c0c0c0',
      'GOLD': '#ffd700',
      'PLATINUM': '#00d4aa',
      'EMERALD': '#50c878',
      'DIAMOND': '#b9f2ff',
      'MASTER': '#9370db',
      'GRANDMASTER': '#dc143c',
      'CHALLENGER': '#f5d742'
    }
    return colors[tier?.toUpperCase()] || '#808080'
  }

  /**
   * Önbelleği temizler
   */
  clearCache(): void {
    this.currentSummoner = null
    this.rankedStats = null
    this.championMasteries = []
    this.matchHistory = []
    this.championStatsCache.clear()
    this.lastFetch = 0
  }

  /**
   * Bağlı mı kontrol eder
   */
  isConnected(): boolean {
    return this.currentSummoner !== null
  }
}

// Singleton instance
export const summonerService = new SummonerService()



