import WAWebJS, { Client, LocalAuth } from 'whatsapp-web.js';
import { Server } from 'socket.io';
import ApplicationSocketHandle from './sockethandle';
import commands from 'comands';

export default class WppHandler extends ApplicationSocketHandle {

    Wpp: Client;
    commands: commands;

    constructor(io: Server){
        super(io);

        this.Wpp = new Client({authStrategy: new LocalAuth()});
        this.log("Loading wppHandler with socket server");

        this.Wpp.on('qr',(qrcode) => this.onQrCode(qrcode));
        this.Wpp.on('ready',() => this.onReady());
        this.Wpp.on("message",(msg) => this.onMessage(msg));

        this.newConncetion();
        this.Wpp.initialize();

        this.commands = new commands();
    }
    
    async onQrCode(qrCode:string):Promise<void>{
        this.log('Generating qr code...');
        this.Application.qrcode = qrCode;
        (await this.socket).broadcast.emit('info',this.Application);
    }

    async newConncetion():Promise<void>{
        (await this.socket).emit('msg',this.Application);
    }

    async onReady():Promise<void>{
        this.Application.started = true;
        this.updateAllUsersWithText('info',this.Application)
        this.sendMsg('> Server Started!');
    }

    async onMessage(msg:WAWebJS.Message):Promise<void>{
        console.log(msg.from);
        console.log(msg.body);
        const getCommand = this.commands.func(msg.body); 
        msg.reply(getCommand);
    }

    async sendMsg(msg: string): Promise<void>{
        try {
            this.log(`Enviando ${msg}`);
            const number = process.env.WPP_NUMBER || "";
            const chatId = number.substring(1) + "@c.us";
            this.Wpp.sendMessage(chatId, msg);
        }
        catch(e){
            console.log("> Error sending message");
        }
        
    }
}