import { Octokit } from "@octokit/rest";
import { StoreService } from "./StoreService";

export class OctokitService {
  private static instance: OctokitService;
  private readonly appOctokit: Octokit;
  private readonly storeService = StoreService.getInstance();

  private constructor() {
    this.appOctokit = new Octokit({
      auth: this.storeService.get("github-pat"),
    });
  }

  getApi(): Octokit {
    return this.appOctokit;
  }

  static getInstance(): OctokitService {
    if (!OctokitService.instance) {
      OctokitService.instance = new OctokitService();
    }
    return OctokitService.instance;
  }
}
