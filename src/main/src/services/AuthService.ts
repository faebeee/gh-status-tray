import { StoreService } from "./StoreService";

export class AuthService {
  private storeService: StoreService;

  constructor() {
    this.storeService = StoreService.getInstance();
  }

  async isAuthenticated() {
    try {
      return await this.storeService.has("github-pat");
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
