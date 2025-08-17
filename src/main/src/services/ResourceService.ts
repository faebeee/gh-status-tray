import { app } from "electron";
import path from "node:path";

export class ResourceService {
  static getResourcesPath() {
    const prodPath = path.resolve(`${process.resourcesPath}/resources`);
    const devPath = path.resolve(`${__dirname}/../../resources`);

    return app.isPackaged ? prodPath : devPath;
  }
}
