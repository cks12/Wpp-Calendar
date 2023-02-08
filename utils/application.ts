import { ApplicationInterface } from "types";

const clientNumber = "";
const defaultApplication: ApplicationInterface = {
    started: false,
    number: "",
    qrcode: ""
}

class cli {
    debug: boolean
    constructor(debug:boolean) {
        this.debug = debug;
    }

    newUserConnection (id: any) {
        if(!this.debug) return;
        console.log(`> User Connection ${id}`)
    }

    log(msg: string | any): void{
        console.log(`> ${msg}`); 
    }

    logError(msg:string): void{
        console.log(`> ERROR: #{msg}`);
    }
    
}

class Application extends cli {
    Application: ApplicationInterface
    constructor(){
        super(true);
        this.Application = defaultApplication;
    }

    changeNumber(number: string): void{
        this.Application.number = number;
        number = number;
    }
}

export default Application;