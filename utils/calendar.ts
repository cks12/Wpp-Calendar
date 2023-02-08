import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import OAuthDataBase from 'db';

// type credsType = typeof credsGoogle

type credsType = {
    clientId?: string,
    clientSecret?: string, 
    redirectUri?: string
}

class Calendar extends OAuthDataBase {
    creds: credsType;
    constructor(){
        super();
        this.creds = {
            clientId: 'credsGoogle.web.client_id',
            clientSecret: 'credsGoogle.web.client_secret',
            redirectUri: 'http://localhost:3000',

        };
    }

}