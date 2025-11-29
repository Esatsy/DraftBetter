/**
 * PRO PLAY VE İSTATİSTİK VERİTABANI
 * 
 * Profesyonel oyuncuların tercih ettiği şampiyonlar,
 * yüksek elo win rate'leri ve meta bilgileri
 * 
 * Veri kaynağı: Pro play statistics, high elo data
 * Patch: 14.x
 */

// ==========================================
// PRO PLAY TIER LİSTESİ
// ==========================================

export interface ProPlayStats {
  championId: number;
  championName: string;
  role: string;
  tier: 'S+' | 'S' | 'A' | 'B' | 'C';
  pickRate: number;      // 0-100
  banRate: number;       // 0-100
  winRate: number;       // 0-100
  popularity: number;    // 0-100
  proPickRate: number;   // Pro maçlarda pick oranı 0-100
  proBanRate: number;    // Pro maçlarda ban oranı 0-100
  blindPickSafe: boolean; // Blind pick'te güvenli mi
  strongWith: number[];   // Bu şampiyonlarla güçlü (champion IDs)
  weakAgainst: number[];  // Bu şampiyonlara karşı zayıf
}

export const PRO_PLAY_STATS: ProPlayStats[] = [
  // ============================================
  // TOP LANE - PRO META
  // ============================================
  {
    championId: 266, // Aatrox
    championName: 'Aatrox',
    role: 'Top',
    tier: 'S',
    pickRate: 12.5,
    banRate: 18.3,
    winRate: 51.2,
    popularity: 85,
    proPickRate: 25.4,
    proBanRate: 32.1,
    blindPickSafe: true,
    strongWith: [113, 89, 21], // Sej, Leona, MF
    weakAgainst: [114, 24, 240] // Fiora, Jax, Kled
  },
  {
    championId: 164, // Camille
    championName: 'Camille',
    role: 'Top',
    tier: 'S',
    pickRate: 8.2,
    banRate: 12.1,
    winRate: 50.8,
    popularity: 75,
    proPickRate: 18.3,
    proBanRate: 22.4,
    blindPickSafe: false,
    strongWith: [64, 238, 555], // Lee, Zed, Pyke
    weakAgainst: [24, 58, 122] // Jax, Renekton, Darius
  },
  {
    championId: 150, // Gnar
    championName: 'Gnar',
    role: 'Top',
    tier: 'S',
    pickRate: 6.8,
    banRate: 5.2,
    winRate: 50.1,
    popularity: 60,
    proPickRate: 28.7,
    proBanRate: 15.3,
    blindPickSafe: true,
    strongWith: [157, 61, 21], // Yasuo, Ori, MF
    weakAgainst: [39, 164, 24] // Irelia, Camille, Jax
  },
  {
    championId: 516, // Ornn
    championName: 'Ornn',
    role: 'Top',
    tier: 'S+',
    pickRate: 5.2,
    banRate: 8.1,
    winRate: 52.3,
    popularity: 55,
    proPickRate: 35.2,
    proBanRate: 28.6,
    blindPickSafe: true,
    strongWith: [157, 222, 145], // Yasuo, Jinx, Kaisa
    weakAgainst: [67, 114] // Vayne, Fiora
  },
  {
    championId: 875, // Sett
    championName: 'Sett',
    role: 'Top',
    tier: 'A',
    pickRate: 7.5,
    banRate: 6.3,
    winRate: 50.5,
    popularity: 65,
    proPickRate: 12.4,
    proBanRate: 8.2,
    blindPickSafe: true,
    strongWith: [89, 111, 32], // Leona, Naut, Amumu
    weakAgainst: [67, 69, 85] // Vayne, Cass, Kennen
  },
  {
    championId: 98, // Shen
    championName: 'Shen',
    role: 'Top',
    tier: 'A',
    pickRate: 4.2,
    banRate: 3.1,
    winRate: 51.8,
    popularity: 45,
    proPickRate: 15.6,
    proBanRate: 5.2,
    blindPickSafe: true,
    strongWith: [222, 145, 119], // Jinx, Kaisa, Draven
    weakAgainst: [8, 69] // Vlad, Cass
  },
  {
    championId: 85, // Kennen
    championName: 'Kennen',
    role: 'Top',
    tier: 'A',
    pickRate: 3.8,
    banRate: 2.1,
    winRate: 50.2,
    popularity: 40,
    proPickRate: 18.2,
    proBanRate: 8.5,
    blindPickSafe: true,
    strongWith: [59, 157, 61], // J4, Yasuo, Ori
    weakAgainst: [8, 39] // Vlad, Irelia
  },
  
  // ============================================
  // JUNGLE - PRO META
  // ============================================
  {
    championId: 64, // Lee Sin
    championName: 'LeeSin',
    role: 'Jungle',
    tier: 'S+',
    pickRate: 18.5,
    banRate: 22.1,
    winRate: 48.2,
    popularity: 95,
    proPickRate: 45.2,
    proBanRate: 35.8,
    blindPickSafe: true,
    strongWith: [157, 61, 134], // Yasuo, Ori, Syndra
    weakAgainst: [33, 154, 113] // Rammus, Zac, Sej
  },
  {
    championId: 59, // Jarvan IV
    championName: 'JarvanIV',
    role: 'Jungle',
    tier: 'S',
    pickRate: 8.5,
    banRate: 5.2,
    winRate: 51.5,
    popularity: 70,
    proPickRate: 32.1,
    proBanRate: 18.4,
    blindPickSafe: true,
    strongWith: [61, 21, 63], // Ori, MF, Brand
    weakAgainst: [64, 60] // Lee, Elise
  },
  {
    championId: 154, // Zac
    championName: 'Zac',
    role: 'Jungle',
    tier: 'S',
    pickRate: 5.2,
    banRate: 8.5,
    winRate: 52.8,
    popularity: 55,
    proPickRate: 22.4,
    proBanRate: 15.3,
    blindPickSafe: true,
    strongWith: [157, 61, 21], // Yasuo, Ori, MF
    weakAgainst: [64, 76] // Lee, Nidalee
  },
  {
    championId: 234, // Viego
    championName: 'Viego',
    role: 'Jungle',
    tier: 'S',
    pickRate: 12.3,
    banRate: 28.5,
    winRate: 50.2,
    popularity: 80,
    proPickRate: 28.6,
    proBanRate: 42.1,
    blindPickSafe: false,
    strongWith: [89, 111, 54], // Leona, Naut, Malph
    weakAgainst: [64, 121, 76] // Lee, Kha, Nidalee
  },
  {
    championId: 113, // Sejuani
    championName: 'Sejuani',
    role: 'Jungle',
    tier: 'A',
    pickRate: 4.2,
    banRate: 2.1,
    winRate: 52.1,
    popularity: 40,
    proPickRate: 18.5,
    proBanRate: 8.2,
    blindPickSafe: true,
    strongWith: [236, 145, 222], // Lucian, Kaisa, Jinx
    weakAgainst: [64, 76] // Lee, Nidalee
  },
  
  // ============================================
  // MID LANE - PRO META
  // ============================================
  {
    championId: 103, // Ahri
    championName: 'Ahri',
    role: 'Mid',
    tier: 'S',
    pickRate: 12.5,
    banRate: 8.2,
    winRate: 51.8,
    popularity: 85,
    proPickRate: 22.4,
    proBanRate: 12.1,
    blindPickSafe: true,
    strongWith: [64, 254, 89], // Lee, Vi, Leona
    weakAgainst: [238, 84, 105] // Zed, Akali, Fizz
  },
  {
    championId: 61, // Orianna
    championName: 'Orianna',
    role: 'Mid',
    tier: 'S+',
    pickRate: 6.8,
    banRate: 3.5,
    winRate: 50.5,
    popularity: 60,
    proPickRate: 38.2,
    proBanRate: 15.6,
    blindPickSafe: true,
    strongWith: [59, 120, 154], // J4, Heca, Zac
    weakAgainst: [238, 105, 84] // Zed, Fizz, Akali
  },
  {
    championId: 134, // Syndra
    championName: 'Syndra',
    role: 'Mid',
    tier: 'S',
    pickRate: 8.2,
    banRate: 12.5,
    winRate: 50.2,
    popularity: 70,
    proPickRate: 28.5,
    proBanRate: 22.4,
    blindPickSafe: true,
    strongWith: [59, 64, 89], // J4, Lee, Leona
    weakAgainst: [105, 238, 7] // Fizz, Zed, LeBlanc
  },
  {
    championId: 1, // Annie
    championName: 'Annie',
    role: 'Mid',
    tier: 'A',
    pickRate: 5.2,
    banRate: 2.1,
    winRate: 53.2,
    popularity: 45,
    proPickRate: 8.5,
    proBanRate: 2.4,
    blindPickSafe: true,
    strongWith: [59, 32, 154], // J4, Amumu, Zac
    weakAgainst: [238, 7, 84] // Zed, LB, Akali
  },
  {
    championId: 4, // Twisted Fate
    championName: 'TwistedFate',
    role: 'Mid',
    tier: 'A',
    pickRate: 3.8,
    banRate: 5.2,
    winRate: 49.5,
    popularity: 40,
    proPickRate: 25.4,
    proBanRate: 18.2,
    blindPickSafe: false,
    strongWith: [113, 32, 64], // Sej, Amumu, Lee
    weakAgainst: [238, 7, 105] // Zed, LB, Fizz
  },
  {
    championId: 157, // Yasuo
    championName: 'Yasuo',
    role: 'Mid',
    tier: 'A',
    pickRate: 15.2,
    banRate: 28.5,
    winRate: 49.2,
    popularity: 95,
    proPickRate: 12.4,
    proBanRate: 8.5,
    blindPickSafe: false,
    strongWith: [54, 154, 516], // Malph, Zac, Ornn
    weakAgainst: [80, 58, 90] // Panth, Renek, Malz
  },
  
  // ============================================
  // ADC - PRO META
  // ============================================
  {
    championId: 145, // Kai'Sa
    championName: 'Kaisa',
    role: 'ADC',
    tier: 'S+',
    pickRate: 22.5,
    banRate: 15.2,
    winRate: 50.8,
    popularity: 95,
    proPickRate: 42.1,
    proBanRate: 28.5,
    blindPickSafe: true,
    strongWith: [111, 89, 54], // Naut, Leona, Malph
    weakAgainst: [119, 51] // Draven, Cait
  },
  {
    championId: 498, // Xayah
    championName: 'Xayah',
    role: 'ADC',
    tier: 'S',
    pickRate: 8.5,
    banRate: 5.2,
    winRate: 51.2,
    popularity: 70,
    proPickRate: 28.6,
    proBanRate: 12.4,
    blindPickSafe: true,
    strongWith: [497, 89, 111], // Rakan, Leona, Naut
    weakAgainst: [51, 67] // Cait, Vayne
  },
  {
    championId: 81, // Ezreal
    championName: 'Ezreal',
    role: 'ADC',
    tier: 'S',
    pickRate: 25.2,
    banRate: 3.5,
    winRate: 49.5,
    popularity: 90,
    proPickRate: 35.2,
    proBanRate: 5.2,
    blindPickSafe: true,
    strongWith: [43, 117, 350], // Karma, Lulu, Yuumi
    weakAgainst: [119, 236] // Draven, Lucian
  },
  {
    championId: 51, // Caitlyn
    championName: 'Caitlyn',
    role: 'ADC',
    tier: 'S',
    pickRate: 15.8,
    banRate: 8.2,
    winRate: 50.5,
    popularity: 80,
    proPickRate: 22.4,
    proBanRate: 15.6,
    blindPickSafe: true,
    strongWith: [117, 25, 99], // Lulu, Morg, Lux
    weakAgainst: [236, 145] // Lucian, Kaisa
  },
  {
    championId: 222, // Jinx
    championName: 'Jinx',
    role: 'ADC',
    tier: 'A',
    pickRate: 12.5,
    banRate: 5.2,
    winRate: 51.8,
    popularity: 75,
    proPickRate: 15.2,
    proBanRate: 8.5,
    blindPickSafe: false,
    strongWith: [117, 40, 201], // Lulu, Janna, Braum
    weakAgainst: [119, 236, 145] // Draven, Lucian, Kaisa
  },
  {
    championId: 236, // Lucian
    championName: 'Lucian',
    role: 'ADC',
    tier: 'S',
    pickRate: 18.5,
    banRate: 12.1,
    winRate: 49.8,
    popularity: 85,
    proPickRate: 32.4,
    proBanRate: 22.1,
    blindPickSafe: true,
    strongWith: [267, 201, 89], // Nami, Braum, Leona
    weakAgainst: [67, 222] // Vayne, Jinx (late)
  },
  
  // ============================================
  // SUPPORT - PRO META
  // ============================================
  {
    championId: 412, // Thresh
    championName: 'Thresh',
    role: 'Support',
    tier: 'S+',
    pickRate: 18.5,
    banRate: 12.1,
    winRate: 50.2,
    popularity: 90,
    proPickRate: 38.5,
    proBanRate: 22.4,
    blindPickSafe: true,
    strongWith: [119, 236, 145], // Draven, Lucian, Kaisa
    weakAgainst: [25, 40] // Morg, Janna
  },
  {
    championId: 111, // Nautilus
    championName: 'Nautilus',
    role: 'Support',
    tier: 'S',
    pickRate: 12.5,
    banRate: 18.2,
    winRate: 51.5,
    popularity: 80,
    proPickRate: 28.6,
    proBanRate: 25.4,
    blindPickSafe: true,
    strongWith: [145, 157, 777], // Kaisa, Yasuo, Yone
    weakAgainst: [25, 40] // Morg, Janna
  },
  {
    championId: 89, // Leona
    championName: 'Leona',
    role: 'Support',
    tier: 'S',
    pickRate: 10.2,
    banRate: 8.5,
    winRate: 51.8,
    popularity: 75,
    proPickRate: 22.4,
    proBanRate: 15.2,
    blindPickSafe: false,
    strongWith: [21, 119, 145], // MF, Draven, Kaisa
    weakAgainst: [25, 40, 117] // Morg, Janna, Lulu
  },
  {
    championId: 497, // Rakan
    championName: 'Rakan',
    role: 'Support',
    tier: 'S',
    pickRate: 8.5,
    banRate: 5.2,
    winRate: 51.2,
    popularity: 70,
    proPickRate: 32.1,
    proBanRate: 18.5,
    blindPickSafe: true,
    strongWith: [498, 157, 145], // Xayah, Yasuo, Kaisa
    weakAgainst: [25, 89, 111] // Morg, Leona, Naut
  },
  {
    championId: 117, // Lulu
    championName: 'Lulu',
    role: 'Support',
    tier: 'A',
    pickRate: 8.2,
    banRate: 12.5,
    winRate: 52.1,
    popularity: 65,
    proPickRate: 18.5,
    proBanRate: 12.4,
    blindPickSafe: true,
    strongWith: [222, 96, 67], // Jinx, Kog, Vayne
    weakAgainst: [89, 111, 555] // Leona, Naut, Pyke
  },
  {
    championId: 25, // Morgana
    championName: 'Morgana',
    role: 'Support',
    tier: 'A',
    pickRate: 6.5,
    banRate: 8.2,
    winRate: 51.5,
    popularity: 60,
    proPickRate: 15.2,
    proBanRate: 8.5,
    blindPickSafe: true,
    strongWith: [51, 81, 145], // Cait, Ez, Kaisa
    weakAgainst: [37, 350, 117] // Sona, Yuumi, Lulu
  },
];

