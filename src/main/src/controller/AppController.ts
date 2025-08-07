import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { ipcMain } from "electron";
import { AuthService } from "../services/AuthService";
import { GithubWorkflowService } from "../services/GithubWorkflowService";
import { TrayService } from "../services/TrayService";

export class AppController {
  private workflowService = new GithubWorkflowService();

  start(): void {
    TrayService.getInstance().setAlert(false);
    const auth = new AuthService();
    auth.isAuthenticated();

    ipcMain.handle("check-workflow", (_event, owner: string, repo: string) => {
      return this.checkWorkflow(owner, repo);
    });

    ipcMain.handle("add-workflow", (_event, owner: string, repo: string) => {
      return this.addWorkflow(owner, repo);
    });

    ipcMain.handle("remove-workflow", (_event, owner: string, repo: string) => {
      return this.removeWorkflow(owner, repo);
    });
  }

  async checkWorkflow(owner: string, repo: string): Promise<IWorkflowStatusEntry[]> {
    return this.workflowService.getWorkflowRunsForRepo(owner, repo);
  }

  async addWorkflow(owner: string, repo: string) {
    return this.workflowService.addNewWorkflow(owner, repo);
  }

  async removeWorkflow(owner: string, repo: string) {
    return this.workflowService.removeWorkflow(owner, repo);
  }
}
