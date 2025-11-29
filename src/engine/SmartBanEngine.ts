/**
 * SMART BAN ENGINE
 * 
 * Akıllı ban önerileri oluşturur:
 * 
 * 1. Pick Intent VARSA:
 *    - Kullanıcının oynamak istediği şampiyonun counter'larını öner
 *    - Takım arkadaşlarının pick intent'lerini de hesaba kat
 * 
 * 2. Pick Intent YOKSA:
 *    - Meta'daki en güçlü şampiyonları öner (OP tier, yüksek ban rate)
 */

import { Recommendation, RecommendationReason, Role, PickIntent } from '../types'
import { CHAMPION_KNOWLEDGE_BASE, getChampionById } from '../data/ChampionKnowledgeBase'
import { metaDataService } from '../services/MetaDataService'

// Counter verileri (şampiyon ID -> counter şampiyon ID'leri)
const COUNTER_DATA: Record<number, { counterId: number, winRate: number, reason: string }[]> = {
  // Yasuo counters
  157: [
    { counterId: 54, winRate: 67, reason: "Malphite'ın armor stack'i ve R'si Yasuo'yu ezer" },
    { counterId: 33, winRate: 65, reason: "Rammus'un taunt ve armor'ı Yasuo'ya kabustur" },
    { counterId: 1, winRate: 62, reason: "Annie'nin point-click stun'ı Yasuo'yu durdurur" },
    { counterId: 90, winRate: 60, reason: "Malzahar'ın R'si Yasuo'yu kilitler" },
    { counterId: 127, winRate: 58, reason: "Lissandra'nın CC'si Yasuo'yu durdurur" },
  ],
  // Zed counters
  238: [
    { counterId: 127, winRate: 64, reason: "Lissandra R ile Zed'in R'sini counter'lar" },
    { counterId: 90, winRate: 63, reason: "Malzahar pasifi Zed combo'sunu engeller" },
    { counterId: 84, winRate: 58, reason: "Akali smoke Zed'in hedeflemesini zorlaştırır" },
    { counterId: 245, winRate: 57, reason: "Ekko R ile Zed damage'ını geri alır" },
  ],
  // Katarina counters
  55: [
    { counterId: 90, winRate: 65, reason: "Malzahar R Katarina R'sini keser" },
    { counterId: 127, winRate: 62, reason: "Lissandra CC spam Katarina'yı durdurur" },
    { counterId: 105, winRate: 58, reason: "Fizz E ile Katarina R'sinden kaçar" },
  ],
  // Vayne counters
  67: [
    { counterId: 119, winRate: 60, reason: "Draven erken oyunda Vayne'i ezer" },
    { counterId: 51, winRate: 58, reason: "Caitlyn menzil avantajı ile Vayne'i baskılar" },
    { counterId: 21, winRate: 57, reason: "Miss Fortune lane'de Vayne'e baskı yapar" },
  ],
  // Darius counters
  122: [
    { counterId: 17, winRate: 62, reason: "Teemo kite ile Darius'u deliğe sokar" },
    { counterId: 85, winRate: 60, reason: "Kennen hız ve stun ile Darius'u kontrol eder" },
    { counterId: 150, winRate: 58, reason: "Gnar kite potansiyeli ile Darius'a karşı iyi" },
    { counterId: 126, winRate: 56, reason: "Jayce menzil ile Darius'u baskılar" },
  ],
  // Lee Sin counters
  64: [
    { counterId: 33, winRate: 58, reason: "Rammus taunt Lee Sin'i durdurur" },
    { counterId: 113, winRate: 57, reason: "Sejuani CC ile Lee Sin'i locklar" },
    { counterId: 154, winRate: 56, reason: "Zac'ın engage'i Lee'nin mobilesini karşılar" },
  ],
  // Thresh counters
  412: [
    { counterId: 25, winRate: 62, reason: "Morgana E kalkanı Thresh Q'sunu engeller" },
    { counterId: 12, winRate: 58, reason: "Alistar combo Thresh'i tanklar" },
    { counterId: 89, winRate: 56, reason: "Leona all-in Thresh'i cezalandırır" },
  ],
  // Ahri counters
  103: [
    { counterId: 238, winRate: 55, reason: "Zed burst Ahri'yi zorlar" },
    { counterId: 91, winRate: 54, reason: "Talon roam ile Ahri'yi geçer" },
    { counterId: 55, winRate: 53, reason: "Katarina resets Ahri'yi ezer" },
  ],
  // Jinx counters
  222: [
    { counterId: 119, winRate: 58, reason: "Draven early game Jinx'i ezer" },
    { counterId: 236, winRate: 56, reason: "Lucian mobilite ile Jinx'e baskı yapar" },
    { counterId: 145, winRate: 55, reason: "Kai'Sa dive ile Jinx'i öldürür" },
  ],
  // Kayn counters
  141: [
    { counterId: 64, winRate: 56, reason: "Lee Sin erken istilalar ile Kayn'ı durdurur" },
    { counterId: 107, winRate: 55, reason: "Rengar 1v1'de Kayn'ı yener" },
    { counterId: 121, winRate: 54, reason: "Kha'Zix izole 1v1'de güçlü" },
  ],
}

