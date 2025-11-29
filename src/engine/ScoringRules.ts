import {
  Champion,
  RecommendationReason,
  PickedChampion,
  Archetype,
  Role
} from '../types'
import { getChampionById, CHAMPION_MAP } from '../data/ChampionKnowledgeBase'
import { getSynergiesForChampion, getCountersForChampion, getSynergyScore, getCounterScore } from '../data/SynergyData'
import { getCounterPicksForChampion, getMatchupsForRole } from '../data/LaneMatchups'
import { getProPlayStats, getHighEloWinRate, getChampionTier, isBlindPickSafe } from '../data/ProPlayData'
import { findComboPartnersForChampion, getMissingComboChampions, WOMBO_COMBOS } from '../data/WomboComboData'
import { 
  isHardEngageChampion, 
  isFrontlineChampion, 
  isPeelChampion,
  isDiverChampion,
  teamNeedsEngage,
  teamNeedsFrontline,
  teamNeedsPeel,
  HARD_ENGAGE_CHAMPIONS,
  FRONTLINE_CHAMPIONS,
  PEEL_CHAMPIONS
} from '../data/EngageChampions'
import { metaDataService } from '../services/MetaDataService'

/**
 * PUANLAMA KURALLARI
 * 
 * Her kural belirli bir faktörü değerlendirir ve puan + açıklama döndürür.
 */
export class ScoringRules {
  
  // ==========================================
  // 1. KOMPOZİSYON ANALİZİ
  // ==========================================
  
  /**
   * Takım kompozisyonundaki eksiklikleri analiz eder.
   * Eksik arketiplere sahip şampiyonlara bonus puan verir.
   */
  evaluateComposition(champion: Champion, myTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    // Takımdaki şampiyon ID'lerini topla
    const teamChampionIds = myTeam
      .filter(m => m.championId > 0)
      .map(m => m.championId)

    // 1. ENGAGE EKSİKLİĞİ KONTROLÜ (En önemli!)
    if (teamNeedsEngage(teamChampionIds)) {
      if (isHardEngageChampion(champion.id)) {
        score += 30
        descriptions.push('Takımda Hard Engage eksik - savaş başlatabilir!')
      } else if (isDiverChampion(champion.id)) {
        score += 15
        descriptions.push('Takımda Engage eksik - dalış yapabilir')
      }
    }

    // 2. FRONTLINE EKSİKLİĞİ KONTROLÜ
    if (teamNeedsFrontline(teamChampionIds)) {
      if (isFrontlineChampion(champion.id)) {
        score += 25
        descriptions.push('Takımda Frontline eksik - ön cephede durabilir!')
      }
    }

    // 3. PEEL EKSİKLİĞİ KONTROLÜ
    // ADC veya hypercarry varsa peel önemli
    const hasHypercarry = teamChampionIds.some(id => {
      const champ = getChampionById(id)
      return champ?.archetype.includes('HyperCarry') || champ?.archetype.includes('Marksman')
    })

    if (hasHypercarry && teamNeedsPeel(teamChampionIds)) {
      if (isPeelChampion(champion.id)) {
        score += 20
        descriptions.push('Hypercarry var ama koruma yok - peel sağlayabilir')
      }
    }

    // 4. HASAR DENGESİ KONTROLÜ
    const damageBalance = this.checkDamageBalance(myTeam, champion)
    if (damageBalance.bonus > 0) {
      score += damageBalance.bonus
      descriptions.push(damageBalance.reason)
    }

    // 5. ARKETIP ÇEŞİTLİLİĞİ
    const teamArchetypes = new Set<string>()
    teamChampionIds.forEach(id => {
      const champ = getChampionById(id)
      if (champ) {
        champ.archetype.forEach(arch => teamArchetypes.add(arch))
      }
    })

    // Eksik kritik arketipler
    if (!teamArchetypes.has('Tank') && champion.archetype.includes('Tank')) {
      score += 10
      descriptions.push('Takımda Tank eksik')
    }
    if (!teamArchetypes.has('Assassin') && champion.archetype.includes('Assassin')) {
      score += 5
      descriptions.push('Takımda Assassin eksik - backline tehdidi olabilir')
    }

    return {
      type: 'composition',
      score,
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Kompozisyon için uygun.'
    }
  }

