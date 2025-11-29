/**
 * BUILD DATA SERVICE
 * 
 * Riot Data Dragon ve Community Dragon'dan gerçek build verisi çeker.
 * - Runes: Tüm rün setleri ve görselleri
 * - Items: Tüm itemlar ve görselleri  
 * - Spells: Summoner spell'leri
 */

// ==========================================
// API ENDPOINTS
// ==========================================

const DDRAGON_BASE = 'https://ddragon.leagueoflegends.com'
const CDRAGON_BASE = 'https://raw.communitydragon.org/latest'
const DDRAGON_VERSION = '14.23.1'

// ==========================================
// TİP TANIMLARI
// ==========================================

export interface RuneData {
  id: number
  key: string
  name: string
  icon: string
  slots: RuneSlot[]
}

export interface RuneSlot {
  runes: RuneInfo[]
}

export interface RuneInfo {
  id: number
  key: string
  name: string
  icon: string
  shortDesc: string
  longDesc: string
}

export interface ItemData {
  id: number
  name: string
  description: string
  gold: {
    base: number
    total: number
    sell: number
  }
  image: string
  tags: string[]
  stats: Record<string, number>
}

export interface SummonerSpellData {
  id: string
  name: string
  description: string
  image: string
  key: string
}

export interface ChampionBuildData {
  championId: number
  championName: string
  role: string
  patch: string
  runes: {
    primary: number[]
    secondary: number[]
    statShards: number[]
    winRate: number
    pickRate: number
    games: number
  }[]
  items: {
    starting: number[]
    core: number[]
    situational: number[]
    boots: number[]
    winRate: number
    games: number
  }[]
  skillOrder: {
    order: string[]
    maxOrder: string
    winRate: number
  }
  summonerSpells: {
    spell1: string
    spell2: string
    winRate: number
    games: number
  }[]
  matchups: MatchupBuildData[]
}

export interface MatchupBuildData {
  enemyId: number
  enemyName: string
  winRate: number
  games: number
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme'
  tips: string[]
  counterItems: number[]
}

// ==========================================
// BUILD DATA SERVICE
// ==========================================

class BuildDataService {
  private runesData: RuneData[] = []
  private itemsData: Map<number, ItemData> = new Map()
  private spellsData: Map<string, SummonerSpellData> = new Map()
  private buildCache: Map<string, ChampionBuildData> = new Map()
  private isInitialized = false

  /**
   * Servisi başlat - tüm statik verileri yükle
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return

    console.log('[BuildData] Initializing...')
    
    await Promise.all([
      this.loadRunes(),
      this.loadItems(),
      this.loadSummonerSpells()
    ])

    this.isInitialized = true
    console.log('[BuildData] Initialized successfully')
  }

  // ==========================================
  // RUNE VERİLERİ
  // ==========================================

  private async loadRunes(): Promise<void> {
    try {
      const response = await fetch(
        `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/data/en_US/runesReforged.json`
      )
      if (!response.ok) throw new Error('Failed to load runes')
      
      const data = await response.json()
      this.runesData = data.map((tree: any) => ({
        id: tree.id,
        key: tree.key,
        name: tree.name,
        icon: `${DDRAGON_BASE}/cdn/img/${tree.icon}`,
        slots: tree.slots.map((slot: any) => ({
          runes: slot.runes.map((rune: any) => ({
            id: rune.id,
            key: rune.key,
            name: rune.name,
            icon: `${DDRAGON_BASE}/cdn/img/${rune.icon}`,
            shortDesc: rune.shortDesc,
            longDesc: rune.longDesc
          }))
        }))
      }))
      
      console.log(`[BuildData] Loaded ${this.runesData.length} rune trees`)
    } catch (error) {
      console.error('[BuildData] Failed to load runes:', error)
    }
  }

  /**
   * Tüm rune tree'lerini döndür
   */
  getRuneTrees(): RuneData[] {
    return this.runesData
  }

  /**
   * Belirli bir rune'u ID ile bul
   */
  getRuneById(runeId: number): RuneInfo | null {
    for (const tree of this.runesData) {
      for (const slot of tree.slots) {
        const rune = slot.runes.find(r => r.id === runeId)
        if (rune) return rune
      }
    }
    return null
  }

