import * as sqlite3 from 'sqlite3';

type OAuthProps = {
    accessToken: string, 
    refreshToken: string, 
    expiresAt: number
}

export default class OAuthDataBase {
    db: sqlite3.Database;
    constructor(){
        this.db = new sqlite3.Database('oauth.db');
        this.db.serialize(() => this.createDatabaseIfNotExists());
    }

    private createDatabaseIfNotExists(){
        this.db.run(`
            CREATE TABLE IF NOT EXISTS oauth (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            access_token TEXT NOT NULL,
            refresh_token TEXT NOT NULL,
            expires_at INTEGER NOT NULL
          )`);
    }

    public saveOAuth(authCreds: OAuthProps): void   {
        const {accessToken, expiresAt, refreshToken} = authCreds;
        this.db.run(`
        INSERT INTO oauth (accessToken, expiresAt, refreshToken)
        VALUES (?, ?, ?)
        `,[accessToken, expiresAt, refreshToken]);
    }

    public getOAuth (){
        return new Promise((resolve, reject) => {
            this.db.get(`
            SELECT * FROM oauth ORDER BY id DESC LIMIT 1`,
            (err,row) => {
                if(err) return reject(err);
                return resolve(row);
            } )
        });
    }



}