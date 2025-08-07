import { Octokit } from '@octokit/rest'

export class OctokitService {
  private static instance: OctokitService
  private readonly appOctokit: Octokit

  private constructor() {
    this.appOctokit = new Octokit({
      auth: process.env.GITHUB_PAT
    })
  }

  getApi(): Octokit {
    return this.appOctokit
  }

  static getInstance(): OctokitService {
    if (!OctokitService.instance) {
      OctokitService.instance = new OctokitService()
    }
    return OctokitService.instance
  }
}