// ==========================================
// META TIER LİSTESİ (ROL BAZINDA)
// ==========================================

export const TIER_LIST = {
  top: {
    'S+': [516], // Ornn
    'S': [266, 164, 150], // Aatrox, Camille, Gnar
    'A': [875, 98, 85, 122], // Sett, Shen, Kennen, Darius
    'B': [54, 78, 58, 24], // Malph, Poppy, Renek, Jax
    'C': [23, 17, 86] // Trynd, Teemo, Garen
  },
  jungle: {
    'S+': [64], // Lee Sin
    'S': [59, 154, 234], // J4, Zac, Viego
    'A': [113, 32, 120], // Sej, Amumu, Heca
    'B': [254, 60, 76], // Vi, Elise, Nidalee
    'C': [11, 33, 19] // Yi, Rammus, Warwick
  },
  mid: {
    'S+': [61], // Orianna
    'S': [103, 134, 4], // Ahri, Syndra, TF
    'A': [157, 7, 238], // Yasuo, LeBlanc, Zed
    'B': [55, 112, 84], // Kata, Viktor, Akali
    'C': [45, 99, 1] // Veigar, Lux, Annie
  },
  adc: {
    'S+': [145], // Kai'Sa
    'S': [498, 81, 51, 236], // Xayah, Ez, Cait, Lucian
    'A': [222, 21, 67], // Jinx, MF, Vayne
    'B': [119, 110, 96], // Draven, Varus, Kog
    'C': [15, 18, 29] // Sivir, Trist, Twitch
  },
  support: {
    'S+': [412], // Thresh
    'S': [111, 89, 497], // Naut, Leona, Rakan
    'A': [117, 25, 40], // Lulu, Morg, Janna
    'B': [201, 267, 16], // Braum, Nami, Soraka
    'C': [53, 555, 350] // Blitz, Pyke, Yuumi
  }
};