// Meta OP şampiyonlar (pick intent yokken önerilecek)
const META_OP_CHAMPIONS = [
  { id: 141, reason: "Kayn - S+ Tier Jungle, %52 WR, %20 Ban Rate" },
  { id: 238, reason: "Zed - S Tier Mid, %25 Ban Rate, herkes nefret ediyor" },
  { id: 412, reason: "Thresh - S+ Support, her oyunda etkili" },
  { id: 122, reason: "Darius - S Tier Top, lane hakimiyeti çok yüksek" },
  { id: 64, reason: "Lee Sin - S+ Jungle, early game dominant" },
  { id: 157, reason: "Yasuo - Yüksek pick rate, takımları tilt eder" },
  { id: 67, reason: "Vayne - Late game hypercarry, durdurulamaz" },
  { id: 555, reason: "Pyke - Support assassin, snowball potansiyeli" },
  { id: 350, reason: "Yuumi - Herkesin nefret ettiği şampiyon" },
  { id: 121, reason: "Kha'Zix - S+ Jungle, izole hedefleri anında öldürür" },
]

interface SmartBanInput {
  userRole: Role | null
  userPickIntent: PickIntent | null
  teamPickIntents: PickIntent[]
  allyPicks: number[]
  alreadyBanned: number[]
}

export class SmartBanEngine {
  /**
   * Akıllı ban önerileri hesaplar
   */
  calculateSmartBans(input: SmartBanInput): Recommendation[] {
    const { userPickIntent, teamPickIntents, alreadyBanned, userRole } = input
    
    // Zaten banlanan şampiyonları filtrele
    const bannedSet = new Set(alreadyBanned)
    
    let recommendations: Recommendation[] = []

    // SENARYO 1: Kullanıcının pick intent'i var
    if (userPickIntent && userPickIntent.championId > 0) {
      console.log(`[SmartBan] User wants to play: ${userPickIntent.championName}`)
      recommendations = this.getCounterBans(userPickIntent.championId, bannedSet)
    }

    // SENARYO 2: Takım arkadaşlarının pick intent'leri var (kullanıcının yoksa)
    if (recommendations.length < 3 && teamPickIntents.length > 0) {
      const teamCounters = this.getTeamCounterBans(teamPickIntents, bannedSet)
      // Mevcut önerilere ekle
      for (const rec of teamCounters) {
        if (!recommendations.some(r => r.championId === rec.championId)) {
          recommendations.push(rec)
        }
      }
    }

    // SENARYO 3: Hiç pick intent yok - Meta OP'leri öner
    if (recommendations.length < 3) {
      console.log('[SmartBan] No pick intent - suggesting meta OP bans')
      const metaBans = this.getMetaOpBans(userRole, bannedSet)
      for (const rec of metaBans) {
        if (!recommendations.some(r => r.championId === rec.championId)) {
          recommendations.push(rec)
        }
      }
    }

    // Skor sırasına göre sırala ve ilk 5'i döndür
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  /**
   * Belirli bir şampiyonun counter'larını ban önerisi olarak döndür
   */
  private getCounterBans(championId: number, bannedSet: Set<number>): Recommendation[] {
    const counters = COUNTER_DATA[championId] || []
    const champion = getChampionById(championId)
    
    return counters
      .filter(c => !bannedSet.has(c.counterId))
      .map(counter => {
        const counterChamp = getChampionById(counter.counterId)
        return {
          championId: counter.counterId,
          score: counter.winRate,
          reasons: [{
            type: 'counter' as const,
            description: `${counterChamp?.name || 'Unknown'}: ${counter.reason}`,
            score: counter.winRate
          }]
        }
      })
  }

  /**
   * Takım arkadaşlarının pick intent'lerine göre counter ban önerileri
   */
  private getTeamCounterBans(teamPickIntents: PickIntent[], bannedSet: Set<number>): Recommendation[] {
    const allCounters: Recommendation[] = []

    for (const intent of teamPickIntents) {
      const counters = this.getCounterBans(intent.championId, bannedSet)
      for (const counter of counters) {
        // Takım arkadaşı için counter - skoru biraz düşür
        const adjustedCounter: Recommendation = {
          ...counter,
          score: counter.score * 0.8, // Takım arkadaşı için %80 skor
          reasons: counter.reasons.map(r => ({
            ...r,
            description: `Takım: ${r.description}`
          }))
        }
        allCounters.push(adjustedCounter)
      }
    }

    return allCounters
  }

  /**
   * Meta OP şampiyonları ban önerisi olarak döndür
   */
  private getMetaOpBans(userRole: Role | null, bannedSet: Set<number>): Recommendation[] {
    // Meta verilerini de kontrol et
    const topBanned = metaDataService.getTopBannedChampions(10)
    const topWinRate = metaDataService.getTopWinRateChampions(undefined, 10)
    
    const recommendations: Recommendation[] = []

    // Önce hardcoded OP listesi
    for (const op of META_OP_CHAMPIONS) {
      if (bannedSet.has(op.id)) continue
      
      const metaStats = metaDataService.getChampionMetaStats(op.id)
      const score = metaStats 
        ? (metaStats.banRate * 0.5 + metaStats.winRate * 0.3 + metaStats.pickRate * 0.2)
        : 70

      recommendations.push({
        championId: op.id,
        score,
        reasons: [{
          type: 'proData' as const,
          description: op.reason,
          score
        }]
      })
    }

    // Meta verilerinden yüksek ban rate'li şampiyonları ekle
    for (const stats of topBanned) {
      if (bannedSet.has(stats.championId)) continue
      if (recommendations.some(r => r.championId === stats.championId)) continue

      const champ = getChampionById(stats.championId)
      recommendations.push({
        championId: stats.championId,
        score: stats.banRate + stats.winRate * 0.5,
        reasons: [{
          type: 'liveMeta' as const,
          description: `${champ?.name}: ${stats.tier} Tier, %${stats.winRate.toFixed(1)} WR, %${stats.banRate.toFixed(1)} Ban Rate`,
          score: stats.banRate
        }]
      })
    }

    return recommendations
  }
}


