import { electronAPI } from '@electron-toolkit/preload'
import { IAppApi } from '@shared/types/IAppApi'
import { contextBridge, ipcRenderer } from 'electron'
import { Events } from "./events";

// Custom APIs for renderer
const api: IAppApi = {
  getAuthStatus: () => ipcRenderer.invoke(Events.getAuthStatus),
  startDeviceFlow: () => ipcRenderer.invoke('start-device-flow'),
  onVerificationUri: (callback) => ipcRenderer.on('on-verification-uri', (_event, data) => callback(data)),
  getRepositories: () => ipcRenderer.invoke('get-repositories'),
  addRepository: (repo) => ipcRenderer.invoke('add-repository', repo),
  removeRepository: (repo) => ipcRenderer.invoke(Events.removeRepository, repo),
  getWorkflowStatus: (repo) => ipcRenderer.invoke(Events.getWorkflowStatus, repo),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('app', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.app = api
}
