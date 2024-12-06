const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const screenshot = require('screenshot-desktop');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minHeight: 570,
    minWidth: 1250,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
});

// Handle screenshot requests
ipcMain.on('capture-screenshot', async (event) => {
  try {
    const uploadsDir = path.join(__dirname, './backend/uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const screenshotPath = path.join(uploadsDir, `screenshot-${Date.now()}.jpg`);
    await screenshot({ filename: screenshotPath });

    event.sender.send('screenshot-captured', screenshotPath);
  } catch (error) {
    event.sender.send('screenshot-error', error.message);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
