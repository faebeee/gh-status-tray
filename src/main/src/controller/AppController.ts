import { Repository } from "@shared/types/Repository";
import { BrowserWindow, ipcMain } from "electron";
import { Events } from "../../../preload/events";
import { AuthService } from "../services/AuthService";
import { GithubWorkflowService } from "../services/GithubWorkflowService";
import { RepositoryService } from "../services/RepositoryService";
import { StatusFetcher } from "../services/StatusFetcher";
import { StoreService } from "../services/StoreService";
import { TrayService } from "../services/TrayService";

export class AppController {
  private readonly authService = new AuthService();
  private fetcher: StatusFetcher | null = null;

  async start() {
    TrayService.getInstance().setAlert(false);
    console.log(await this.authService.isAuthenticated());


    this.authService.on("on-verified", (data) => {
      BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send("on-verification-uri", data);
      });
    });

    this.authService.on("auth-success", (data) => {
      BrowserWindow.getAllWindows().forEach((win) => {
        win.webContents.send("on-auth-success", data);
      });
    });

    ipcMain.handle(Events.getAuthStatus, () => {
      return this.authService.isAuthenticated();
    });

    ipcMain.handle("start-device-flow", () => {
      return this.authService.startDeviceFlow();
    });

    if (await this.authService.isAuthenticated()) {
      const workflowService = new GithubWorkflowService();
      const repositoryService = new RepositoryService(new StoreService());
      this.fetcher = new StatusFetcher();
      this.fetcher.start();
      ipcMain.handle("get-repositories", () => {
        return repositoryService.getRepositories();
      });

      ipcMain.handle("add-repository", async (_event, repository: Repository) => {
        await repositoryService.addRepository(repository);
      });

      ipcMain.handle(Events.removeRepository, async (_event, repository: Repository) => {
        await repositoryService.removeRepository(repository);
      });

      ipcMain.handle(Events.getWorkflowStatus, (_event, repository: Repository) => {
        return workflowService.getWorkflowRunsForRepo(repository.owner, repository.repo);
      });
    }
  }

  stop() {
    this.fetcher?.stop();
  }
}
