/**
 * Şampiyon Veri Üretici Script
 * Data Dragon'dan alınan ham veriyi işleyip ChampionKnowledgeBase formatına çevirir.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ham veriyi oku
const rawData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/champions_raw.json'), 'utf-8')
);

// Riot tag'lerini bizim arketiplere çevir
function mapTagsToArchetypes(tags) {
  const mapping = {
    'Fighter': ['Bruiser', 'Diver'],
    'Tank': ['Tank', 'Frontline'],
    'Mage': ['Mage'],
    'Assassin': ['Assassin'],
    'Marksman': ['Marksman', 'HyperCarry'],
    'Support': ['Enchanter', 'Peel']
  };
  
  const archetypes = new Set();
  tags.forEach(tag => {
    if (mapping[tag]) {
      mapping[tag].forEach(arch => archetypes.add(arch));
    }
  });
  
  return Array.from(archetypes);
}

// Şampiyon tag'lerine göre rol tahmin et
function inferRoles(tags, name) {
  const roles = [];
  
  // Özel durumlar
  const roleOverrides = {
    // ADC'ler
    'Jinx': ['ADC'], 'Caitlyn': ['ADC'], 'Vayne': ['ADC'], 'Ashe': ['ADC'],
    'MissFortune': ['ADC'], 'Ezreal': ['ADC'], 'Kaisa': ['ADC'], 'Jhin': ['ADC'],
    'Lucian': ['ADC'], 'Draven': ['ADC'], 'Aphelios': ['ADC'], 'Samira': ['ADC'],
    'Tristana': ['ADC'], 'Xayah': ['ADC'], 'Sivir': ['ADC'], 'Twitch': ['ADC'],
    'Kogmaw': ['ADC'], 'Varus': ['ADC'], 'Kalista': ['ADC'], 'Zeri': ['ADC'],
    
    // Support'lar
    'Thresh': ['Support'], 'Lulu': ['Support'], 'Nami': ['Support'], 'Janna': ['Support'],
    'Leona': ['Support'], 'Nautilus': ['Support'], 'Blitzcrank': ['Support'],
    'Morgana': ['Support', 'Mid'], 'Yuumi': ['Support'], 'Soraka': ['Support'],
    'Braum': ['Support'], 'Alistar': ['Support'], 'Rakan': ['Support'], 'Pyke': ['Support'],
    'Senna': ['Support', 'ADC'], 'Rell': ['Support'], 'Renata': ['Support'],
    'Taric': ['Support'], 'Karma': ['Support', 'Mid'], 'Zilean': ['Support', 'Mid'],
    'Bard': ['Support'], 'Sona': ['Support'], 'Seraphine': ['Support', 'Mid'],
    'Milio': ['Support'],
    
    // Ormancilar
    'LeeSin': ['Jungle'], 'Elise': ['Jungle'], 'Nidalee': ['Jungle'], 'KhaZix': ['Jungle'],
    'Rengar': ['Jungle'], 'Evelynn': ['Jungle'], 'Shaco': ['Jungle'], 'Kayn': ['Jungle'],
    'Graves': ['Jungle'], 'Kindred': ['Jungle'], 'Lillia': ['Jungle'], 'Fiddlesticks': ['Jungle'],
    'Ivern': ['Jungle'], 'Nunu': ['Jungle'], 'Rammus': ['Jungle'], 'Sejuani': ['Jungle'],
    'Zac': ['Jungle'], 'Hecarim': ['Jungle'], 'Skarner': ['Jungle'], 'Udyr': ['Jungle'],
    'Viego': ['Jungle'], 'Belveth': ['Jungle'], 'Briar': ['Jungle'],
    'Vi': ['Jungle'], 'JarvanIV': ['Jungle'], 'XinZhao': ['Jungle'], 'RekSai': ['Jungle'],
    'Warwick': ['Jungle'], 'Volibear': ['Jungle', 'Top'], 'Amumu': ['Jungle'],
    'Ekko': ['Jungle', 'Mid'], 'Diana': ['Jungle', 'Mid'], 'Nocturne': ['Jungle'],
    'Taliyah': ['Jungle', 'Mid'], 'Karthus': ['Jungle', 'Mid'], 'Gragas': ['Jungle', 'Top'],
    'Poppy': ['Jungle', 'Top'], 'Wukong': ['Jungle', 'Top'],
    
    // Mid'ler
    'Ahri': ['Mid'], 'Syndra': ['Mid'], 'Orianna': ['Mid'], 'Viktor': ['Mid'],
    'Lux': ['Mid', 'Support'], 'Zed': ['Mid'], 'Talon': ['Mid'], 'Katarina': ['Mid'],
    'Yasuo': ['Mid', 'Top'], 'Yone': ['Mid', 'Top'], 'Akali': ['Mid', 'Top'],
    'LeBlanc': ['Mid'], 'Fizz': ['Mid'], 'Kassadin': ['Mid'], 'Malzahar': ['Mid'],
    'Anivia': ['Mid'], 'Xerath': ['Mid'], 'Velkoz': ['Mid'], 'Azir': ['Mid'],
    'Vex': ['Mid'], 'Zoe': ['Mid'], 'Sylas': ['Mid'], 'Qiyana': ['Mid'],
    'Akshan': ['Mid'], 'TwistedFate': ['Mid'], 'Ryze': ['Mid'], 'Cassiopeia': ['Mid'],
    'Galio': ['Mid', 'Support'], 'Corki': ['Mid'], 'Naafiri': ['Mid'],
    'AurelionSol': ['Mid'], 'Annie': ['Mid'], 'Brand': ['Mid', 'Support'],
    'Veigar': ['Mid'], 'Vladimir': ['Mid', 'Top'], 'Swain': ['Mid', 'Support'],
    'Neeko': ['Mid'], 'Ziggs': ['Mid'], 'Heimerdinger': ['Mid', 'Top'],
    'Hwei': ['Mid', 'Support'],
    
    // Top'lar
    'Darius': ['Top'], 'Garen': ['Top'], 'Sett': ['Top'], 'Mordekaiser': ['Top'],
    'Aatrox': ['Top'], 'Riven': ['Top'], 'Fiora': ['Top'], 'Camille': ['Top'],
    'Irelia': ['Top', 'Mid'], 'Jax': ['Top'], 'Tryndamere': ['Top'],
    'Nasus': ['Top'], 'Renekton': ['Top'], 'Illaoi': ['Top'], 'Yorick': ['Top'],
    'Sion': ['Top'], 'Ornn': ['Top'], 'Malphite': ['Top', 'Support'],
    'Maokai': ['Top', 'Support'], 'Chogath': ['Top'], 'DrMundo': ['Top'],
    'Singed': ['Top'], 'Teemo': ['Top'], 'Gnar': ['Top'], 'Kennen': ['Top'],
    'Jayce': ['Top', 'Mid'], 'Gangplank': ['Top'], 'Kled': ['Top'],
    'Urgot': ['Top'], 'Quinn': ['Top'], 'Vayne': ['Top', 'ADC'],
    'KSante': ['Top'], 'Gwen': ['Top'], 'Kayle': ['Top'],
    'Pantheon': ['Top', 'Mid', 'Support'], 'Rumble': ['Top'],
    'Shen': ['Top'], 'TahmKench': ['Top', 'Support'],
    'Trundle': ['Top', 'Jungle'], 'Olaf': ['Top', 'Jungle'],
    'Ksante': ['Top']
  };
  
  // Şampiyon ismi key olarak normalize et (boşluk ve özel karakter kaldır)
  const normalizedName = name.replace(/[^a-zA-Z]/g, '');
  
  if (roleOverrides[normalizedName]) {
    return roleOverrides[normalizedName];
  }
  
  // Tag bazlı tahmin
  if (tags.includes('Marksman')) roles.push('ADC');
  if (tags.includes('Support')) roles.push('Support');
  if (tags.includes('Assassin') && !roles.length) roles.push('Mid', 'Jungle');
  if (tags.includes('Mage') && !roles.length) roles.push('Mid');
  if (tags.includes('Fighter') && !roles.length) roles.push('Top');
  if (tags.includes('Tank') && !roles.length) roles.push('Top', 'Jungle');
  
  return roles.length > 0 ? roles : ['Top'];
}

// Hasar tipini belirle
function inferDamageType(tags, stats) {
  if (tags.includes('Mage')) return 'Magic';
  if (tags.includes('Marksman')) return 'Physical';
  if (tags.includes('Assassin')) {
    // AP assassin'ler
    return 'Physical'; // Çoğu assassin AD
  }
  if (tags.includes('Fighter')) return 'Physical';
  if (tags.includes('Tank')) return 'Mixed';
  if (tags.includes('Support')) return 'Magic';
  return 'Mixed';
}

// Power spike tahmin et
function inferPowerSpikes(tags, stats) {
  const spikes = [];
  
  if (tags.includes('Assassin')) {
    spikes.push('MidGame', '1v1Beast');
  }
  if (tags.includes('Marksman')) {
    spikes.push('LateGame');
  }
  if (tags.includes('Tank')) {
    spikes.push('MidGame', 'TeamfightGod');
  }
  if (tags.includes('Mage')) {
    spikes.push('MidGame');
  }
  if (tags.includes('Fighter')) {
    spikes.push('MidGame', '1v1Beast');
  }
  if (tags.includes('Support')) {
    spikes.push('EarlyGame', 'TeamfightGod');
  }
  
  return spikes.length > 0 ? spikes : ['MidGame'];
}

// Popüler şampiyonlar için sinerji ve counter verileri
const SYNERGY_DATA = {
  // Jungle sinerjileri
  254: [ // Vi
    { championId: 103, championName: 'Ahri', reason: 'Vi ulti + Ahri charm = garantili öldürme', synergyScore: 85 },
    { championId: 157, championName: 'Yasuo', reason: 'Vi Q havaya kaldırır, Yasuo ulti bağlar', synergyScore: 90 },
    { championId: 412, championName: 'Thresh', reason: 'Lantern ile güvenli dalış', synergyScore: 75 }
  ],
  64: [ // Lee Sin
    { championId: 157, championName: 'Yasuo', reason: 'Lee R havaya kaldırır', synergyScore: 95 },
    { championId: 92, championName: 'Riven', reason: 'Erken oyun baskı ikilisi', synergyScore: 70 }
  ],
  
  // Mid sinerjileri
  103: [ // Ahri
    { championId: 254, championName: 'Vi', reason: 'Vi sabitleme + Ahri combo', synergyScore: 85 },
    { championId: 54, championName: 'Malphite', reason: 'Malphite R sonrası tüm skillshot garanti', synergyScore: 80 }
  ],
  157: [ // Yasuo
    { championId: 54, championName: 'Malphite', reason: 'En ikonik combo - 5 kişi havaya', synergyScore: 100 },
    { championId: 89, championName: 'Leona', reason: 'Leona E havaya kaldırır', synergyScore: 85 },
    { championId: 111, championName: 'Nautilus', reason: 'Naut R havaya kaldırır', synergyScore: 85 },
    { championId: 154, championName: 'Zac', reason: 'Zac E havaya kaldırır', synergyScore: 90 },
    { championId: 421, championName: 'RekSai', reason: 'RekSai W havaya kaldırır', synergyScore: 80 }
  ],
  
  // Top sinerjileri
  54: [ // Malphite
    { championId: 157, championName: 'Yasuo', reason: 'Wombo combo potansiyeli', synergyScore: 100 },
    { championId: 222, championName: 'Jinx', reason: 'Engage + hypercarry', synergyScore: 75 },
    { championId: 145, championName: 'Kaisa', reason: 'Malphite R + Kaisa R followup', synergyScore: 80 }
  ],
  
  // Support sinerjileri
  412: [ // Thresh
    { championId: 119, championName: 'Draven', reason: 'Lantern + agresif oyun stili', synergyScore: 90 },
    { championId: 236, championName: 'Lucian', reason: 'Erken oyun dominasyonu', synergyScore: 85 }
  ],
  89: [ // Leona
    { championId: 21, championName: 'MissFortune', reason: 'Leona CC + MF ulti', synergyScore: 90 },
    { championId: 202, championName: 'Jhin', reason: 'CC zinciri', synergyScore: 85 }
  ]
};

const COUNTER_DATA = {
  54: [ // Malphite counters
    { championId: 122, championName: 'Darius', reason: 'Full AD = Malphite zırhı etkili', counterScore: 80 },
    { championId: 92, championName: 'Riven', reason: 'Full AD + Malphite AS slow', counterScore: 85 },
    { championId: 23, championName: 'Tryndamere', reason: 'AD + AS slow = Trynd işlevsiz', counterScore: 90 },
    { championId: 157, championName: 'Yasuo', reason: 'AD + Malphite zırhı', counterScore: 75 }
  ],
  157: [ // Yasuo counters (Yasuo bunlara karşı zayıf)
    { championId: 54, championName: 'Malphite', reason: 'Zırh + poke', counterScore: 70 },
    { championId: 80, championName: 'Pantheon', reason: 'Erken oyun baskısı', counterScore: 75 }
  ],
  103: [ // Ahri counters
    { championId: 238, championName: 'Zed', reason: 'Ahri R ile Zed ultisinden kaçabilir', counterScore: 65 }
  ]
};

// Ana işlem
const champions = Object.values(rawData.data).map(champ => {
  const id = parseInt(champ.key);
  const name = champ.id; // API'deki isim (boşluksuz)
  const displayName = champ.name; // Gösterim ismi
  const tags = champ.tags || [];
  
  return {
    id,
    name,
    displayName,
    role: inferRoles(tags, name),
    archetype: mapTagsToArchetypes(tags),
    damageType: inferDamageType(tags, champ.stats),
    synergies: SYNERGY_DATA[id] || [],
    counters: COUNTER_DATA[id] || [],
    powerSpikes: inferPowerSpikes(tags, champ.stats),
    proData: {
      pickRate: Math.random() * 15 + 2, // Placeholder
      winRate: Math.random() * 6 + 48, // 48-54 arası
      banRate: Math.random() * 10,
      popularity: Math.floor(Math.random() * 10) + 1
    }
  };
});

// TypeScript dosyası oluştur
const output = `import { Champion } from '../types'

/**
 * ŞAMPİYON BİLGİ BANKASI
 * 
 * Data Dragon'dan otomatik oluşturuldu.
 * Toplam ` + champions.length + ` şampiyon.
 * 
 * NOT: Sinerji ve counter verileri popüler şampiyonlar için manuel eklendi.
 * Diğerleri için temel arketip bazlı öneri yapılır.
 */

