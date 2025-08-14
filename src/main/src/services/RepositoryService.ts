import { Repository } from "@shared/types/Repository";
import { StoreService } from "./StoreService";


export class RepositoryService {
  private static readonly REPOSITORIES_KEY = "repositories";

  constructor(private readonly storeService: StoreService) {
  }

  async getRepositories(): Promise<Repository[]> {
    const repos = await this.storeService.get(RepositoryService.REPOSITORIES_KEY);
    if (!Array.isArray(repos)) {
      return [];
    }
    return repos || [];
  }

  async addRepository(repository: Repository): Promise<void> {
    const repositories = await this.getRepositories();
    repositories.push(repository);
    await this.storeService.put(RepositoryService.REPOSITORIES_KEY, repositories);
  }

  async removeRepository(repository: Repository): Promise<void> {
    const repositories = await this.getRepositories();
    const updatedRepositories = repositories.filter(
      (r) => r.owner !== repository.owner || r.repo !== repository.repo
    );
    await this.storeService.put(RepositoryService.REPOSITORIES_KEY, updatedRepositories);
  }
}