  /**
   * Takımın hasar dengesi kontrolü
   */
  private checkDamageBalance(myTeam: PickedChampion[], candidate: Champion): { bonus: number; reason: string } {
    let physicalCount = 0
    let magicCount = 0

    myTeam.forEach(member => {
      if (member.championId > 0) {
        const champ = getChampionById(member.championId)
        if (champ) {
          if (champ.damageType === 'Physical') physicalCount++
          else if (champ.damageType === 'Magic') magicCount++
          else if (champ.damageType === 'Mixed') {
            physicalCount += 0.5
            magicCount += 0.5
          }
        }
      }
    })

    // Eğer takım tek tip hasara yoğunlaşmışsa, diğer tipi öner
    if (physicalCount >= 3 && candidate.damageType === 'Magic') {
      return { bonus: 20, reason: 'Takım fiziksel hasara yoğun, büyü hasarı dengeler' }
    }
    if (magicCount >= 3 && candidate.damageType === 'Physical') {
      return { bonus: 20, reason: 'Takım büyü hasarına yoğun, fiziksel hasar dengeler' }
    }

    return { bonus: 0, reason: '' }
  }

  // ==========================================
  // 2. SİNERJİ BONUSU
  // ==========================================

  /**
   * Takım arkadaşlarıyla sinerjileri değerlendirir.
   */
  evaluateSynergy(champion: Champion, myTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    // Yeni sinerji veritabanından kontrol et
    const synergies = getSynergiesForChampion(champion.id)

    myTeam.forEach(member => {
      if (member.championId > 0) {
        // Önce yeni veritabanından kontrol
        const synergyData = synergies.find(s => s.championId === member.championId)
        if (synergyData) {
          const synergyBonus = Math.round(synergyData.synergyScore / 4)
          score += synergyBonus
          
          const allyChamp = getChampionById(member.championId)
          if (allyChamp) {
            descriptions.push(`${allyChamp.displayName} ile: ${synergyData.reason}`)
          }
        } else {
          // Eski veritabanından kontrol (champion.synergies)
          const synergy = champion.synergies.find(s => s.championId === member.championId)
          if (synergy) {
            const synergyBonus = Math.round(synergy.synergyScore / 4)
            score += synergyBonus

            const allyChamp = getChampionById(member.championId)
            if (allyChamp) {
              descriptions.push(`${allyChamp.displayName} ile ${synergy.reason}`)
            }
          }
        }
      }
    })

    // Özel sinerji bonusları
    // Yasuo için havaya kaldıran şampiyon kontrolü
    if (champion.id === 157) { // Yasuo
      const knockupChampions = [54, 89, 111, 154, 32, 113, 59, 516, 64, 79, 497] // Malph, Leo, Naut, Zac, Amumu, Sej, J4, Ornn, Lee, Grag, Rakan
      const hasKnockup = myTeam.some(m => knockupChampions.includes(m.championId))
      if (hasKnockup && score === 0) {
        score += 20
        descriptions.push('Takımda havaya kaldıran şampiyon var - ulti fırsatı!')
      }
    }

    return {
      type: 'synergy',
      score,
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Takım arkadaşlarıyla uyumlu.'
    }
  }

  // ==========================================
  // 3. COUNTER PUANI
  // ==========================================

  /**
   * Rakip takıma karşı counter potansiyelini değerlendirir.
   */
  evaluateCounters(champion: Champion, theirTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    // Yeni counter veritabanından kontrol
    const counters = getCountersForChampion(champion.id)

    theirTeam.forEach(member => {
      if (member.championId > 0) {
        // Önce yeni veritabanından kontrol
        const counterData = counters.find(c => c.championId === member.championId)
        if (counterData) {
          const counterBonus = Math.round(counterData.counterScore / 3.5)
          score += counterBonus

          const enemyChamp = getChampionById(member.championId)
          if (enemyChamp) {
            descriptions.push(`${enemyChamp.displayName}'a karşı güçlü: ${counterData.reason}`)
          }
        } else {
          // Eski veritabanından kontrol
          const counter = champion.counters.find(c => c.championId === member.championId)
          if (counter) {
            const counterBonus = Math.round(counter.counterScore / 3.5)
            score += counterBonus

            const enemyChamp = getChampionById(member.championId)
            if (enemyChamp) {
              descriptions.push(`${enemyChamp.displayName}'a karşı güçlü: ${counter.reason}`)
            }
          }
        }
      }
    })

    // Rakip takımın hasar tipine göre bonus
    const enemyDamageBonus = this.evaluateEnemyDamageType(champion, theirTeam)
    if (enemyDamageBonus.bonus > 0) {
      score += enemyDamageBonus.bonus
      descriptions.push(enemyDamageBonus.reason)
    }

    return {
      type: 'counter',
      score,
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Rakip takıma karşı avantajlı.'
    }
  }

