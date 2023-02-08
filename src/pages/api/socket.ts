import { Server } from 'socket.io';
import WppHandler from 'utils/wppHandle';

const SocketHandler = (req: Request, res: Response|any) => {
    // Verify that socket server is available
    if (res.socket.server.io) return res.end();

    const io = new Server(res.socket.server)
    const applicationHandle = new WppHandler(io);
    res.socket.server.io = io 
    res.end();
}

export default SocketHandler;