// ==========================================
// WIN RATE VERİLERİ (HIGH ELO)
// ==========================================

export const HIGH_ELO_WIN_RATES: Record<number, number> = {
  // Top
  266: 51.2, // Aatrox
  164: 50.8, // Camille
  150: 50.1, // Gnar
  516: 52.3, // Ornn
  875: 50.5, // Sett
  98: 51.8, // Shen
  85: 50.2, // Kennen
  122: 49.8, // Darius
  54: 51.5, // Malphite
  78: 52.1, // Poppy
  114: 51.2, // Fiora
  24: 50.8, // Jax
  92: 49.5, // Riven
  39: 49.2, // Irelia
  
  // Jungle
  64: 48.2, // Lee Sin
  59: 51.5, // J4
  154: 52.8, // Zac
  234: 50.2, // Viego
  113: 52.1, // Sejuani
  32: 52.5, // Amumu
  120: 51.2, // Hecarim
  254: 50.8, // Vi
  60: 49.5, // Elise
  76: 48.8, // Nidalee
  121: 51.2, // Kha'Zix
  107: 50.5, // Rengar
  28: 51.8, // Evelynn
  11: 50.2, // Master Yi
  
  // Mid
  103: 51.8, // Ahri
  61: 50.5, // Orianna
  134: 50.2, // Syndra
  1: 53.2, // Annie
  4: 49.5, // TF
  157: 49.2, // Yasuo
  777: 49.5, // Yone
  7: 48.5, // LeBlanc
  238: 49.8, // Zed
  55: 50.5, // Katarina
  112: 51.2, // Viktor
  84: 49.2, // Akali
  105: 50.8, // Fizz
  99: 51.5, // Lux
  45: 52.8, // Veigar
  
  // ADC
  145: 50.8, // Kai'Sa
  498: 51.2, // Xayah
  81: 49.5, // Ezreal
  51: 50.5, // Caitlyn
  222: 51.8, // Jinx
  236: 49.8, // Lucian
  21: 51.2, // MF
  67: 52.5, // Vayne
  119: 49.2, // Draven
  110: 50.8, // Varus
  96: 51.5, // Kog'Maw
  18: 50.2, // Tristana
  
  // Support
  412: 50.2, // Thresh
  111: 51.5, // Nautilus
  89: 51.8, // Leona
  497: 51.2, // Rakan
  117: 52.1, // Lulu
  25: 51.5, // Morgana
  40: 52.8, // Janna
  201: 51.2, // Braum
  267: 52.5, // Nami
  16: 53.2, // Soraka
  53: 49.5, // Blitzcrank
  555: 48.8, // Pyke
  350: 50.2, // Yuumi
};

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

/**
 * Şampiyon için pro play stats getirir
 */
export function getProPlayStats(championId: number): ProPlayStats | undefined {
  return PRO_PLAY_STATS.find(s => s.championId === championId);
}

/**
 * Rol için tier listesi getirir
 */
export function getTierListForRole(role: string): Record<string, number[]> | undefined {
  const normalizedRole = role.toLowerCase();
  return TIER_LIST[normalizedRole as keyof typeof TIER_LIST];
}

/**
 * Şampiyonun tier'ını getirir
 */
export function getChampionTier(championId: number, role: string): string | undefined {
  const tierList = getTierListForRole(role);
  if (!tierList) return undefined;
  
  for (const [tier, champions] of Object.entries(tierList)) {
    if (champions.includes(championId)) return tier;
  }
  return 'C'; // Default tier
}

/**
 * High elo win rate getirir
 */
export function getHighEloWinRate(championId: number): number {
  return HIGH_ELO_WIN_RATES[championId] || 50.0;
}

/**
 * Blind pick için güvenli mi kontrol eder
 */
export function isBlindPickSafe(championId: number): boolean {
  const stats = getProPlayStats(championId);
  return stats?.blindPickSafe ?? true;
}

