/**
 * ENGAGE ŞAMPİYONLARI
 * 
 * Bu dosya savaş başlatıcı (engage) şampiyonlarını tanımlar.
 * Bunlar takım kompozisyonunda kritik öneme sahiptir.
 */

// Hard Engage şampiyonları - Takım savaşı başlatabilirler
export const HARD_ENGAGE_CHAMPIONS: number[] = [
  54,   // Malphite
  89,   // Leona
  111,  // Nautilus
  12,   // Alistar
  497,  // Rakan
  154,  // Zac
  113,  // Sejuani
  32,   // Amumu
  79,   // Gragas
  59,   // Jarvan IV
  120,  // Hecarim
  421,  // Rek'Sai
  516,  // Ornn
  78,   // Poppy
  254,  // Vi
  164,  // Camille
  141,  // Kayn (Rhaast)
  19,   // Warwick
  106,  // Volibear
  14,   // Sion
  57,   // Maokai
  98,   // Shen
  3,    // Galio
  150,  // Gnar (Mega)
  201,  // Braum
  555,  // Pyke
  223,  // Tahm Kench
  127,  // Lissandra
  131,  // Diana
  518,  // Neeko
  876,  // Lillia
  887,  // Gwen
  895,  // Nilah
];

// Soft Engage / Follow-up şampiyonları
export const SOFT_ENGAGE_CHAMPIONS: number[] = [
  412,  // Thresh
  53,   // Blitzcrank
  143,  // Zyra
  63,   // Brand
  25,   // Morgana
  99,   // Lux
  161,  // Vel'Koz
  101,  // Xerath
  134,  // Syndra
  61,   // Orianna
  34,   // Anivia
  45,   // Veigar
  142,  // Zoe
  526,  // Rell
  902,  // Milio
];

// Diver şampiyonları - Tek hedef dalış
export const DIVER_CHAMPIONS: number[] = [
  254,  // Vi
  164,  // Camille
  64,   // Lee Sin
  121,  // Kha'Zix
  107,  // Rengar
  131,  // Diana
  245,  // Ekko
  39,   // Irelia
  24,   // Jax
  80,   // Pantheon
  5,    // Xin Zhao
  104,  // Graves
  60,   // Elise
  56,   // Nocturne
  777,  // Yone
  711,  // Vex
  876,  // Lillia
  200,  // Bel'Veth
];

// Peel / Koruyucu şampiyonlar
export const PEEL_CHAMPIONS: number[] = [
  412,  // Thresh
  117,  // Lulu
  40,   // Janna
  267,  // Nami
  37,   // Sona
  16,   // Soraka
  201,  // Braum
  44,   // Taric
  350,  // Yuumi
  43,   // Karma
  26,   // Zilean
  497,  // Rakan
  147,  // Seraphine
  902,  // Milio
  526,  // Rell
];

// Tank / Frontline şampiyonlar
export const FRONTLINE_CHAMPIONS: number[] = [
  54,   // Malphite
  516,  // Ornn
  14,   // Sion
  57,   // Maokai
  31,   // Cho'Gath
  36,   // Dr. Mundo
  33,   // Rammus
  113,  // Sejuani
  154,  // Zac
  32,   // Amumu
  79,   // Gragas
  106,  // Volibear
  2,    // Olaf
  72,   // Skarner
  77,   // Udyr
  20,   // Nunu
  111,  // Nautilus
  89,   // Leona
  12,   // Alistar
  201,  // Braum
  223,  // Tahm Kench
  3,    // Galio
  78,   // Poppy
  98,   // Shen
];

/**
 * Şampiyonun engage tipi olup olmadığını kontrol eder
 */
export function isEngageChampion(championId: number): boolean {
  return HARD_ENGAGE_CHAMPIONS.includes(championId) || SOFT_ENGAGE_CHAMPIONS.includes(championId);
}

/**
 * Şampiyonun hard engage yapıp yapamayacağını kontrol eder
 */
export function isHardEngageChampion(championId: number): boolean {
  return HARD_ENGAGE_CHAMPIONS.includes(championId);
}

/**
 * Şampiyonun diver olup olmadığını kontrol eder
 */
export function isDiverChampion(championId: number): boolean {
  return DIVER_CHAMPIONS.includes(championId);
}

/**
 * Şampiyonun peel yapıp yapamayacağını kontrol eder
 */
export function isPeelChampion(championId: number): boolean {
  return PEEL_CHAMPIONS.includes(championId);
}

/**
 * Şampiyonun frontline olup olmadığını kontrol eder
 */
export function isFrontlineChampion(championId: number): boolean {
  return FRONTLINE_CHAMPIONS.includes(championId);
}

/**
 * Takımda engage eksikliği var mı kontrol eder
 */
export function teamNeedsEngage(teamChampionIds: number[]): boolean {
  return !teamChampionIds.some(id => isHardEngageChampion(id));
}

/**
 * Takımda frontline eksikliği var mı kontrol eder
 */
export function teamNeedsFrontline(teamChampionIds: number[]): boolean {
  return !teamChampionIds.some(id => isFrontlineChampion(id));
}

/**
 * Takımda peel eksikliği var mı kontrol eder
 */
export function teamNeedsPeel(teamChampionIds: number[]): boolean {
  return !teamChampionIds.some(id => isPeelChampion(id));
}