  /**
   * Rakip takımın hasar tipine göre değerlendirme
   */
  private evaluateEnemyDamageType(champion: Champion, theirTeam: PickedChampion[]): { bonus: number; reason: string } {
    let physicalCount = 0
    let magicCount = 0

    theirTeam.forEach(member => {
      if (member.championId > 0) {
        const champ = getChampionById(member.championId)
        if (champ) {
          if (champ.damageType === 'Physical') physicalCount++
          else if (champ.damageType === 'Magic') magicCount++
        }
      }
    })

    // Full AD takıma karşı tank/zırh şampiyonları
    if (physicalCount >= 3) {
      if (isFrontlineChampion(champion.id) || champion.archetype.includes('Tank')) {
        return { 
          bonus: 25, 
          reason: 'Rakip takım tamamen AD odaklı - zırh yığarak durdurabilir!' 
        }
      }
    }

    // Full AP takıma karşı MR şampiyonları
    if (magicCount >= 3) {
      if (isFrontlineChampion(champion.id) || champion.archetype.includes('Tank')) {
        return { 
          bonus: 20, 
          reason: 'Rakip takım AP yoğun - MR ile dayanabilir' 
        }
      }
    }

    return { bonus: 0, reason: '' }
  }

  // ==========================================
  // 4. GÜÇ ARTIŞI (POWER SPIKE) UYUMU
  // ==========================================

  /**
   * Takımın güç eğrisiyle uyumu değerlendirir.
   */
  evaluatePowerSpikes(champion: Champion, myTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    let description = ''

    // Takımın genel güç eğrisini belirle
    const teamSpikes = this.analyzeTeamPowerCurve(myTeam)

    // Şampiyonun güç artışları
    const hasEarlyGame = champion.powerSpikes.includes('EarlyGame')
    const hasMidGame = champion.powerSpikes.includes('MidGame')
    const hasLateGame = champion.powerSpikes.includes('LateGame')
    const isTeamfighter = champion.powerSpikes.includes('TeamfightGod')
    const is1v1 = champion.powerSpikes.includes('1v1Beast')

    // Takım güç eğrisiyle uyum
    if (teamSpikes.needsEarlyGame && hasEarlyGame) {
      score += 15
      description = 'Erken oyun gücü takımın erken baskı yapmasını sağlar.'
    } else if (teamSpikes.needsLateGame && hasLateGame) {
      score += 15
      description = 'Geç oyun gücü takımın scale etmesine yardımcı olur.'
    } else if (teamSpikes.hasStrongTeamfight && isTeamfighter) {
      score += 10
      description = 'Takım savaşı odaklı kompozisyonu güçlendirir.'
    }

    // 1v1 canavarları için özel not
    if (is1v1 && hasEarlyGame) {
      if (!description) {
        description = 'Erken oyunda 1v1 canavarı - objektiflerde ve Yampiri savaşlarında üstün.'
        score += 10
      }
    }

    return {
      type: 'powerSpike',
      score,
      description: description || 'Güç artışları takımla uyumlu.'
    }
  }

