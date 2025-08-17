import { app, Menu, nativeImage, Tray } from "electron";
import path from "node:path";
import { ResourceService } from "./ResourceService";

export class TrayService {
  private static instance: TrayService;
  private tray: Tray | null = null;

  private constructor() {

  }

  static getInstance() {
    if (!TrayService.instance) {
      TrayService.instance = new TrayService();
    }
    return TrayService.instance;
  }

  public async setAlert(active: boolean) {
    const icon = active ? path.join(ResourceService.getResourcesPath(), "error.png") : path.join(ResourceService.getResourcesPath(), "ok.png");

    const image = await nativeImage.createThumbnailFromPath(icon, { width: 16, height: 16 });
    if (this.tray) {
      this.tray.destroy();
    }

    this.tray = new Tray(image);
    this.tray.setContextMenu(this.createMenu());
  }

  createMenu() {
    // This method will create the Menu for the tray
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open",
        type: "normal",
        click: () => app.emit("activate")
      },
      {
        label: "Quit",
        type: "normal",
        click: () => app.quit()
      }
    ]);
    return contextMenu;
  }
}
