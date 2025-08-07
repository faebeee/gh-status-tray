import { electronAPI } from "@electron-toolkit/preload";
import { IAppApi } from "@shared/types/IAppApi";
import { contextBridge, ipcRenderer } from "electron";

// Custom APIs for renderer
const api: IAppApi = {
  checkWorkflow: (...props) => ipcRenderer.invoke("check-workflow", ...props),
  addWorkflow: (...props) => ipcRenderer.invoke("add-workflow", ...props),
  removeWorkflow: (...props) => ipcRenderer.invoke("remove-workflow", ...props)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