export const CHAMPION_KNOWLEDGE_BASE: Champion[] = ${JSON.stringify(champions, null, 2)};

// ID -> Champion map (hızlı erişim için)
export const CHAMPION_MAP = new Map<number, Champion>(
  CHAMPION_KNOWLEDGE_BASE.map(c => [c.id, c])
);

/**
 * Şampiyon ID'sine göre şampiyon bilgisi getirir
 */
export function getChampionById(id: number): Champion | undefined {
  return CHAMPION_MAP.get(id);
}

/**
 * Şampiyon adına göre şampiyon bilgisi getirir
 */
export function getChampionByName(name: string): Champion | undefined {
  return CHAMPION_KNOWLEDGE_BASE.find(
    c => c.name.toLowerCase() === name.toLowerCase() ||
         c.displayName.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Belirli bir role ait şampiyonları getirir
 */
export function getChampionsByRole(role: string): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => c.role.includes(role as any));
}

/**
 * Belirli bir arketipe sahip şampiyonları getirir
 */
export function getChampionsByArchetype(archetype: string): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => c.archetype.includes(archetype as any));
}

/**
 * Engage şampiyonlarını getirir
 */
export function getEngageChampions(): Champion[] {
  return CHAMPION_KNOWLEDGE_BASE.filter(c => 
    c.archetype.includes('Engage') || 
    c.archetype.includes('Tank') ||
    c.archetype.includes('Diver')
  );
}

/**
 * Tüm benzersiz arketipleri listeler
 */
export function getAllArchetypes(): string[] {
  const archetypes = new Set<string>();
  CHAMPION_KNOWLEDGE_BASE.forEach(c => {
    c.archetype.forEach(a => archetypes.add(a));
  });
  return Array.from(archetypes);
}
`;

// Dosyaya yaz
fs.writeFileSync(
  path.join(__dirname, '../src/data/ChampionKnowledgeBase.ts'),
  output,
  'utf-8'
);

console.log('✅ ' + champions.length + ' şampiyon başarıyla işlendi!');
console.log('📁 Dosya: src/data/ChampionKnowledgeBase.ts');

