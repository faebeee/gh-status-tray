import type { OAuthAppAuthInterface } from "@octokit/auth-oauth-device/dist-types/types";
import EventEmitter from "node:events";
import { StoreService } from "./StoreService";
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";


export class AuthService extends EventEmitter{
  private storeService: StoreService;
  private auth: OAuthAppAuthInterface | null = null

  constructor() {
    super();
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

  async startDeviceFlow() {
    this.auth = createOAuthDeviceAuth({
      clientType: "oauth-app",
      clientId: process.env.GH_OAUTH_CLIENT_ID!,
      scopes: ["repo", "workflow"],
      onVerification: (verification) => {
        this.emit('on-verified', {
          verification_uri: verification.verification_uri,
          user_code: verification.user_code,
        });
      },
    });

    const tokenAuthentication = await this.auth({
      type: "oauth",
    });

    console.log(tokenAuthentication);
  }
}
