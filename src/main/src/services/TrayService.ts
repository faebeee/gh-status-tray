import { app, Menu, nativeImage, Tray } from "electron";
import errorIcon from "../../../assets/error.png?asset";
import okIcon from "../../../assets/ok.png?asset";

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
    const image = await nativeImage.createThumbnailFromPath(active ? errorIcon : okIcon, { width: 16, height: 16 });
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
        label: "Quit",
        type: "normal",
        click: () => app.quit()
      }
    ]);
    return contextMenu;
  }
}
