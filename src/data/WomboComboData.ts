/**
 * WOMBO COMBO VERİTABANI
 * 
 * En güçlü takım kompozisyonları ve combo'ları
 * Her combo'nun gereken şampiyonları, sinerji puanı ve açıklaması
 * 
 * Veri kaynağı: Pro play, high elo, community
 */

// ==========================================
// COMBO TİPLERİ
// ==========================================

export interface WomboCombo {
  name: string;
  description: string;
  champions: number[];  // Champion IDs
  synergyScore: number; // 0-100
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timing: 'Early' | 'Mid' | 'Late' | 'Any';
  tags: string[];
}

export interface TeamComposition {
  name: string;
  description: string;
  roles: {
    top: number[];
    jungle: number[];
    mid: number[];
    adc: number[];
    support: number[];
  };
  playstyle: string;
  winCondition: string;
  strengths: string[];
  weaknesses: string[];
}

// ==========================================
// WOMBO COMBO'LAR
// ==========================================

export const WOMBO_COMBOS: WomboCombo[] = [
  // ============================================
  // KLASİK WOMBO'LAR
  // ============================================
  {
    name: 'Yasuo-Malphite',
    description: 'En ikonik combo. Malphite R + Yasuo R ile 5 kişiye anlık burst.',
    champions: [157, 54], // Yasuo, Malphite
    synergyScore: 100,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Classic', 'AoE', 'Engage', 'Teamfight']
  },
  {
    name: 'J4-Orianna',
    description: 'Profesyonel sahnelerin favorisi. J4 ulti + Ori R devastation.',
    champions: [59, 61], // J4, Ori
    synergyScore: 100,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['Pro', 'AoE', 'Engage', 'Teamfight']
  },
  {
    name: 'Amumu-MF',
    description: 'Low elo destroyer. Amumu R + MF R = team wipe garantili.',
    champions: [32, 21], // Amumu, MF
    synergyScore: 100,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Classic', 'AoE', 'Easy', 'Teamfight']
  },
  {
    name: 'Zac-Yasuo',
    description: 'Zac E ile çoklu hedef havaya kaldırma + Yasuo R.',
    champions: [154, 157], // Zac, Yasuo
    synergyScore: 100,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Engage', 'Teamfight']
  },
  {
    name: 'Ornn-Yasuo',
    description: 'Ornn R brittle + havaya kaldırma. Yasuo R ile follow.',
    champions: [516, 157], // Ornn, Yasuo
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Engage', 'Pro', 'Teamfight']
  },
  {
    name: 'Diana-Yasuo',
    description: 'Diana R havaya kaldırır + Yasuo R. Mid duo.',
    champions: [131, 157], // Diana, Yasuo
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Burst', 'Dive']
  },
  {
    name: 'Lee Sin-Yasuo',
    description: 'Lee R kick + Yasuo R. Yüksek skill gerektiren combo.',
    champions: [64, 157], // Lee, Yasuo
    synergyScore: 95,
    difficulty: 'Hard',
    timing: 'Mid',
    tags: ['Skill', 'Engage', 'Pro']
  },
  
  // ============================================
  // ENGAGE COMBO'LARI
  // ============================================
  {
    name: 'Rakan-Xayah',
    description: 'Lover duo. Özel buff ve recall. W havaya kaldırır.',
    champions: [497, 498], // Rakan, Xayah
    synergyScore: 100,
    difficulty: 'Medium',
    timing: 'Any',
    tags: ['Lover', 'Bot', 'Engage', 'Disengage']
  },
  {
    name: 'Rakan-Yasuo',
    description: 'Rakan W ile havaya kaldırma + Yasuo R.',
    champions: [497, 157], // Rakan, Yasuo
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['Engage', 'AoE', 'Teamfight']
  },
  {
    name: 'Alistar-Yasuo',
    description: 'Ali W-Q combo + Yasuo R.',
    champions: [12, 157], // Alistar, Yasuo
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['Engage', 'AoE', 'Teamfight']
  },
  {
    name: 'Nautilus-Kai\'Sa',
    description: 'Naut R = Kai\'Sa R garantili. Point-click engage.',
    champions: [111, 145], // Naut, Kaisa
    synergyScore: 95,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Bot', 'Engage', 'Pick']
  },
  {
    name: 'Leona-MF',
    description: 'Leona CC + MF ulti. Bot lane dominant.',
    champions: [89, 21], // Leona, MF
    synergyScore: 95,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Bot', 'Engage', 'AoE']
  },
  
  // ============================================
  // PROTECT THE CARRY
  // ============================================
  {
    name: 'Lulu-Kog\'Maw',
    description: 'PROTECT THE KOG! En klasik hypercarry koruma.',
    champions: [117, 96], // Lulu, Kog
    synergyScore: 100,
    difficulty: 'Medium',
    timing: 'Late',
    tags: ['Protect', 'Hypercarry', 'Late Game']
  },
  {
    name: 'Lulu-Jinx',
    description: 'Peel heaven. Jinx reset potansiyeli.',
    champions: [117, 222], // Lulu, Jinx
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Late',
    tags: ['Protect', 'Hypercarry', 'Late Game']
  },
  {
    name: 'Lulu-Vayne',
    description: 'Polymorph + Vayne stealth. Durdurulamaz.',
    champions: [117, 67], // Lulu, Vayne
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Late',
    tags: ['Protect', 'Hypercarry', '1v5']
  },
  {
    name: 'Janna-Jinx',
    description: 'Peel + disengage + reset potansiyeli.',
    champions: [40, 222], // Janna, Jinx
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Late',
    tags: ['Protect', 'Disengage', 'Late Game']
  },
  {
    name: 'Zilean-Kog\'Maw',
    description: 'Hız buff + revive. Kog iki kere ölür.',
    champions: [26, 96], // Zilean, Kog
    synergyScore: 95,
    difficulty: 'Hard',
    timing: 'Late',
    tags: ['Protect', 'Hypercarry', 'Revive']
  },
  
  // ============================================
  // SPEED/BUFF COMBO'LARI
  // ============================================
  {
    name: 'Hecarim-Orianna',
    description: 'Heca üzerine top + charge. Ölümcül engage.',
    champions: [120, 61], // Heca, Ori
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['Engage', 'AoE', 'Pro']
  },
  {
    name: 'Hecarim-Lulu',
    description: 'Hız + büyütme. Durdurulamaz at.',
    champions: [120, 117], // Heca, Lulu
    synergyScore: 90,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Speed', 'Engage', 'Dive']
  },
  {
    name: 'Hecarim-Karma',
    description: 'E hız buff + Heca pasifi. Çok hızlı engage.',
    champions: [120, 43], // Heca, Karma
    synergyScore: 85,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['Speed', 'Engage']
  },
  {
    name: 'Twitch-Lulu',
    description: 'Stealth + buff = sürpriz team wipe.',
    champions: [29, 117], // Twitch, Lulu
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Late',
    tags: ['Stealth', 'Surprise', 'Late Game']
  },
  {
    name: 'Twitch-Yuumi',
    description: 'Stealth beraber. Sürpriz gank.',
    champions: [29, 350], // Twitch, Yuumi
    synergyScore: 90,
    difficulty: 'Easy',
    timing: 'Late',
    tags: ['Stealth', 'Surprise', 'Gank']
  },
  
  // ============================================
  // LANE COMBO'LARI
  // ============================================
  {
    name: 'Lucian-Nami',
    description: 'E buff + Lucian pasif = en hızlı trade.',
    champions: [236, 267], // Lucian, Nami
    synergyScore: 95,
    difficulty: 'Easy',
    timing: 'Early',
    tags: ['Bot', 'Lane', 'Trade']
  },
  {
    name: 'Lucian-Braum',
    description: 'Pasif stack çok hızlı. Lane dominant.',
    champions: [236, 201], // Lucian, Braum
    synergyScore: 90,
    difficulty: 'Easy',
    timing: 'Early',
    tags: ['Bot', 'Lane', 'Stun']
  },
  {
    name: 'Draven-Thresh',
    description: 'Lantern + agresif oyun. Kill lane.',
    champions: [119, 412], // Draven, Thresh
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Early',
    tags: ['Bot', 'Kill Lane', 'Aggro']
  },
  {
    name: 'Draven-Leona',
    description: 'Erken oyun kill laneı. Level 2 all-in.',
    champions: [119, 89], // Draven, Leona
    synergyScore: 95,
    difficulty: 'Medium',
    timing: 'Early',
    tags: ['Bot', 'Kill Lane', 'All-in']
  },
  {
    name: 'Draven-Pyke',
    description: 'Kill lane + double gold. Snowball heaven.',
    champions: [119, 555], // Draven, Pyke
    synergyScore: 95,
    difficulty: 'Hard',
    timing: 'Early',
    tags: ['Bot', 'Kill Lane', 'Snowball']
  },
  {
    name: 'Caitlyn-Lux',
    description: 'Root + trap combo. Poke lane.',
    champions: [51, 99], // Cait, Lux
    synergyScore: 85,
    difficulty: 'Easy',
    timing: 'Early',
    tags: ['Bot', 'Poke', 'CC']
  },
  {
    name: 'Caitlyn-Morgana',
    description: 'Bind + trap. Güvenli lane.',
    champions: [51, 25], // Cait, Morg
    synergyScore: 85,
    difficulty: 'Easy',
    timing: 'Early',
    tags: ['Bot', 'Safe', 'CC']
  },
  
  // ============================================
  // AoE ULTİMATE COMBO'LAR
  // ============================================
  {
    name: 'J4-MF',
    description: 'J4 ulti içine MF R. Team wipe.',
    champions: [59, 21], // J4, MF
    synergyScore: 95,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['AoE', 'Teamfight', 'Burst']
  },
  {
    name: 'Malphite-MF',
    description: 'Malphite R + MF R. Klasik combo.',
    champions: [54, 21], // Malph, MF
    synergyScore: 95,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['AoE', 'Teamfight', 'Burst']
  },
  {
    name: 'Amumu-Brand',
    description: 'Amumu R + Brand pasif. Team melt.',
    champions: [32, 63], // Amumu, Brand
    synergyScore: 90,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['AoE', 'Teamfight', 'DoT']
  },
  {
    name: 'Malphite-Katarina',
    description: 'Malphite engage + Kata reset heaven.',
    champions: [54, 55], // Malph, Kata
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Reset', 'Teamfight']
  },
  {
    name: 'Diana-Yone',
    description: 'Diana R + Yone R. Çift AoE ult.',
    champions: [131, 777], // Diana, Yone
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Burst', 'Dive']
  },
  {
    name: 'Kennen-J4',
    description: 'J4 ulti + Kennen R. Hapiste şok.',
    champions: [85, 59], // Kennen, J4
    synergyScore: 90,
    difficulty: 'Medium',
    timing: 'Mid',
    tags: ['AoE', 'Teamfight', 'Stun']
  },
  {
    name: 'Gnar-Yasuo',
    description: 'Mega Gnar R + Yasuo R.',
    champions: [150, 157], // Gnar, Yasuo
    synergyScore: 90,
    difficulty: 'Hard',
    timing: 'Mid',
    tags: ['AoE', 'Engage', 'Pro']
  },
  {
    name: 'Maokai-MF',
    description: 'Maokai R + MF R. Root wave.',
    champions: [57, 21], // Maokai, MF
    synergyScore: 85,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['AoE', 'Teamfight', 'Root']
  },
  {
    name: 'Nami-MF',
    description: 'Nami R + MF R. Wave combo.',
    champions: [267, 21], // Nami, MF
    synergyScore: 85,
    difficulty: 'Easy',
    timing: 'Mid',
    tags: ['AoE', 'Bot', 'Teamfight']
  },
  
  // ============================================
  // DIVE COMBO'LARI
  // ============================================
  {
    name: 'Elise-Zed',
    description: 'Tower dive ikilisi. Rappel + shadow.',
    champions: [60, 238], // Elise, Zed
    synergyScore: 85,
    difficulty: 'Hard',
    timing: 'Early',
    tags: ['Dive', 'Assassin', 'Gank']
  },
  {
    name: 'Lee Sin-Zed',
    description: 'Dive + burst. Backline threat.',
    champions: [64, 238], // Lee, Zed
    synergyScore: 85,
    difficulty: 'Hard',
    timing: 'Mid',
    tags: ['Dive', 'Assassin', 'Burst']
  },
  {
    name: 'Alistar-Tristana',
    description: 'Tower dive combo. Jump + headbutt.',
    champions: [12, 18], // Ali, Trist
    synergyScore: 85,
    difficulty: 'Medium',
    timing: 'Early',
    tags: ['Dive', 'Bot', 'Tower']
  },
];

