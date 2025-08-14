import { Repository } from "@shared/types/Repository";
import { ipcMain } from "electron";
import { AuthService } from "../services/AuthService";
import { GithubWorkflowService } from "../services/GithubWorkflowService";
import { RepositoryService } from "../services/RepositoryService";
import { StoreService } from "../services/StoreService";
import { TrayService } from "../services/TrayService";
import { Events } from "../../../preload/events";

export class AppController {
  private readonly workflowService = new GithubWorkflowService();
  private readonly repositoryService = new RepositoryService(new StoreService());
  private readonly authService = new AuthService();

  start(): void {
    TrayService.getInstance().setAlert(false);
    this.authService.isAuthenticated();

    ipcMain.handle("get-auth-status", () => {
      return this.authService.isAuthenticated();
    });

    ipcMain.handle("open-auth-url", () => {
      return this.authService.openAuthUrl();
    });

    ipcMain.handle("get-repositories", () => {
      return this.repositoryService.getRepositories();
    });

    ipcMain.handle("add-repository", async (_event, repository: Repository) => {
      await this.repositoryService.addRepository(repository);
    });

    ipcMain.handle(Events.removeRepository, async (_event, repository: Repository) => {
      await this.repositoryService.removeRepository(repository);
    });

    ipcMain.handle(Events.getWorkflowStatus, (_event, repository: Repository) => {
      return this.workflowService.getWorkflowRunsForRepo(repository.owner, repository.repo);
    });
  }
}
