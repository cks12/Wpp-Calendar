export interface commandInterface {
    function: () => any;
    description: string,
    name: string;
}


export default class commands {

    listCommands: commandInterface[];

    constructor(){
        this.listCommands = []; 
        this.listCommands.push(this.listAllCommands());       
    }

    func(command: string){

        const _this = this;
        const commandWithoutSpaces = command.replace(/[\W_\s]+/g, '');
        const commandNormalized = commandWithoutSpaces.toLowerCase();

        try {
            const commandIndex: number = 
                _this.listCommands.findIndex(e => e.name === commandNormalized);
            
            if( commandIndex == -1 )
                return "Comando não encontrado, digite help para ter a lista dos comandos";
            
            return _this.listCommands[commandIndex].function();
            }

        catch(e){
            console.log("Error: ", e);
            return e;
        }

    }

    listAllCommands():commandInterface{
        return {
            function: () => this.listAllCommandsMethod(),
            description: "Lista todos os comandos",
            name: "help",
        }
    }

    listAllCommandsMethod(): string{
        let buffer = "";
        const _this = this;
        _this.listCommands.forEach(item => {
            const _string = `*${item.name}* - ${item.description}\n`;
            buffer = buffer + _string;
        });
        return buffer;
    }

}