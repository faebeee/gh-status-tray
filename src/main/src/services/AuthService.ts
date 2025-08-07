import { StoreService } from "./StoreService";

export class AuthService {
  private storeService: StoreService;

  constructor() {
    this.storeService = StoreService.getInstance();
  }

  isAuthenticated() {
    try {
      this.storeService.get("github-pat");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
