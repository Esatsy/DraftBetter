import { app, shell, BrowserWindow, ipcMain, session, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { LCUService } from './services/LCUService'

let mainWindow: BrowserWindow | null = null
let overlayWindow: BrowserWindow | null = null
let lcuService: LCUService | null = null

function createWindow(): void {
  // CSP'yi tamamen kaldır - dış API'lere erişim için
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = { ...details.responseHeaders }
    // CSP header'larını kaldır
    delete responseHeaders['content-security-policy']
    delete responseHeaders['Content-Security-Policy']
    delete responseHeaders['x-content-security-policy']
    delete responseHeaders['X-Content-Security-Policy']
    callback({ responseHeaders })
  })

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    show: false,
    backgroundColor: '#0a0a0f',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false // Dış kaynaklara erişim için gerekli
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    // DevTools aç (geliştirme modunda)
    if (is.dev) {
      mainWindow?.webContents.openDevTools()
    }
  })

  // Ana pencere kapandığında uygulamanın tamamen kapanmasını sağla
  mainWindow.on('closed', () => {
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.close()
    }
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer based on electron-vite cli
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log('[Main] Loading URL:', process.env['ELECTRON_RENDERER_URL'])
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    const filePath = join(__dirname, '../renderer/index.html')
    console.log('[Main] Loading file:', filePath)
    mainWindow.loadFile(filePath)
  }

  // Initialize LCU Service
  lcuService = new LCUService(mainWindow, {
    onGameStart: () => showOverlay(),
    onGameEnd: () => hideOverlay()
  })
  lcuService.startWatching()
}

// ==========================================
// OYUN İÇİ OVERLAY PENCERESİ
// ==========================================

function createOverlayWindow(): void {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    return
  }

  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  overlayWindow = new BrowserWindow({
    width: 240,
    height: 380,
    x: width - 250,
    y: 10,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    skipTaskbar: true,
    focusable: true, // Klavye kısayolları için
    hasShadow: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  })

  // Oyunun üzerinde görünmesi için
  overlayWindow.setAlwaysOnTop(true, 'screen-saver')
  overlayWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
  
  // Tıklama geçirgenliği - panelin kendisi tıklanabilir ama boş alanlar değil
  overlayWindow.setIgnoreMouseEvents(false)

  // Overlay URL'i yükle
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    overlayWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/overlay`)
  } else {
    overlayWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: '/overlay' })
  }

  overlayWindow.on('closed', () => {
    overlayWindow = null
  })
}

function showOverlay(): void {
  console.log('[Overlay] Showing game overlay')
  if (!overlayWindow || overlayWindow.isDestroyed()) {
    createOverlayWindow()
  }
  overlayWindow?.show()
}

function hideOverlay(): void {
  console.log('[Overlay] Hiding game overlay')
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.hide()
  }
}

// Window control handlers
ipcMain.handle('window:minimize', () => {
  mainWindow?.minimize()
})

ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
})

ipcMain.handle('window:close', () => {
  mainWindow?.close()
  // Ana pencere kapandığında overlay'i de kapat
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.close()
  }
})

// LCU handlers
ipcMain.handle('lcu:getStatus', () => {
  return lcuService?.getConnectionStatus() ?? 'disconnected'
})

ipcMain.handle('lcu:reconnect', () => {
  lcuService?.reconnect()
})

// Overlay handlers
ipcMain.handle('overlay:show', () => {
  showOverlay()
})

ipcMain.handle('overlay:hide', () => {
  hideOverlay()
})

ipcMain.handle('overlay:toggle', () => {
  if (overlayWindow && !overlayWindow.isDestroyed() && overlayWindow.isVisible()) {
    hideOverlay()
  } else {
    showOverlay()
  }
})

ipcMain.handle('overlay:setPosition', (_event, x: number, y: number) => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.setPosition(x, y)
  }
})

ipcMain.handle('overlay:setSize', (_event, width: number, height: number) => {
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.setSize(width, height)
  }
})

// Şampiyon seçimi/banlama handlers
ipcMain.handle('lcu:hoverChampion', async (_event, championId: number) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.hoverChampion(championId)
  return { success }
})

ipcMain.handle('lcu:lockInChampion', async (_event, championId: number) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.lockInChampion(championId)
  return { success }
})

ipcMain.handle('lcu:banChampion', async (_event, championId: number) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.banChampion(championId)
  return { success }
})

ipcMain.handle('lcu:getActiveGame', async () => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getActiveGame()
})

ipcMain.handle('lcu:getGameflowPhase', () => {
  return lcuService?.getCurrentGameflowPhase() ?? 'None'
})

// ==========================================
// SUMMONER DATA HANDLERS
// ==========================================

ipcMain.handle('lcu:getCurrentSummoner', async () => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getCurrentSummoner()
})

ipcMain.handle('lcu:getRankedStats', async () => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getRankedStats()
})

ipcMain.handle('lcu:getChampionMasteries', async (_event, count: number = 20) => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getChampionMasteries(count)
})

ipcMain.handle('lcu:getMatchHistory', async (_event, count: number = 20) => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getMatchHistory(count)
})

ipcMain.handle('lcu:getChampionStats', async (_event, championId: number) => {
  if (!lcuService?.isConnected()) {
    return null
  }
  return await lcuService.getChampionStats(championId, 50)
})

// ==========================================
// RUNE PAGE HANDLERS
// ==========================================

ipcMain.handle('lcu:getRunePages', async () => {
  if (!lcuService?.isConnected()) {
    return []
  }
  return await lcuService.getRunePages()
})

ipcMain.handle('lcu:setRunePage', async (_event, runePage: { name?: string, primaryStyleId: number, subStyleId: number, selectedPerkIds: number[] }) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.setRunePage(runePage)
  return { success }
})

ipcMain.handle('lcu:deleteRunePage', async (_event, pageId: number) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.deleteRunePage(pageId)
  return { success }
})

// ==========================================
// SUMMONER SPELL HANDLERS
// ==========================================

ipcMain.handle('lcu:setSummonerSpells', async (_event, spell1Id: number, spell2Id: number) => {
  if (!lcuService?.isConnected()) {
    return { success: false, error: 'Not connected to League client' }
  }
  const success = await lcuService.setSummonerSpells(spell1Id, spell2Id)
  return { success }
})

// Live Game Data API handler (self-signed sertifika için main process'te)
ipcMain.handle('liveGame:getData', async () => {
  const https = await import('https')
  
  return new Promise((resolve) => {
    const options = {
      hostname: '127.0.0.1',
      port: 2999,
      path: '/liveclientdata/allgamedata',
      method: 'GET',
      rejectUnauthorized: false, // Self-signed sertifikayı kabul et
      headers: {
        'Accept': 'application/json'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data))
          } catch {
            resolve(null)
          }
        } else {
          resolve(null)
        }
      })
    })

    req.on('error', () => {
      // Oyun çalışmıyorsa sessizce null dön
      resolve(null)
    })

    req.setTimeout(1000, () => {
      req.destroy()
      resolve(null)
    })

    req.end()
  })
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.draftbetter.app')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  lcuService?.stopWatching()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

