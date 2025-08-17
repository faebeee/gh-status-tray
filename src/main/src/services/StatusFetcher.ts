import { Notification } from "electron";
import { GithubWorkflowService } from "./GithubWorkflowService";
import { RepositoryService } from "./RepositoryService";
import { StoreService } from "./StoreService";

export type RepoStatus = {
  repo: string;
  owner: string;
  status: "failed" | "success" | null;
}

export class StatusFetcher {
  private repoService: RepositoryService;
  private workflowService: GithubWorkflowService;
  private statuses: RepoStatus[] = [];
  private interval: NodeJS.Timeout | null = null;

  constructor() {
    this.repoService = new RepositoryService(new StoreService());
    this.workflowService = new GithubWorkflowService();
  }

  async start() {
    const repos = await this.repoService.getRepositories();
    repos.forEach(repo => {
      this.statuses.push({
        owner: repo.owner,
        repo: repo.repo,
        status: null
      });
    });

    this.interval = setInterval(() => this.check(), 1000 * 60) as NodeJS.Timeout;
    this.check();
  }

  stop() {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
  }

  async check() {
    console.log("Checking status");
    const repos = await this.repoService.getRepositories();

    for (const repo of repos) {
      const status = await this.workflowService.getWorkflowRunsForRepo(repo.owner, repo.repo);
      const hasFailed = status.some(run => run.conclusion === "failure");
      const newStatus = hasFailed ? "failed" : "success";

      const repoIndex = this.statuses.findIndex(
        (item) => item.repo === repo.repo && item.owner === repo.owner
      );
      if (repoIndex !== -1) {
        if (this.statuses[repoIndex].status !== newStatus) {
          //   show toast
          new Notification({
            title: "Github Workflow",
            urgency: newStatus === "failed" ? "critical" : "normal",
            body: `Workflow for ${repo.repo} has ${newStatus}`
          }).show();
        }
        this.statuses[repoIndex].status = newStatus;
      }
    }
  }
}
