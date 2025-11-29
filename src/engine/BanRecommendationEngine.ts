import { Champion, Recommendation, RecommendationReason, Role } from '../types'
import { CHAMPION_KNOWLEDGE_BASE, getChampionById } from '../data/ChampionKnowledgeBase'
import { HARD_ENGAGE_CHAMPIONS, FRONTLINE_CHAMPIONS } from '../data/EngageChampions'

/**
 * BAN ÖNERİSİ MOTORU
 * 
 * Ban aşamasında hangi şampiyonların banlanması gerektiğini önerir.
 * 
 * Faktörler:
 * 1. Meta güçlü şampiyonlar (yüksek win rate, pick rate)
 * 2. Kritik sinerji kırıcılar (Yasuo varsa Malphite ban)
 * 3. Kullanıcının rolüne göre güçlü counter'lar
 * 4. OTP/One-trick buster (düşmanca mastery verisi ile)
 */

// Meta'da güçlü / ban değerli şampiyonlar
const HIGH_PRIORITY_BANS: number[] = [
  // Jungle
  64,   // Lee Sin
  121,  // Kha'Zix
  104,  // Graves
  254,  // Vi
  120,  // Hecarim
  154,  // Zac
  
  // Mid
  238,  // Zed
  55,   // Katarina
  157,  // Yasuo
  777,  // Yone
  103,  // Ahri
  7,    // LeBlanc
  
  // Top
  122,  // Darius
  24,   // Jax
  114,  // Fiora
  39,   // Irelia
  92,   // Riven
  
  // ADC
  222,  // Jinx
  145,  // Kai'Sa
  119,  // Draven
  67,   // Vayne
  
  // Support
  412,  // Thresh
  111,  // Nautilus
  89,   // Leona
  555,  // Pyke
  53,   // Blitzcrank
]

// Rol bazlı tehlikeli şampiyonlar
const ROLE_THREATS: Record<Role, number[]> = {
  Top: [
    122, // Darius
    24,  // Jax
    114, // Fiora
    39,  // Irelia
    92,  // Riven
    86,  // Garen
    240, // Kled
    6,   // Urgot
    420, // Illaoi
    164, // Camille
  ],
  Jungle: [
    64,  // Lee Sin
    121, // Kha'Zix
    104, // Graves
    141, // Kayn
    120, // Hecarim
    254, // Vi
    154, // Zac
    60,  // Elise
    76,  // Nidalee
    107, // Rengar
  ],
  Mid: [
    238, // Zed
    55,  // Katarina
    157, // Yasuo
    777, // Yone
    103, // Ahri
    7,   // LeBlanc
    91,  // Talon
    245, // Ekko
    131, // Diana
    84,  // Akali
  ],
  ADC: [
    222, // Jinx
    145, // Kai'Sa
    119, // Draven
    67,  // Vayne
    51,  // Caitlyn
    21,  // Miss Fortune
    236, // Lucian
    81,  // Ezreal
    498, // Xayah
    22,  // Ashe
  ],
  Support: [
    412, // Thresh
    111, // Nautilus
    89,  // Leona
    555, // Pyke
    53,  // Blitzcrank
    497, // Rakan
    117, // Lulu
    267, // Nami
    25,  // Morgana
    201, // Braum
  ],
}

// Sinerji kırıcı banlar - eğer takımda bu şampiyonlar varsa, bunları banla
const SYNERGY_BREAKER_BANS: Record<number, number[]> = {
  157: [54, 89, 111, 154, 32], // Yasuo varsa: Malphite, Leona, Nautilus, Zac, Amumu banla (havaya kaldıranlar)
  777: [54, 89, 111],          // Yone varsa
  61:  [59, 254, 120, 154],    // Orianna varsa: J4, Vi, Hecarim, Zac banla (üzerine top atılacaklar)
  21:  [32, 54, 59, 89],       // MF varsa: Amumu, Malphite, J4, Leona banla (wombo combo)
}

interface BanRecommendationInput {
  userRole: Role | null
  allyPicks: number[]       // Takım arkadaşlarının seçimleri
  alreadyBanned: number[]   // Zaten banlı şampiyonlar
}

export class BanRecommendationEngine {
  
