import OAuthDataBase from 'db';
import { OAuth2Client } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';

const client_id = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

const client = new OAuth2Client(client_id, clientSecret, redirectUri);

const getOAuth2 = async (req: NextApiRequest, res: NextApiResponse) =>  {
    if(req.method !== 'GET'){
        res.status(405).send("Method not allowed");
        return;
    }

    const _OAuthDataBase = new OAuthDataBase();
    const code = req.query.code;
    if(!code){
        res.redirect(
            client.generateAuthUrl({
                access_type:'offline',
                scope: ['https://www.googleapis.com/auth/calendar'],
            })
        )
    }

    res.status(200).send("HELLO WORLD!");

}

export default getOAuth2;