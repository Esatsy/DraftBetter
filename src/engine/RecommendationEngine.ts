import {
  Champion,
  Recommendation,
  RecommendationReason,
  PickedChampion,
  Role,
  Archetype,
  DraftPhase
} from '../types'
import { CHAMPION_KNOWLEDGE_BASE, getChampionById } from '../data/ChampionKnowledgeBase'
import { ScoringRules } from './ScoringRules'

interface RecommendationInput {
  myTeam: PickedChampion[]
  theirTeam: PickedChampion[]
  userRole: Role | null
  bannedChampions: number[]
  phase: DraftPhase
}

/**
 * ÖNERİ MOTORU
 * 
 * Çok faktörlü puanlama sistemi ile en uygun şampiyonları önerir.
 * 
 * Puanlama Faktörleri:
 * 1. Kompozisyon Analizi - Takımda eksik arketip tespiti
 * 2. Sinerji Bonusu - Takım arkadaşlarıyla uyum
 * 3. Counter Puanı - Rakip takıma karşı üstünlük
 * 4. Power Spike Uyumu - Takım güç eğrisi analizi
 * 5. Pro Arena Verisi - Profesyonel tercih oranları
 */
export class RecommendationEngine {
  private scoringRules: ScoringRules

  constructor() {
    this.scoringRules = new ScoringRules()
  }

  /**
   * Ana öneri hesaplama fonksiyonu
   * 
   * Yeni geliştirilmiş 7 faktörlü puanlama sistemi:
   * 1. Kompozisyon Analizi - Takımda eksik arketip tespiti
   * 2. Sinerji Bonusu - Takım arkadaşlarıyla uyum
   * 3. Counter Puanı - Rakip takıma karşı üstünlük
   * 4. Power Spike Uyumu - Takım güç eğrisi analizi
   * 5. Pro Arena Verisi - Profesyonel tercih oranları ve tier
   * 6. Wombo Combo Potansiyeli - Combo tamamlama fırsatları
   * 7. Lane Matchup - Lane'de avantaj/dezavantaj
   */
  calculateRecommendations(input: RecommendationInput): Recommendation[] {
    const { myTeam, theirTeam, userRole, bannedChampions, phase } = input

    // Seçim aşaması değilse öneri yapma
    if (phase === 'none') {
      return []
    }

    // Seçilebilir şampiyonları filtrele
    const availableChampions = this.getAvailableChampions(
      myTeam,
      theirTeam,
      bannedChampions,
      userRole
    )

    // Her şampiyon için puan hesapla
    const recommendations: Recommendation[] = availableChampions.map(champion => {
      // Yeni kapsamlı skor hesaplama kullan
      const { totalScore, reasons } = this.scoringRules.calculateTotalScore(
        champion,
        myTeam,
        theirTeam,
        userRole ?? undefined
      )

      return {
        championId: champion.id,
        score: Math.min(100, Math.round(totalScore)),
        reasons: reasons.slice(0, 4) // En önemli 4 nedeni göster
      }
    })

    // Puana göre sırala ve en iyi 6'yı döndür (daha fazla seçenek)
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }

  /**
   * Seçilebilir şampiyonları filtreler
   */
  private getAvailableChampions(
    myTeam: PickedChampion[],
    theirTeam: PickedChampion[],
    bannedChampions: number[],
    userRole: Role | null
  ): Champion[] {
    // Zaten seçilmiş şampiyonları topla
    const pickedChampionIds = [
      ...myTeam.filter(m => m.championId > 0).map(m => m.championId),
      ...theirTeam.filter(m => m.championId > 0).map(m => m.championId)
    ]

    // Kullanılamaz şampiyonlar
    const unavailableIds = new Set([...bannedChampions, ...pickedChampionIds])

    // Filtrele
    return CHAMPION_KNOWLEDGE_BASE.filter(champion => {
      // Banlı veya seçilmiş mi?
      if (unavailableIds.has(champion.id)) {
        return false
      }

      // Kullanıcının rolüne uygun mu?
      if (userRole && !champion.role.includes(userRole)) {
        return false
      }

      return true
    })
  }
}


