import { IWorkflowStatusEntry } from "@shared/types/IWorkflowStatusEntry";
import { OctokitService } from "./OctokitService";
import { TrayService } from "./TrayService";

export class GithubWorkflowService {
  private api: OctokitService;

  constructor() {
    this.api = OctokitService.getInstance();
  }

  private async getListOfWorkflows(owner: string, repo: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data } = await this.api.getApi().rest.actions.listWorkflowRunsForRepo({
      owner,
      repo
    });

    return data.workflow_runs;
  }

  public async getWorkflowRunsForRepo(owner: string, repo: string): Promise<IWorkflowStatusEntry[]> {
    const result = await this.getListOfWorkflows(owner, repo);
    const latestCommitId = result[0].head_commit!.id;
    const runsForCommit = result.filter((run) => run.head_commit!.id === latestCommitId);

    return runsForCommit.map(
      (run) =>
        ({
          name: run.name ?? "K/A",
          description: run.display_title ?? "K/A",
          id: run.id,
          repo: run.repository.full_name,
          event: run.event,
          branch: run.head_branch,
          conclusion: run.conclusion ?? "K/A",
          status: run.status ?? "K/A",
          url: run.html_url,
          createdAt: run.created_at,
          updatedAt: run.updated_at
        })
    );
  }
}
