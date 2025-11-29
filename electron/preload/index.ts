import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  // Window controls
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close')
  },

  // LCU connection
  lcu: {
    getStatus: () => ipcRenderer.invoke('lcu:getStatus'),
    reconnect: () => ipcRenderer.invoke('lcu:reconnect'),
    onConnectionChange: (callback: (status: string) => void) => {
      const handler = (_event: Electron.IpcRendererEvent, status: string) => callback(status)
      ipcRenderer.on('lcu:connectionChange', handler)
      return () => ipcRenderer.removeListener('lcu:connectionChange', handler)
    },
    onChampSelectUpdate: (callback: (data: unknown) => void) => {
      const handler = (_event: Electron.IpcRendererEvent, data: unknown) => callback(data)
      ipcRenderer.on('lcu:champSelectUpdate', handler)
      return () => ipcRenderer.removeListener('lcu:champSelectUpdate', handler)
    },
    onChampSelectEnd: (callback: () => void) => {
      const handler = () => callback()
      ipcRenderer.on('lcu:champSelectEnd', handler)
      return () => ipcRenderer.removeListener('lcu:champSelectEnd', handler)
    },
    // Gameflow events
    onGameflowChange: (callback: (phase: string) => void) => {
      const handler = (_event: Electron.IpcRendererEvent, phase: string) => callback(phase)
      ipcRenderer.on('lcu:gameflowChange', handler)
      return () => ipcRenderer.removeListener('lcu:gameflowChange', handler)
    },
    getGameflowPhase: () => ipcRenderer.invoke('lcu:getGameflowPhase'),
    getActiveGame: () => ipcRenderer.invoke('lcu:getActiveGame'),
    // Şampiyon seçimi aksiyonları
    hoverChampion: (championId: number) => ipcRenderer.invoke('lcu:hoverChampion', championId),
    lockInChampion: (championId: number) => ipcRenderer.invoke('lcu:lockInChampion', championId),
    banChampion: (championId: number) => ipcRenderer.invoke('lcu:banChampion', championId),
    // Summoner Data
    getCurrentSummoner: () => ipcRenderer.invoke('lcu:getCurrentSummoner'),
    getRankedStats: () => ipcRenderer.invoke('lcu:getRankedStats'),
    getChampionMasteries: (count: number = 20) => ipcRenderer.invoke('lcu:getChampionMasteries', count),
    getMatchHistory: (count: number = 20) => ipcRenderer.invoke('lcu:getMatchHistory', count),
    getChampionStats: (championId: number) => ipcRenderer.invoke('lcu:getChampionStats', championId),
    // Rün Sayfası Yönetimi
    getRunePages: () => ipcRenderer.invoke('lcu:getRunePages'),
    setRunePage: (runePage: { name?: string, primaryStyleId: number, subStyleId: number, selectedPerkIds: number[] }) => 
      ipcRenderer.invoke('lcu:setRunePage', runePage),
    deleteRunePage: (pageId: number) => ipcRenderer.invoke('lcu:deleteRunePage', pageId),
    // Sihirdar Büyüleri
    setSummonerSpells: (spell1Id: number, spell2Id: number) => 
      ipcRenderer.invoke('lcu:setSummonerSpells', spell1Id, spell2Id)
  },

  // Live Game Data API
  liveGame: {
    getData: () => ipcRenderer.invoke('liveGame:getData')
  },

  // Overlay controls
  overlay: {
    show: () => ipcRenderer.invoke('overlay:show'),
    hide: () => ipcRenderer.invoke('overlay:hide'),
    toggle: () => ipcRenderer.invoke('overlay:toggle'),
    setPosition: (x: number, y: number) => ipcRenderer.invoke('overlay:setPosition', x, y),
    setSize: (width: number, height: number) => ipcRenderer.invoke('overlay:setSize', width, height)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}


