import {environment} from '../../environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'seGdd26eZhvfBHv7S4LXTqMjMNplRBRC',
  domain: 'henribos.eu.auth0.com',
  callbackURL: environment.auth_url
};