  /**
   * Takımın güç eğrisini analiz eder
   */
  private analyzeTeamPowerCurve(myTeam: PickedChampion[]): {
    needsEarlyGame: boolean
    needsLateGame: boolean
    hasStrongTeamfight: boolean
  } {
    let earlyGameCount = 0
    let lateGameCount = 0
    let teamfightCount = 0

    myTeam.forEach(member => {
      if (member.championId > 0) {
        const champ = getChampionById(member.championId)
        if (champ) {
          if (champ.powerSpikes.includes('EarlyGame')) earlyGameCount++
          if (champ.powerSpikes.includes('LateGame')) lateGameCount++
          if (champ.powerSpikes.includes('TeamfightGod')) teamfightCount++
        }
      }
    })

    return {
      needsEarlyGame: lateGameCount >= 2, // Geç oyun ağırlıklıysa erken oyun lazım
      needsLateGame: earlyGameCount >= 2, // Erken oyun ağırlıklıysa scale lazım
      hasStrongTeamfight: teamfightCount >= 2
    }
  }

  // ==========================================
  // 5. PRO ARENA VERİSİ (GELİŞTİRİLMİŞ)
  // ==========================================

  /**
   * Profesyonel arena verilerini değerlendirir.
   */
  evaluateProData(champion: Champion, theirTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    // Yeni Pro Play veritabanından kontrol
    const proStats = getProPlayStats(champion.id)
    const highEloWinRate = getHighEloWinRate(champion.id)

    if (proStats) {
      // High elo win rate bonusu
      if (highEloWinRate >= 52) {
        const winRateBonus = Math.round((highEloWinRate - 50) * 3)
        score += winRateBonus
        descriptions.push(`High Elo'da %${highEloWinRate.toFixed(1)} kazanma oranı!`)
      }

      // Tier bonusu
      if (proStats.tier === 'S+') {
        score += 15
        descriptions.push('Meta\'da S+ tier - en güçlü seçimlerden biri!')
      } else if (proStats.tier === 'S') {
        score += 10
        descriptions.push('Meta\'da S tier - çok güçlü seçim')
      } else if (proStats.tier === 'A') {
        score += 5
        descriptions.push('Meta\'da A tier - güçlü seçim')
      }

      // Pro pick rate bonusu
      if (proStats.proPickRate >= 30) {
        score += 10
        descriptions.push(`Pro oyunlarda %${proStats.proPickRate.toFixed(0)} pick oranı`)
      } else if (proStats.proPickRate >= 15) {
        score += 5
      }

      // Blind pick güvenliği
      if (proStats.blindPickSafe) {
        score += 5
        descriptions.push('Blind pick için güvenli')
      }

    } else {
      // Eski verilerden çek
      const proData = champion.proData

      if (proData.winRate >= 52) {
        const winRateBonus = Math.round((proData.winRate - 50) * 2)
        score += winRateBonus
        descriptions.push(`Pro arenada %${proData.winRate.toFixed(1)} kazanma oranı`)
      }

      if (proData.popularity >= 7) {
        score += 5
        descriptions.push('Meta\'da sık tercih edilen şampiyon')
      }
    }

    return {
      type: 'proData',
      score,
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Pro arenada güçlü performans.'
    }
  }

  // ==========================================
  // 6. WOMBO COMBO POTANSİYELİ
  // ==========================================

  /**
   * Şampiyonun wombo combo potansiyelini değerlendirir.
   */
  evaluateWomboCombo(champion: Champion, myTeam: PickedChampion[]): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    const teamChampionIds = myTeam
      .filter(m => m.championId > 0)
      .map(m => m.championId)

    // Bu şampiyonun dahil olduğu combo'ları bul
    const combos = findComboPartnersForChampion(champion.id)

    for (const combo of combos) {
      // Combo'daki diğer şampiyonların kaçı takımda?
      const otherChampions = combo.champions.filter(id => id !== champion.id)
      const matchingInTeam = otherChampions.filter(id => teamChampionIds.includes(id))

      if (matchingInTeam.length === otherChampions.length) {
        // TAM COMBO TAMAMLANIYOR!
        const comboBonus = Math.round(combo.synergyScore / 2.5)
        score += comboBonus
        descriptions.push(`🔥 ${combo.name} combo tamamlanıyor! ${combo.description}`)
      } else if (matchingInTeam.length >= 1 && otherChampions.length <= 2) {
        // Kısmi combo potansiyeli
        const partialBonus = Math.round(combo.synergyScore / 5)
        score += partialBonus
        descriptions.push(`${combo.name} combo'su için potansiyel mevcut`)
      }
    }

