const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel, data) => {
    console.log(`Sending message on channel: ${channel}, with data:`, data);
    ipcRenderer.send(channel, data);
  },
  onMessage: (channel, callback) => {
    console.log(`Listening for messages on channel: ${channel}`);
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
  fetchUserInfo: async () => {
    return ipcRenderer.invoke('get-user-info');
  },
  fs: fs.promises,
  path: path,
});
