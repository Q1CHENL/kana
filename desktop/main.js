const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    // Hide the default menu bar
    autoHideMenuBar: true,
    // Add these options for a cleaner look
    titleBarStyle: 'hidden',
    // Show window controls but hide the title bar
    titleBarOverlay: false
  })

  // Load your HTML file
  mainWindow.loadFile(path.join(__dirname, '../kana.html'))
  
  // Optional: Open DevTools if needed during development
  // mainWindow.webContents.openDevTools()
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS, re-create window when icon is clicked in dock
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
