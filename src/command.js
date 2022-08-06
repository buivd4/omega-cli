import tokenize from "./utils/tokenize.js"
import * as functools from "./utils/funtools.js"
import * as constants from "./constants/index.js"
export default class Command{
    name
    help
    options = []
    inputs = []
    handler
    mode = constants.operation.HANDLER_MODE_TRIGGER
    constructor(name,) {
        this.name = name
    }
    setHandler(handler, mode=constants.operation.HANDLER_MODE_CALL){
        this.handler = handler
        this.mode = mode
    }
    setHelp(help){
        this.help = help
        return this
    }
    addOption(option){
        this.options.push(option)
        return this
    }
    addInput(input){
        this.inputs.push(input)
        return this
    }
    parse(args){
        let cmd = args.shift()
        if (this.name !== cmd){
            return
        }
        let current_input = 0
        args.forEach(token => {
            if (token.startsWith("-")){
                this.options.forEach(option =>{
                    option.parse(tokenize(token)[0],tokenize(token)[1], tokenize(token)[2])
                });            
            }
            else {
                this.inputs[current_input].parse(token)
                current_input++
            }
        });
        if (this.mode === constants.operation.HANDLER_MODE_TRIGGER) this.trigger()
        else this.call()
    }
    validate(){
        this.options.forEach(option => option.validate())
        this.inputs.forEach(input => input.validate())
    }
    call(){
        let arg_names = functools.getParamNames(this.handler);
        let passing_arg = Array(arg_names.length);
        this.inputs.forEach((input,idx) => passing_arg[idx] = input.value)
        this.options.forEach(option => {
            if(option.value!==undefined){
                let idx = arg_names.indexOf(option.name)
                passing_arg[idx] = option.value
            }
        })
        this.handler(...passing_arg)
    }
    trigger(){
        let that = this
        that.handler(that)
    }
}