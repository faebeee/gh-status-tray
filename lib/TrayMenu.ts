import { app, Tray, Menu, nativeImage } from 'electron';
import appIcon from '../src/assets/icon.png?asset'


// using the asynchronous API with await

export class TrayMenu {
  // Create a variable to store our tray
  // Public: Make it accessible outside of the class;
  // Readonly: Value can't be changed
  public tray: Tray | null = null;
    


  constructor() {
    nativeImage.createThumbnailFromPath(appIcon, {width: 24, height: 24})
    .then((image) => {
        this.tray = new Tray(image)
        this.tray.setContextMenu(this.createMenu());
    });

  }

  createMenu(){
     // This method will create the Menu for the tray
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Tokei',
        type: 'normal',
        click: () => { 
          /* Later this will open the Main Window */ 
        }
      },
      {
        label: 'Quit',
        type: 'normal',
        click: () => app.quit()
      }
    ]);
    return contextMenu;
  }
}


