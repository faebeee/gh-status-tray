import { Repository } from "@shared/types/Repository";
import { ipcMain } from "electron";
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

  async start(): void {

    TrayService.getInstance().setAlert(false);
    console.log(await this.authService.isAuthenticated());


    ipcMain.handle(Events.getAuthStatus, () => {
      return this.authService.isAuthenticated();
    });

    ipcMain.handle("open-auth-url", () => {
      return this.authService.openAuthUrl();
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
