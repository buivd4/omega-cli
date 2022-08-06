import tokenize from "./utils/tokenize.js"

export default class CommandGroup{
    name
    help
    options = []
    commands = {}
    target = undefined
    constructor(name){
        this.name = name
    }
    setHelp(help){
        this.help = help
        return this
    }
    addCommand(command){
        this.commands[command]
        return this
    }
    parse(args){
        for (let i = 0; i< args.length; i++)
            if (args[i].startsWith("-")){
                this.options.forEach(option =>{
                    option.parse(tokenize(args[i])[0],tokenize(args[i])[1], tokenize(args[i])[2])
                })           
            }
            else if (this.commands[args[i]]!==undefined){
                this.commands[args[i]].parse(args.slice(i))
                this.target = this.commands[args[i]]
                break
            }
            else
                throw `Unexpected command ${this.commands[args[i]]}`
    }
    validate(){

    }
}