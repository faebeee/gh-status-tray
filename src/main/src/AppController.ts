import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { ipcMain } from "electron";
import { GithubWorkflowService } from "./GithubWorkflowService";
import { TrayService } from "./TrayService";

export class AppController {
  private workflowService = new GithubWorkflowService();

  start(): void {
    TrayService.getInstance().setAlert(false);

    ipcMain.handle("check-workflow", (_event, owner: string, repo: string) => {
      return this.checkWorkflow(owner, repo);
    });
  }

  async checkWorkflow(owner: string, repo: string): Promise<IWorkflowStatusEntry[]> {
    return this.workflowService.getWorkflowRunsForRepo(owner, repo);
  }
}