// ==========================================
// TAKIM KOMPOZİSYONLARI
// ==========================================

export const TEAM_COMPOSITIONS: TeamComposition[] = [
  {
    name: 'Wombo Combo Comp',
    description: 'AoE ultileri birleştiren, teamfight kazanan kompozisyon',
    roles: {
      top: [54, 516, 150], // Malph, Ornn, Gnar
      jungle: [59, 32, 154], // J4, Amumu, Zac
      mid: [61, 157, 131], // Ori, Yasuo, Diana
      adc: [21, 222, 81], // MF, Jinx, Ez
      support: [89, 111, 497] // Leona, Naut, Rakan
    },
    playstyle: 'Teamfight ve AoE ultimate kombinasyonları',
    winCondition: 'Büyük teamfight kazanmak',
    strengths: ['AoE damage', 'Teamfight', 'Engage'],
    weaknesses: ['Split push', 'Disengage comp', '1-3-1']
  },
  {
    name: 'Protect the Carry',
    description: 'Hypercarry ADC etrafında kurulu, late game scaling kompozisyon',
    roles: {
      top: [516, 78, 98], // Ornn, Poppy, Shen
      jungle: [113, 32, 154], // Sej, Amumu, Zac
      mid: [61, 117, 26], // Ori, Lulu, Zilean
      adc: [222, 67, 96], // Jinx, Vayne, Kog
      support: [117, 40, 201] // Lulu, Janna, Braum
    },
    playstyle: 'ADC koruma, peel, late game scaling',
    winCondition: 'Late game teamfight\'ta ADC\'nin carry etmesi',
    strengths: ['Late game', 'Peel', 'ADC protection'],
    weaknesses: ['Early game', 'Dive comp', 'Assassin heavy']
  },
  {
    name: 'Pick Comp',
    description: 'Tek hedef yakalama ve öldürme odaklı kompozisyon',
    roles: {
      top: [164, 266, 875], // Camille, Aatrox, Sett
      jungle: [64, 60, 254], // Lee, Elise, Vi
      mid: [103, 7, 134], // Ahri, LeBlanc, Syndra
      adc: [145, 81, 498], // Kaisa, Ez, Xayah
      support: [412, 111, 53] // Thresh, Naut, Blitz
    },
    playstyle: 'Tek hedef yakalama, pick off, rotation',
    winCondition: 'Sayısal avantaj yaratmak',
    strengths: ['Pick potential', 'Vision control', 'Rotation'],
    weaknesses: ['Full engage', '5v5 teamfight', 'Grouping']
  },
  {
    name: 'Poke Comp',
    description: 'Uzun menzilli hasar ile düşmanı yıpratan kompozisyon',
    roles: {
      top: [126, 85, 17], // Jayce, Kennen, Teemo
      jungle: [76, 60, 141], // Nidalee, Elise, Kayn
      mid: [101, 99, 115], // Xerath, Lux, Ziggs
      adc: [110, 81, 51], // Varus, Ez, Cait
      support: [43, 25, 99] // Karma, Morg, Lux
    },
    playstyle: 'Poke, siege, objective control',
    winCondition: 'Baron/Dragon fight\'larında poke ile yıpratma',
    strengths: ['Siege', 'Poke', 'Objective control'],
    weaknesses: ['Hard engage', 'Dive', 'Flank']
  },
  {
    name: 'Split Push Comp',
    description: '1-3-1 veya 1-4 split push kompozisyonu',
    roles: {
      top: [114, 24, 23], // Fiora, Jax, Trynd
      jungle: [141, 234, 121], // Kayn, Viego, Kha
      mid: [4, 91, 238], // TF, Talon, Zed
      adc: [81, 145, 236], // Ez, Kaisa, Lucian
      support: [412, 40, 25] // Thresh, Janna, Morg
    },
    playstyle: 'Split push, side lane pressure, TP plays',
    winCondition: 'Side lane pressure ile objektif almak',
    strengths: ['1v1', 'Side lane', 'Map pressure'],
    weaknesses: ['Teamfight', 'Engage', 'Coordinated team']
  },
  {
    name: 'Dive Comp',
    description: 'Backline\'a dive edip carry\'leri öldüren kompozisyon',
    roles: {
      top: [164, 39, 92], // Camille, Irelia, Riven
      jungle: [64, 60, 234], // Lee, Elise, Viego
      mid: [238, 84, 7], // Zed, Akali, LeBlanc
      adc: [145, 236, 18], // Kaisa, Lucian, Trist
      support: [89, 555, 12] // Leona, Pyke, Ali
    },
    playstyle: 'Backline dive, assassin style, burst',
    winCondition: 'Karşı ADC/Mid\'i hızlıca öldürmek',
    strengths: ['Dive', 'Burst', 'Backline access'],
    weaknesses: ['Peel', 'Tank heavy', 'Disengage']
  },
  {
    name: 'Early Game Aggro',
    description: 'Erken oyun baskısı ile snowball yapan kompozisyon',
    roles: {
      top: [58, 80, 122], // Renek, Panth, Darius
      jungle: [64, 60, 76], // Lee, Elise, Nidalee
      mid: [7, 91, 134], // LeBlanc, Talon, Syndra
      adc: [119, 236, 21], // Draven, Lucian, MF
      support: [89, 555, 53] // Leona, Pyke, Blitz
    },
    playstyle: 'Erken gank, tower dive, snowball',
    winCondition: 'Erken oyunda avantaj yaratıp bitirmek',
    strengths: ['Early game', 'Dive', 'Snowball'],
    weaknesses: ['Late game', 'Scale', 'Stall']
  },
];