  /**
   * Rune tree'yi ID ile bul
   */
  getRuneTreeById(treeId: number): RuneData | null {
    return this.runesData.find(t => t.id === treeId) || null
  }

  // ==========================================
  // ITEM VERİLERİ
  // ==========================================

  private async loadItems(): Promise<void> {
    try {
      const response = await fetch(
        `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/data/en_US/item.json`
      )
      if (!response.ok) throw new Error('Failed to load items')
      
      const data = await response.json()
      
      Object.entries(data.data).forEach(([id, item]: [string, any]) => {
        this.itemsData.set(parseInt(id), {
          id: parseInt(id),
          name: item.name,
          description: item.description,
          gold: item.gold,
          image: `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/img/item/${item.image.full}`,
          tags: item.tags || [],
          stats: item.stats || {}
        })
      })
      
      console.log(`[BuildData] Loaded ${this.itemsData.size} items`)
    } catch (error) {
      console.error('[BuildData] Failed to load items:', error)
    }
  }

  /**
   * Item'ı ID ile bul
   */
  getItemById(itemId: number): ItemData | null {
    return this.itemsData.get(itemId) || null
  }

  /**
   * Tüm itemları döndür
   */
  getAllItems(): ItemData[] {
    return Array.from(this.itemsData.values())
  }

  /**
   * Tag'e göre itemları filtrele
   */
  getItemsByTag(tag: string): ItemData[] {
    return Array.from(this.itemsData.values()).filter(item => 
      item.tags.includes(tag)
    )
  }

  // ==========================================
  // SUMMONER SPELL VERİLERİ
  // ==========================================

  private async loadSummonerSpells(): Promise<void> {
    try {
      const response = await fetch(
        `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/data/en_US/summoner.json`
      )
      if (!response.ok) throw new Error('Failed to load summoner spells')
      
      const data = await response.json()
      
      Object.entries(data.data).forEach(([key, spell]: [string, any]) => {
        this.spellsData.set(spell.key, {
          id: spell.id,
          name: spell.name,
          description: spell.description,
          image: `${DDRAGON_BASE}/cdn/${DDRAGON_VERSION}/img/spell/${spell.image.full}`,
          key: spell.key
        })
      })
      
      console.log(`[BuildData] Loaded ${this.spellsData.size} summoner spells`)
    } catch (error) {
      console.error('[BuildData] Failed to load summoner spells:', error)
    }
  }

  /**
   * Summoner spell'i key ile bul
   */
  getSpellByKey(key: string): SummonerSpellData | null {
    return this.spellsData.get(key) || null
  }

  /**
   * Summoner spell'i ID ile bul
   */
  getSpellById(id: string): SummonerSpellData | null {
    return Array.from(this.spellsData.values()).find(s => s.id === id) || null
  }

  // ==========================================
  // BUILD VERİLERİ (Simulated + API ready)
  // ==========================================

  /**
   * Şampiyon için build verisi getir
   */
  async getChampionBuild(championId: number, role: string): Promise<ChampionBuildData> {
    const cacheKey = `${championId}-${role}`
    
    if (this.buildCache.has(cacheKey)) {
      return this.buildCache.get(cacheKey)!
    }

    // Servis başlatılmamışsa başlat
    if (!this.isInitialized) {
      await this.initialize()
    }

    // Şimdilik simüle edilmiş veri döndür
    // TODO: Gerçek API entegrasyonu (Mobalytics, u.gg vb.)
    const buildData = this.generateBuildData(championId, role)
    this.buildCache.set(cacheKey, buildData)
    
    return buildData
  }

