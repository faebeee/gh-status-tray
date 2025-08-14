import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import type { OAuthAppAuthInterface } from "@octokit/auth-oauth-device/dist-types/types";
import keytar from "keytar";
import EventEmitter from "node:events";


export class AuthService extends EventEmitter {
  private auth: OAuthAppAuthInterface | null = null;

  constructor() {
    super();
  }

  async isAuthenticated() {
    try {
      return await keytar.getPassword("github", "gh-status-tray") !== null;
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
        this.emit("on-verified", {
          verification_uri: verification.verification_uri,
          user_code: verification.user_code
        });
      }
    });

    const tokenAuthentication = await this.auth({
      type: "oauth"
    });

    console.log(tokenAuthentication);
    if (tokenAuthentication) {
      await keytar.setPassword("github", "gh-status-tray", tokenAuthentication.token);
      this.emit("auth-success");
    }
  }
}