    // Yasuo için özel knockup kontrolü
    if (champion.id === 157) { // Yasuo
      const knockupChampions = [54, 89, 111, 154, 32, 113, 59, 516, 64, 79, 497, 12, 131] 
      const knockupCount = teamChampionIds.filter(id => knockupChampions.includes(id)).length
      if (knockupCount >= 2 && score === 0) {
        score += 25
        descriptions.push('Takımda çoklu knockup var - Yasuo R için mükemmel!')
      }
    }

    return {
      type: 'womboCombo',
      score,
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Combo potansiyeli mevcut.'
    }
  }

  // ==========================================
  // 7. LANE MATCHUP DEĞERLENDİRMESİ
  // ==========================================

  /**
   * Şampiyonun lane matchup'ını değerlendirir.
   */
  evaluateLaneMatchup(champion: Champion, theirTeam: PickedChampion[], role?: string): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    // Şampiyonun counter potansiyellerini kontrol et
    const laneCounters = role 
      ? getCounterPicksForChampion(champion.id, role) 
      : getCounterPicksForChampion(champion.id)

    for (const member of theirTeam) {
      if (member.championId > 0) {
        // Bu şampiyon rakip şampiyonu counter'lıyor mu?
        const counterData = laneCounters.find(c => c.championId === member.championId)
        if (counterData) {
          const counterBonus = Math.round(counterData.counterScore / 3)
          score += counterBonus

          const enemyChamp = getChampionById(member.championId)
          if (enemyChamp) {
            descriptions.push(`${enemyChamp.displayName}'ı lane'de ezer: ${counterData.reason}`)
          }
        }
      }
    }

    // Ek olarak: şampiyon counter'lanıyor mu kontrol et
    for (const member of theirTeam) {
      if (member.championId > 0) {
        const enemyCounters = role 
          ? getCounterPicksForChampion(member.championId, role)
          : getCounterPicksForChampion(member.championId)
        
        const isCountered = enemyCounters.find(c => c.championId === champion.id)
        // Bu şampiyon, rakip için counter değilse ve rakip bu şampiyonu counter'lıyorsa
        if (!isCountered) {
          // Rakip şampiyon bu şampiyonu counter'lıyor mu?
          const matchups = role ? getMatchupsForRole(role) : {}
          const matchup = matchups[champion.id]
          if (matchup?.find(c => c.championId === member.championId)) {
            score -= 10 // Counter'lanma penaltisi
            const enemyChamp = getChampionById(member.championId)
            if (enemyChamp && descriptions.length === 0) {
              descriptions.push(`DİKKAT: ${enemyChamp.displayName} bu şampiyonu counter'lıyor olabilir`)
            }
          }
        }
      }
    }

    return {
      type: 'laneMatchup',
      score: Math.max(0, score),
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Lane matchup uygun.'
    }
  }

  // ==========================================
  // 8. CANLI META VERİSİ DEĞERLENDİRMESİ
  // ==========================================

  /**
   * Canlı meta verilerini değerlendirir (win rate, tier, pick rate vb.)
   */
  evaluateLiveMeta(champion: Champion, role?: Role): RecommendationReason {
    let score = 0
    const descriptions: string[] = []

    const metaStats = metaDataService.getChampionMetaStats(champion.id, role)
    
    if (metaStats) {
      // Tier bonusu
      const tierBonuses: Record<string, number> = {
        'S+': 20,
        'S': 15,
        'A': 8,
        'B': 3,
        'C': 0,
        'D': -5
      }
      
      const tierBonus = tierBonuses[metaStats.tier] || 0
      if (tierBonus > 0) {
        score += tierBonus
        descriptions.push(`📊 Meta ${metaStats.tier} Tier - Patch ${metaStats.patch}`)
      }

      // Win rate bonusu (52%+ için bonus, 48%- için penaltı)
      if (metaStats.winRate >= 53) {
        score += 15
        descriptions.push(`🏆 Win Rate: %${metaStats.winRate.toFixed(1)} (Çok Yüksek!)`)
      } else if (metaStats.winRate >= 52) {
        score += 10
        descriptions.push(`✅ Win Rate: %${metaStats.winRate.toFixed(1)} (Yüksek)`)
      } else if (metaStats.winRate >= 51) {
        score += 5
        descriptions.push(`Win Rate: %${metaStats.winRate.toFixed(1)}`)
      } else if (metaStats.winRate < 48) {
        score -= 5
        descriptions.push(`⚠️ Win Rate: %${metaStats.winRate.toFixed(1)} (Düşük)`)
      }

      // Pick rate bonusu (popüler = güvenilir veri)
      if (metaStats.pickRate >= 10) {
        score += 5
        descriptions.push(`🔥 Popüler: %${metaStats.pickRate.toFixed(1)} pick rate`)
      }

      // Ban rate göstergesi (çok ban yiyorsa güçlüdür ama alınamayabilir)
      if (metaStats.banRate >= 20) {
        score += 3
        descriptions.push(`⛔ Yüksek ban rate: %${metaStats.banRate.toFixed(1)}`)
      }
    } else {
      // Meta verisi yoksa basit değerlendirme
      const metaScore = metaDataService.getMetaScore(champion.id, role)
      if (metaScore >= 70) {
        score += 10
        descriptions.push('Meta\'da güçlü konumda')
      }
    }

    return {
      type: 'proData', // Aynı tip kullanılıyor çünkü her ikisi de meta verisi
      score: Math.max(0, score),
      description: descriptions.length > 0 
        ? descriptions[0]
        : 'Meta durumu değerlendirildi.'
    }
  }

  // ==========================================
  // 9. KAPSAMLI SKOR HESAPLAMA
  // ==========================================

  /**
   * Tüm faktörleri değerlendirip toplam skor hesaplar.
   */
  calculateTotalScore(
    champion: Champion, 
    myTeam: PickedChampion[], 
    theirTeam: PickedChampion[],
    role?: string
  ): { totalScore: number; reasons: RecommendationReason[] } {
    const reasons: RecommendationReason[] = []
    let totalScore = 0

    // 1. Kompozisyon analizi
    const compositionScore = this.evaluateComposition(champion, myTeam)
    reasons.push(compositionScore)
    totalScore += compositionScore.score

    // 2. Sinerji bonusu
    const synergyScore = this.evaluateSynergy(champion, myTeam)
    reasons.push(synergyScore)
    totalScore += synergyScore.score

    // 3. Counter puanı
    const counterScore = this.evaluateCounters(champion, theirTeam)
    reasons.push(counterScore)
    totalScore += counterScore.score

    // 4. Güç artışı uyumu
    const powerSpikeScore = this.evaluatePowerSpikes(champion, myTeam)
    reasons.push(powerSpikeScore)
    totalScore += powerSpikeScore.score

    // 5. Pro arena verisi
    const proDataScore = this.evaluateProData(champion, theirTeam)
    reasons.push(proDataScore)
    totalScore += proDataScore.score

    // 6. Wombo combo potansiyeli
    const womboScore = this.evaluateWomboCombo(champion, myTeam)
    reasons.push(womboScore)
    totalScore += womboScore.score

    // 7. Lane matchup (eğer rol belirtilmişse)
    if (role) {
      const laneScore = this.evaluateLaneMatchup(champion, theirTeam, role)
      reasons.push(laneScore)
      totalScore += laneScore.score
    }

    // 8. Canlı meta verisi
    const liveMetaScore = this.evaluateLiveMeta(champion, role as Role | undefined)
    if (liveMetaScore.score > 0) {
      // Pro data zaten eklenmişse, live meta'yı ayrı ekleme (çakışmayı önle)
      const existingProData = reasons.find(r => r.type === 'proData')
      if (existingProData) {
        // Mevcut pro data skoruna ekle
        existingProData.score = Math.max(existingProData.score, liveMetaScore.score)
        if (liveMetaScore.description.includes('Meta') || liveMetaScore.description.includes('Win Rate')) {
          existingProData.description = liveMetaScore.description
        }
      } else {
        reasons.push(liveMetaScore)
      }
      totalScore += Math.round(liveMetaScore.score / 2) // Pro data ile çakışmayı önlemek için yarı puan
    }

    // Sadece pozitif skorlu reason'ları tut ve sırala
    const positiveReasons = reasons
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)

    return { totalScore, reasons: positiveReasons }
  }
}