  /**
   * Build verisi oluştur (simüle)
   * Role bazlı mantıklı build'ler üretir
   */
  private generateBuildData(championId: number, role: string): ChampionBuildData {
    // Role bazlı rune setleri
    const roleRunes: Record<string, number[][]> = {
      'Top': [
        [8005, 9111, 9104, 8014], // Precision - Press the Attack
        [8437, 8446, 8444, 8242], // Resolve - Grasp
        [8010, 9111, 9105, 8299], // Precision - Conqueror
      ],
      'Jungle': [
        [8010, 9111, 9104, 8014], // Precision - Conqueror
        [8112, 8126, 8138, 8135], // Domination - Electrocute
        [8128, 8126, 8138, 8135], // Domination - Dark Harvest
      ],
      'Mid': [
        [8112, 8126, 8138, 8135], // Domination - Electrocute
        [8214, 8226, 8210, 8237], // Sorcery - Summon Aery
        [8229, 8226, 8210, 8237], // Sorcery - Arcane Comet
      ],
      'ADC': [
        [8005, 9111, 9104, 8014], // Precision - Press the Attack
        [9923, 8139, 8138, 8135], // Inspiration - Hail of Blades (from domination)
        [8021, 9111, 9104, 8014], // Precision - Fleet Footwork
      ],
      'Support': [
        [8465, 8446, 8444, 8242], // Resolve - Guardian
        [8214, 8226, 8210, 8237], // Sorcery - Summon Aery
        [8437, 8446, 8444, 8242], // Resolve - Grasp
      ]
    }

    // Role bazlı item setleri
    const roleItems: Record<string, { starting: number[], core: number[], boots: number[], situational: number[] }> = {
      'Top': {
        starting: [1054, 2003], // Doran's Shield, Health Potion
        core: [6631, 3053, 3075], // Stridebreaker, Sterak's, Thornmail
        boots: [3111, 3047], // Mercury's, Plated Steelcaps
        situational: [3065, 3143, 3742, 6333] // Spirit Visage, Randuin's, Dead Man's, Death's Dance
      },
      'Jungle': {
        starting: [1103], // Gustwalker Hatchling
        core: [6692, 3071, 3053], // Eclipse, Black Cleaver, Sterak's
        boots: [3111, 3006], // Mercury's, Berserker's
        situational: [3156, 6333, 3026, 6676] // Maw, Death's Dance, GA, Collector
      },
      'Mid': {
        starting: [1056, 2003], // Doran's Ring, Health Potion
        core: [6653, 3157, 3089], // Liandry's, Zhonya's, Rabadon's
        boots: [3020], // Sorcerer's Shoes
        situational: [3135, 3165, 3102, 4645] // Void Staff, Morello, Banshee's, Shadowflame
      },
      'ADC': {
        starting: [1055, 2003], // Doran's Blade, Health Potion
        core: [3031, 3094, 3085], // Infinity Edge, Rapid Firecannon, Runaan's
        boots: [3006], // Berserker's Greaves
        situational: [3072, 3036, 3139, 6676] // Bloodthirster, LDR, Mercurial, Collector
      },
      'Support': {
        starting: [3850], // Spellthief's Edge
        core: [3853, 3011, 3107], // Shard, Chemtech, Redemption
        boots: [3117, 3158], // Mobility, Ionian
        situational: [3190, 4005, 3504, 3222] // Locket, Imperial, Ardent, Mikael's
      }
    }

    // Role bazlı summoner spell'leri
    const roleSpells: Record<string, string[][]> = {
      'Top': [['Flash', 'Teleport'], ['Flash', 'Ignite']],
      'Jungle': [['Flash', 'Smite'], ['Ghost', 'Smite']],
      'Mid': [['Flash', 'Ignite'], ['Flash', 'Teleport'], ['Flash', 'Barrier']],
      'ADC': [['Flash', 'Heal'], ['Flash', 'Cleanse']],
      'Support': [['Flash', 'Ignite'], ['Flash', 'Exhaust']]
    }

    const runes = roleRunes[role] || roleRunes['Mid']
    const items = roleItems[role] || roleItems['Mid']
    const spells = roleSpells[role] || roleSpells['Mid']

    return {
      championId,
      championName: '', // Will be filled by component
      role,
      patch: DDRAGON_VERSION,
      runes: runes.map((runeSet, i) => ({
        primary: runeSet,
        secondary: [8444, 8242], // Bone Plating, Overgrowth
        statShards: [5008, 5008, 5002], // Adaptive, Adaptive, Armor
        winRate: 52 + Math.random() * 8,
        pickRate: 30 - i * 10 + Math.random() * 5,
        games: Math.floor(1000 + Math.random() * 2000)
      })),
      items: [
        {
          starting: items.starting,
          core: items.core,
          situational: items.situational,
          boots: items.boots,
          winRate: 51 + Math.random() * 6,
          games: Math.floor(800 + Math.random() * 1500)
        }
      ],
      skillOrder: {
        order: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
        maxOrder: 'Q > W > E',
        winRate: 52 + Math.random() * 5
      },
      summonerSpells: spells.map((spellSet, i) => ({
        spell1: spellSet[0],
        spell2: spellSet[1],
        winRate: 51 + Math.random() * 7,
        games: Math.floor(1500 - i * 500 + Math.random() * 500)
      })),
      matchups: this.generateMatchupData(championId, role)
    }
  }

