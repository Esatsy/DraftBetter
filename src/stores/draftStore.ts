import { create } from 'zustand'
import {
  DraftState,
  DraftActions,
  ConnectionStatus,
  ChampSelectData,
  Recommendation,
  PickedChampion,
  PickIntent,
  Role
} from '../types'
import { RecommendationEngine } from '../engine/RecommendationEngine'
import { SmartBanEngine } from '../engine/SmartBanEngine'
import { MOCK_MY_TEAM, MOCK_THEIR_TEAM, MOCK_USER_ROLE, MOCK_PHASE, MOCK_BANS } from '../data/MockData'
import { getChampionById } from '../data/ChampionKnowledgeBase'

const initialState: DraftState & { banRecommendations: Recommendation[] } = {
  connectionStatus: 'disconnected',
  phase: 'none',
  myTeam: [],
  theirTeam: [],
  myTeamBans: [],
  theirTeamBans: [],
  userRole: null,
  localPlayerCellId: null,
  userPickIntent: null,
  teamPickIntents: [],
  recommendations: [],
  banRecommendations: [],
  isDemoMode: false,
  isPracticeMode: false
}

export const useDraftStore = create<DraftState & DraftActions & { 
  isDemoMode: boolean
  isPracticeMode: boolean
  enableDemoMode: () => void
  disableDemoMode: () => void
  setUserRole: (role: Role) => void
}>((set, get) => ({
  ...initialState,

  setConnectionStatus: (status: ConnectionStatus) => {
    set({ connectionStatus: status })
  },

  // Manuel rol seçimi (antrenman modu için)
  setUserRole: (role: Role) => {
    const state = get()
    set({ userRole: role })
    
    // Önerileri yeniden hesapla
    if (state.phase !== 'none') {
      const engine = new RecommendationEngine()
      const recommendations = engine.calculateRecommendations({
        myTeam: state.myTeam,
        theirTeam: state.theirTeam,
        userRole: role,
        bannedChampions: [...state.myTeamBans, ...state.theirTeamBans],
        phase: state.phase
      })
      set({ recommendations })
    }
  },

  enableDemoMode: () => {
    const engine = new RecommendationEngine()
    const recommendations = engine.calculateRecommendations({
      myTeam: MOCK_MY_TEAM,
      theirTeam: MOCK_THEIR_TEAM,
      userRole: MOCK_USER_ROLE,
      bannedChampions: [...MOCK_BANS.myTeamBans, ...MOCK_BANS.theirTeamBans],
      phase: MOCK_PHASE
    })

    set({
      isDemoMode: true,
      isPracticeMode: false,
      connectionStatus: 'connected',
      phase: MOCK_PHASE,
      myTeam: MOCK_MY_TEAM,
      theirTeam: MOCK_THEIR_TEAM,
      myTeamBans: MOCK_BANS.myTeamBans,
      theirTeamBans: MOCK_BANS.theirTeamBans,
      userRole: MOCK_USER_ROLE,
      localPlayerCellId: 2,
      recommendations
    })
  },

  disableDemoMode: () => {
    set({
      ...initialState,
      isDemoMode: false,
      isPracticeMode: false
    })
  },

  setChampSelectData: (data: ChampSelectData) => {
    const isPracticeMode = data.isPracticeMode ?? false
    const state = get()
    
    // Mark local player in myTeam
    const myTeamWithLocalPlayer = data.myTeam.map(member => ({
      ...member,
      isLocalPlayer: member.cellId === data.localPlayerCellId
    }))

    // Pick Intent'leri işle - şampiyon isimlerini ekle
    let userPickIntent: PickIntent | null = null
    if (data.userPickIntent && data.userPickIntent.championId > 0) {
      const champ = getChampionById(data.userPickIntent.championId)
      userPickIntent = {
        ...data.userPickIntent,
        championName: champ?.name || 'Unknown'
      }
      console.log(`[Store] User pick intent: ${userPickIntent.championName} (${userPickIntent.source})`)
    }

    const teamPickIntents: PickIntent[] = (data.teamPickIntents || [])
      .filter(p => p.championId > 0)
      .map(p => {
        const champ = getChampionById(p.championId)
        return {
          ...p,
          championName: champ?.name || 'Unknown'
        }
      })

    // Mark enemy team members (never local player)
    const theirTeamProcessed = data.theirTeam.map(member => ({
      ...member,
      isLocalPlayer: false
    }))

    // Antrenman modunda mevcut rolü koru (kullanıcı seçtiyse)
    const userRole = isPracticeMode && state.userRole ? state.userRole : data.userRole

    set({
      phase: data.phase,
      myTeam: myTeamWithLocalPlayer,
      theirTeam: theirTeamProcessed,
      myTeamBans: data.bans.myTeamBans,
      theirTeamBans: data.bans.theirTeamBans,
      userRole,
      localPlayerCellId: data.localPlayerCellId ?? null,
      userPickIntent,
      teamPickIntents,
      isPracticeMode
    })

    // Calculate recommendations after state update
    if (data.phase === 'finalization') {
      // Finalization'da öneri hesaplama - sadece buildler gösterilecek
      console.log('[Store] Finalization phase - showing builds')
      set({ recommendations: [], banRecommendations: [] })
    } else if (isPracticeMode || (data.phase !== 'banning')) {
      // Antrenman modunda veya pick aşamasında şampiyon önerileri hesapla
      const engine = new RecommendationEngine()
      const recommendations = engine.calculateRecommendations({
        myTeam: myTeamWithLocalPlayer,
        theirTeam: theirTeamProcessed,
        userRole,
        bannedChampions: [...data.bans.myTeamBans, ...data.bans.theirTeamBans],
        phase: data.phase
      })
      set({ recommendations, banRecommendations: [] })
      
      if (isPracticeMode) {
        console.log('[Store] Practice mode - showing pick recommendations only')
      }
    } else if (data.phase === 'banning') {
      // Ban aşamasında AKILLI ban önerileri hesapla
      const smartBanEngine = new SmartBanEngine()
      const banRecommendations = smartBanEngine.calculateSmartBans({
        userRole,
        userPickIntent,
        teamPickIntents,
        allyPicks: myTeamWithLocalPlayer.filter(m => m.championId > 0).map(m => m.championId),
        alreadyBanned: [...data.bans.myTeamBans, ...data.bans.theirTeamBans]
      })
      
      if (userPickIntent) {
        console.log(`[Store] Smart bans for ${userPickIntent.championName}:`, 
          banRecommendations.slice(0, 3).map(r => getChampionById(r.championId)?.name))
      } else {
        console.log('[Store] Meta bans (no pick intent):', 
          banRecommendations.slice(0, 3).map(r => getChampionById(r.championId)?.name))
      }
      
      set({ banRecommendations, recommendations: [] })
    }
  },

  resetChampSelect: () => {
    set({
      phase: 'none',
      myTeam: [],
      theirTeam: [],
      myTeamBans: [],
      theirTeamBans: [],
      userRole: null,
      localPlayerCellId: null,
      recommendations: [],
      banRecommendations: []
    })
  },

  updateRecommendations: (recommendations: Recommendation[]) => {
    set({ recommendations })
  }
}))