  /**
   * Ban önerilerini hesaplar
   */
  calculateBanRecommendations(input: BanRecommendationInput): Recommendation[] {
    const { userRole, allyPicks, alreadyBanned } = input
    
    const recommendations: Recommendation[] = []
    const unavailable = new Set([...alreadyBanned])

    // Tüm potansiyel banları değerlendir
    CHAMPION_KNOWLEDGE_BASE.forEach(champion => {
      if (unavailable.has(champion.id)) return
      if (allyPicks.includes(champion.id)) return // Takım arkadaşı almak isteyebilir

      const reasons: RecommendationReason[] = []
      let totalScore = 0

      // 1. Meta gücü
      const metaScore = this.evaluateMetaThreat(champion)
      if (metaScore.score > 0) {
        reasons.push(metaScore)
        totalScore += metaScore.score
      }

      // 2. Rol tehdidi
      if (userRole) {
        const roleScore = this.evaluateRoleThreat(champion, userRole)
        if (roleScore.score > 0) {
          reasons.push(roleScore)
          totalScore += roleScore.score
        }
      }

      // 3. Sinerji kırıcı
      const synergyBreakerScore = this.evaluateSynergyBreaker(champion, allyPicks)
      if (synergyBreakerScore.score > 0) {
        reasons.push(synergyBreakerScore)
        totalScore += synergyBreakerScore.score
      }

      // 4. Engage tehdidi
      const engageScore = this.evaluateEngageThreat(champion)
      if (engageScore.score > 0) {
        reasons.push(engageScore)
        totalScore += engageScore.score
      }

      if (totalScore > 0) {
        recommendations.push({
          championId: champion.id,
          score: Math.min(100, Math.round(totalScore)),
          reasons: reasons.sort((a, b) => b.score - a.score)
        })
      }
    })

    // Puana göre sırala ve en iyi 5'i döndür
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  /**
   * Meta tehdit değerlendirmesi
   */
  private evaluateMetaThreat(champion: Champion): RecommendationReason {
    let score = 0
    let description = ''

    // Yüksek win rate
    if (champion.proData.winRate >= 52) {
      score += 15
      description = `%${champion.proData.winRate.toFixed(1)} win rate - meta'da güçlü`
    }

    // Yüksek pick rate
    if (champion.proData.pickRate >= 10) {
      score += 10
      description = description || 'Çok sık seçilen şampiyon'
    }

    // Yüksek ban rate (zaten çok banlanan = tehlikeli)
    if (champion.proData.banRate >= 8) {
      score += 10
      description = description || 'Yüksek ban oranı - tehlikeli'
    }

    // High priority listesinde mi?
    if (HIGH_PRIORITY_BANS.includes(champion.id)) {
      score += 15
      description = description || 'Meta\'da çok güçlü'
    }

    return {
      type: 'proData',
      score,
      description: description || 'Meta tehdidi'
    }
  }

  /**
   * Rol bazlı tehdit değerlendirmesi
   */
  private evaluateRoleThreat(champion: Champion, userRole: Role): RecommendationReason {
    let score = 0
    let description = ''

    const threats = ROLE_THREATS[userRole] || []
    
    if (threats.includes(champion.id)) {
      score += 25
      description = `${userRole} rolü için tehlikeli - karşına çıkmasın!`
    }

    // Aynı rolde çok güçlü mü?
    if (champion.role.includes(userRole) && champion.proData.winRate >= 51) {
      score += 10
      description = description || `${userRole} rolünde güçlü`
    }

    return {
      type: 'counter',
      score,
      description: description || 'Rol tehdidi'
    }
  }

  /**
   * Sinerji kırıcı değerlendirmesi
   */
  private evaluateSynergyBreaker(champion: Champion, allyPicks: number[]): RecommendationReason {
    let score = 0
    let description = ''

    // Takım arkadaşlarımızın sinerjileri için tehlike mi?
    allyPicks.forEach(allyId => {
      const breakerBans = SYNERGY_BREAKER_BANS[allyId]
      if (breakerBans && breakerBans.includes(champion.id)) {
        score += 30

        const allyChamp = getChampionById(allyId)
        if (allyChamp) {
          description = `${allyChamp.displayName} için tehlikeli sinerji - banla!`
        }
      }
    })

    return {
      type: 'synergy',
      score,
      description: description || 'Sinerji kırıcı'
    }
  }

  /**
   * Engage tehdidi değerlendirmesi
   */
  private evaluateEngageThreat(champion: Champion): RecommendationReason {
    let score = 0
    let description = ''

    // Güçlü engage şampiyonları tehlikeli
    if (HARD_ENGAGE_CHAMPIONS.includes(champion.id)) {
      score += 15
      description = 'Güçlü engage yeteneği - takım savaşı başlatabilir'
    }

    // Güçlü frontline
    if (FRONTLINE_CHAMPIONS.includes(champion.id) && champion.proData.winRate >= 51) {
      score += 10
      description = description || 'Güçlü frontline - zor öldürülür'
    }

    return {
      type: 'composition',
      score,
      description: description || 'Engage tehdidi'
    }
  }
}

