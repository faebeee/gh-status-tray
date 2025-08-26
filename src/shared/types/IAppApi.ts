import { IWorkflowStatusEntry } from "./IWorkflowStatusEntry";
import { Repository } from "./Repository";

export interface IAppApi {
  getAuthStatus(): Promise<boolean>;

  getRepositories(): Promise<Repository[]>;

  addRepository(repo: Repository): Promise<void>;

  removeRepository(repo: Repository): Promise<void>;

  getWorkflowStatus(repo: Repository): Promise<IWorkflowStatusEntry[]>;

  startDeviceFlow(): Promise<void>;

  onAuthSuccess(callback: () => void): void;

  onVerificationUri(callback: (data: { verification_uri: string, user_code: string }) => void): void;

  getBuildTime(): Promise<{ buildTime:string, resourcePath:string, version: string }>;

  closeApp(): Promise<void>;
}