// ==========================================
// YARDIMCI FONKSİYONLAR
// ==========================================

/**
 * Verilen şampiyonlar için uygun combo'ları bulur
 */
export function findCombosForChampions(championIds: number[]): WomboCombo[] {
  return WOMBO_COMBOS.filter(combo => {
    // Combo'daki tüm şampiyonların seçili olup olmadığını kontrol et
    return combo.champions.every(id => championIds.includes(id));
  });
}

/**
 * Verilen şampiyon için potansiyel combo partnerleri bulur
 */
export function findComboPartnersForChampion(championId: number): WomboCombo[] {
  return WOMBO_COMBOS.filter(combo => combo.champions.includes(championId));
}

/**
 * Combo skoruna göre sıralar
 */
export function getTopCombos(count: number = 10): WomboCombo[] {
  return [...WOMBO_COMBOS]
    .sort((a, b) => b.synergyScore - a.synergyScore)
    .slice(0, count);
}

/**
 * Belirli bir tag'e sahip combo'ları bulur
 */
export function getCombosByTag(tag: string): WomboCombo[] {
  return WOMBO_COMBOS.filter(combo => 
    combo.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Takım kompozisyonu önerir
 */
export function suggestTeamComposition(
  pickedChampions: number[],
  role: string
): TeamComposition[] {
  return TEAM_COMPOSITIONS.filter(comp => {
    const roleChampions = comp.roles[role.toLowerCase() as keyof typeof comp.roles];
    return roleChampions?.some(id => pickedChampions.includes(id));
  });
}

/**
 * Eksik combo parçalarını bulur
 */
export function getMissingComboChampions(
  pickedChampions: number[]
): { combo: WomboCombo; missing: number[] }[] {
  const results: { combo: WomboCombo; missing: number[] }[] = [];
  
  for (const combo of WOMBO_COMBOS) {
    const missing = combo.champions.filter(id => !pickedChampions.includes(id));
    // En az bir şampiyon seçili ve en fazla 2 eksik varsa öner
    if (missing.length > 0 && missing.length <= 2 && missing.length < combo.champions.length) {
      results.push({ combo, missing });
    }
  }
  
  return results.sort((a, b) => 
    (b.combo.synergyScore - a.combo.synergyScore) || (a.missing.length - b.missing.length)
  );
}

/**
 * Toplam combo sayısını döndürür
 */
export function getTotalComboCount(): number {
  return WOMBO_COMBOS.length;
}

/**
 * Toplam kompozisyon sayısını döndürür
 */
export function getTotalCompositionCount(): number {
  return TEAM_COMPOSITIONS.length;
}

