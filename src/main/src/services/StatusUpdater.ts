import { StoreService } from "./StoreService";

export class StatusUpdater {
  constructor() {
  }

  check() {
    StoreService.getInstance().get("repositories");
  }
}
