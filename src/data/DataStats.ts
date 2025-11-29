/**
 * VERİ İSTATİSTİKLERİ
 * 
 * Uygulamadaki tüm veri kaynaklarının özetini sağlar
 */

import { CHAMPION_KNOWLEDGE_BASE } from './ChampionKnowledgeBase'
import { getTotalSynergyCount, getTotalCounterCount } from './SynergyData'
import { getTotalMatchupCount } from './LaneMatchups'
import { PRO_PLAY_STATS, HIGH_ELO_WIN_RATES, TIER_LIST } from './ProPlayData'
import { getTotalComboCount, getTotalCompositionCount } from './WomboComboData'
import { HARD_ENGAGE_CHAMPIONS, FRONTLINE_CHAMPIONS, PEEL_CHAMPIONS, DIVER_CHAMPIONS } from './EngageChampions'

export interface DataStatistics {
  champions: {
    total: number
    byRole: Record<string, number>
    byArchetype: Record<string, number>
    byDamageType: Record<string, number>
  }
  synergies: {
    total: number
    averagePerChampion: number
  }
  counters: {
    total: number
    laneMatchups: number
    averagePerChampion: number
  }
  proData: {
    championsWithStats: number
    championsWithWinRate: number
    tieredChampions: number
  }
  combos: {
    totalWomboCombos: number
    totalCompositions: number
  }
  roles: {
    hardEngageCount: number
    frontlineCount: number
    peelCount: number
    diverCount: number
  }
}

/**
 * Tüm veri istatistiklerini hesaplar
 */
export function calculateDataStatistics(): DataStatistics {
  // Şampiyon istatistikleri
  const byRole: Record<string, number> = {}
  const byArchetype: Record<string, number> = {}
  const byDamageType: Record<string, number> = {}

  CHAMPION_KNOWLEDGE_BASE.forEach(champion => {
    // Rol sayımı
    champion.role.forEach(role => {
      byRole[role] = (byRole[role] || 0) + 1
    })
    
    // Arketip sayımı
    champion.archetype.forEach(arch => {
      byArchetype[arch] = (byArchetype[arch] || 0) + 1
    })
    
    // Hasar tipi sayımı
    byDamageType[champion.damageType] = (byDamageType[champion.damageType] || 0) + 1
  })

  const totalSynergies = getTotalSynergyCount()
  const totalCounters = getTotalCounterCount()
  const totalMatchups = getTotalMatchupCount()
  
  // Tier listesindeki toplam şampiyon sayısı
  let tieredChampions = 0
  Object.values(TIER_LIST).forEach(roleList => {
    Object.values(roleList).forEach(champions => {
      tieredChampions += champions.length
    })
  })

  return {
    champions: {
      total: CHAMPION_KNOWLEDGE_BASE.length,
      byRole,
      byArchetype,
      byDamageType
    },
    synergies: {
      total: totalSynergies,
      averagePerChampion: Math.round(totalSynergies / CHAMPION_KNOWLEDGE_BASE.length * 10) / 10
    },
    counters: {
      total: totalCounters,
      laneMatchups: totalMatchups,
      averagePerChampion: Math.round((totalCounters + totalMatchups) / CHAMPION_KNOWLEDGE_BASE.length * 10) / 10
    },
    proData: {
      championsWithStats: PRO_PLAY_STATS.length,
      championsWithWinRate: Object.keys(HIGH_ELO_WIN_RATES).length,
      tieredChampions
    },
    combos: {
      totalWomboCombos: getTotalComboCount(),
      totalCompositions: getTotalCompositionCount()
    },
    roles: {
      hardEngageCount: HARD_ENGAGE_CHAMPIONS.length,
      frontlineCount: FRONTLINE_CHAMPIONS.length,
      peelCount: PEEL_CHAMPIONS.length,
      diverCount: DIVER_CHAMPIONS.length
    }
  }
}

/**
 * Konsola özet yazdırır
 */
export function printDataSummary(): void {
  const stats = calculateDataStatistics()
  
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║          📊 DRAFT BETTER - VERİ İSTATİSTİKLERİ               ║')
  console.log('╠══════════════════════════════════════════════════════════════╣')
  console.log(`║ 🎮 Toplam Şampiyon: ${stats.champions.total.toString().padEnd(40)}║`)
  console.log(`║ 🤝 Toplam Sinerji: ${stats.synergies.total.toString().padEnd(41)}║`)
  console.log(`║ ⚔️  Toplam Counter: ${stats.counters.total.toString().padEnd(40)}║`)
  console.log(`║ 🛤️  Lane Matchup: ${stats.counters.laneMatchups.toString().padEnd(42)}║`)
  console.log(`║ 🔥 Wombo Combo: ${stats.combos.totalWomboCombos.toString().padEnd(44)}║`)
  console.log(`║ 📋 Takım Kompozisyonu: ${stats.combos.totalCompositions.toString().padEnd(37)}║`)
  console.log(`║ 📈 Pro Stats: ${stats.proData.championsWithStats.toString().padEnd(46)}║`)
  console.log(`║ 📊 Win Rate Data: ${stats.proData.championsWithWinRate.toString().padEnd(42)}║`)
  console.log('╠══════════════════════════════════════════════════════════════╣')
  console.log('║                    ROL SINIFLANDIRMASI                       ║')
  console.log(`║ 💥 Hard Engage: ${stats.roles.hardEngageCount.toString().padEnd(44)}║`)
  console.log(`║ 🛡️  Frontline: ${stats.roles.frontlineCount.toString().padEnd(45)}║`)
  console.log(`║ 🏥 Peel: ${stats.roles.peelCount.toString().padEnd(51)}║`)
  console.log(`║ 🗡️  Diver: ${stats.roles.diverCount.toString().padEnd(49)}║`)
  console.log('╚══════════════════════════════════════════════════════════════╝')
}

/**
 * Veri kalitesi raporu
 */
export function getDataQualityReport(): string[] {
  const stats = calculateDataStatistics()
  const issues: string[] = []
  
  // Kalite kontrolleri
  if (stats.synergies.averagePerChampion < 1) {
    issues.push('⚠️ Sinerji verisi yetersiz - ortalama şampiyon başına 1\'den az sinerji')
  }
  
  if (stats.counters.averagePerChampion < 1) {
    issues.push('⚠️ Counter verisi yetersiz - ortalama şampiyon başına 1\'den az counter')
  }
  
  if (stats.proData.championsWithStats < 30) {
    issues.push('⚠️ Pro play verisi yetersiz - 30\'dan az şampiyonun detaylı verisi var')
  }
  
  if (stats.combos.totalWomboCombos < 20) {
    issues.push('⚠️ Wombo combo verisi yetersiz - 20\'den az combo tanımlı')
  }

  if (issues.length === 0) {
    issues.push('✅ Veri kalitesi iyi görünüyor!')
  }
  
  return issues
}

