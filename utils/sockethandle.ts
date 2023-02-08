import { Server, Socket } from 'socket.io';
import Application from './application';
import WppHandler from './wppHandle';

export default class ApplicationSocketHandle extends Application {
    socket: Promise<Socket>;
    io: Server;
    constructor(io:Server){
        super();
        this.socket = this.createHandler(io);
        this.io = io;
    }

    createHandler(io: Server):Promise<Socket>{
        return new Promise((resolve, reject) => {
            io.on('connection', (s) => this.onConnection(s,resolve));
        });
    }

    onConnection(socket:Socket, res:any){
        this.log(`connection established with ${socket.id}`)
        socket.emit("info", this.Application);
        socket.emit("msg", this.Application);
        socket.on('onChangeNumber', (n:string) => this.onChangeNumber(n));
        return res(socket);
    }

    async onChangeNumber(number: string) {
        this.changeNumber(number);
        console.log('number changed');
        (await this.socket).broadcast.emit("number",number )
    }

    updateAllUsersWithText(event: string, msg: any){
        this.io.sockets.emit(event,msg);
    }
}