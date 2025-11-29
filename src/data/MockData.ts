import { PickedChampion, Role, DraftPhase } from '../types'

/**
 * DEMO MODU VERİLERİ
 * 
 * LoL istemcisi olmadan test için kullanılır.
 */

// Örnek takım - senin takımın
export const MOCK_MY_TEAM: PickedChampion[] = [
  {
    cellId: 0,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'Top',
    isLocalPlayer: false
  },
  {
    cellId: 1,
    championId: 254, // Vi
    assignedPosition: 'Jungle',
    isLocalPlayer: false
  },
  {
    cellId: 2,
    championId: 0, // Henüz seçilmedi - BU SEN
    assignedPosition: 'Mid',
    isLocalPlayer: true
  },
  {
    cellId: 3,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'ADC',
    isLocalPlayer: false
  },
  {
    cellId: 4,
    championId: 412, // Thresh
    assignedPosition: 'Support',
    isLocalPlayer: false
  }
]

// Örnek rakip takım
export const MOCK_THEIR_TEAM: PickedChampion[] = [
  {
    cellId: 0,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'Top',
    isLocalPlayer: false
  },
  {
    cellId: 1,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'Jungle',
    isLocalPlayer: false
  },
  {
    cellId: 2,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'Mid',
    isLocalPlayer: false
  },
  {
    cellId: 3,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'ADC',
    isLocalPlayer: false
  },
  {
    cellId: 4,
    championId: 0, // Henüz seçilmedi
    assignedPosition: 'Support',
    isLocalPlayer: false
  }
]

export const MOCK_USER_ROLE: Role = 'Mid'
export const MOCK_PHASE: DraftPhase = 'picking'
export const MOCK_BANS = {
  myTeamBans: [],
  theirTeamBans: []
}


