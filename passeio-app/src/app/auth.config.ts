import { AuthConfig } from "angular-oauth2-oidc";

export const auth: AuthConfig ={
    issuer: 'https://accounts.google.com',
    //redirectUri: window.location.origin,
    redirectUri: 'http://localhost:4200',
    clientId: '',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    responseType: 'id_token token',
    requireHttps: false,
    oidc: true,
    showDebugInformation: true
}