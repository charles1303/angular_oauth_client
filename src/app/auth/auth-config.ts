interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: '[AUTH0_CLIENT_ID]',
    CLIENT_DOMAIN: '[AUTH0_DOMAIN]',
    AUDIENCE: 'http://localhost:8080',
    REDIRECT: 'http://localhost:4200/callback',
    SCOPE: 'openid profile email'
  };
