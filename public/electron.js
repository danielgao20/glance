const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs").promises;

const isDev = process.env.NODE_ENV !== "production";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false, // Security: Disable Node.js integration in renderer
      contextIsolation: true, // Security: Enable context isolation
      preload: path.join(__dirname, "preload.js"), // Load the preload script
    },
  });

  // Load the app
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }

  // Handle IPC messages
  ipcMain.handle("read-file", async (event, filePath) => {
    try {
      const content = await fs.readFile(filePath, "utf8");
      return content;
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle("write-file", async (event, filePath, content) => {
    try {
      await fs.writeFile(filePath, content, "utf8");
      return true;
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle("get-app-version", () => {
    return app.getVersion();
  });

  ipcMain.handle("show-open-dialog", async (event, options) => {
    return await dialog.showOpenDialog(mainWindow, options);
  });

  ipcMain.handle("show-save-dialog", async (event, options) => {
    return await dialog.showSaveDialog(mainWindow, options);
  });

  // Window control handlers
  ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
  });

  ipcMain.on("maximize-window", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("close-window", () => {
    mainWindow.close();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