  /**
   * Matchup verisi oluştur
   */
  private generateMatchupData(championId: number, role: string): MatchupBuildData[] {
    // Role bazlı yaygın rakipler
    const roleMatchups: Record<string, { id: number, name: string }[]> = {
      'Top': [
        { id: 122, name: 'Darius' },
        { id: 86, name: 'Garen' },
        { id: 58, name: 'Renekton' },
        { id: 24, name: 'Jax' },
        { id: 92, name: 'Riven' }
      ],
      'Jungle': [
        { id: 64, name: 'Lee Sin' },
        { id: 121, name: 'Kha\'Zix' },
        { id: 254, name: 'Vi' },
        { id: 141, name: 'Kayn' },
        { id: 104, name: 'Graves' }
      ],
      'Mid': [
        { id: 238, name: 'Zed' },
        { id: 103, name: 'Ahri' },
        { id: 134, name: 'Syndra' },
        { id: 7, name: 'LeBlanc' },
        { id: 112, name: 'Viktor' }
      ],
      'ADC': [
        { id: 51, name: 'Caitlyn' },
        { id: 222, name: 'Jinx' },
        { id: 145, name: 'Kai\'Sa' },
        { id: 81, name: 'Ezreal' },
        { id: 67, name: 'Vayne' }
      ],
      'Support': [
        { id: 412, name: 'Thresh' },
        { id: 111, name: 'Nautilus' },
        { id: 89, name: 'Leona' },
        { id: 117, name: 'Lulu' },
        { id: 267, name: 'Nami' }
      ]
    }

    const matchups = roleMatchups[role] || roleMatchups['Mid']
    const difficulties: ('Easy' | 'Medium' | 'Hard' | 'Extreme')[] = ['Easy', 'Medium', 'Hard', 'Extreme']

    return matchups.map(enemy => {
      const winRate = 44 + Math.random() * 14 // 44-58%
      let difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme'
      
      if (winRate >= 54) difficulty = 'Easy'
      else if (winRate >= 50) difficulty = 'Medium'
      else if (winRate >= 46) difficulty = 'Hard'
      else difficulty = 'Extreme'

      return {
        enemyId: enemy.id,
        enemyName: enemy.name,
        winRate: Math.round(winRate * 10) / 10,
        games: Math.floor(500 + Math.random() * 3000),
        difficulty,
        tips: [
          `Watch out for ${enemy.name}'s power spikes`,
          'Trade when abilities are on cooldown',
          'Consider defensive items if behind'
        ],
        counterItems: this.getCounterItems(enemy.id)
      }
    })
  }

  /**
   * Düşmana karşı counter itemları getir
   */
  private getCounterItems(enemyId: number): number[] {
    // AD vs AP bazlı counter itemlar
    const adCounters = [3047, 3075, 3143] // Plated, Thornmail, Randuin's
    const apCounters = [3111, 3065, 3102] // Mercury's, Spirit Visage, Banshee's
    
    // Basit logic - gerçek API'de şampiyon damage tipi kontrol edilir
    return Math.random() > 0.5 ? adCounters : apCounters
  }

  /**
   * Cache'i temizle
   */
  clearCache(): void {
    this.buildCache.clear()
  }
}

// Singleton instance
export const buildDataService = new BuildDataService()


