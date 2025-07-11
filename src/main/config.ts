export const GH_OAUTH_CONFIG = {
  sources: {
    repoUrl: 'https://github.com/faebeee/gh-status-tray'
  },
  oauth: {
    clientId: process.env.GH_OAUTH_CLIENT_ID,
    clientSecret: process.env.GH_OAUTH_SECRET,
    authorizationUrl: 'http://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
  }
};
