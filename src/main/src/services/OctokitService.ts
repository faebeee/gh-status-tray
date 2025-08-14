import { Octokit } from "@octokit/rest";
import keytar from "keytar";

export class OctokitService {
  private static instance: OctokitService;
  private appOctokit: Octokit | null = null;

  private constructor() {
    keytar.getPassword("github", "gh-status-tray")
    .then((pass) => {
      if (!pass) throw new Error(
        "No token found. Please run the device flow to generate a token."
      );
      this.appOctokit = new Octokit({
        auth: pass
      });
    });

  }

  getApi() {
    return this.appOctokit;
  }

  static getInstance(): OctokitService {
    if (!OctokitService.instance) {
      OctokitService.instance = new OctokitService();
    }
    return OctokitService.instance;
  }
}
