const { app, BrowserWindow } = require("electron");
const os = require("os-utils");
const path = require("path");
const AutoLaunch = require("auto-launch");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 85,
    height: 10,
    alwaysOnTop: true,
    y: 0,
    x: 0,
    skipTaskbar: true,
    titleBarStyle: "hidden",
    icon: __dirname + "/icon.ico",
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  setInterval(() => {
    os.cpuUsage(function (v) {
      mainWindow.webContents.send("cpu", v * 100);
      mainWindow.webContents.send("mem", 100 - os.freememPercentage() * 100);
    });
  }, 1000);

  const autoLaunch = new AutoLaunch({
    name: "resource-mon",
    path: app.getPath("exe"),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
