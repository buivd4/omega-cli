import Command from "./command.js"
import * as constants from "./constants/index.js"

export default class Program{
    name
    command_groups = []
    commands = []
    events = {}
    constructor(name){
        this.name = name
        this.addCommand(new Command("help"), this.printHelp, constants.operation.HANDLER_MODE_TRIGGER)
    }

    getArgs(){
        return process.argv.slice(2)
    }

    addCommand(command, handler=undefined, mode=constants.operation.HANDLER_MODE_CALL){
        if (handler===undefined){
            command.setHandler((command)=>this.eventHandler(command),constants.operation.HANDLER_MODE_TRIGGER)
        }
        else{
            command.setHandler(handler, mode)
        }
        this.commands.push(command)
        return this
    }

    addCommandGroup(command_group){
        this.command_groups.push(command_group)
        return this
    }

    run(){
        this.commands.forEach(command=> {
            command.parse(this.getArgs())
        })
    }
    printHelp(command){
        console.log(`Usage: ${this.name} COMMAND_GROUP [OPTIONS] COMMAND [OPTIONS] (<command_input>)`)
    }
    eventHandler(command){
        this.events[command.name] = {}
        this.events[command.name].called = true
        this.events[command.name].args = {}
        command.inputs.forEach(input => {this.events[command.name].args[input.name]=input.value})
        command.options.forEach(option => {this.events[command.name].args[option.name]=option.value})
    }
}