import * as data_const from './constants/data.js';

export default class Optional{
    name
    short_name
    help
    is_flag = false
    data_type = 'string'
    value
    required
    constraints = []
    constructor(name, default_value = undefined, required = false, constraints = []) {
        this.name = name
        this.required = required
        if (!typeof default_value === this.data_type)
            throw `Unexpected default value of <${name}>. Expected '${this.data_type}', got '${typeof default_value}'`
        this.value = default_value
        this.constraints = constraints
    }
    setDataType(data_type){
        if (!data_const.DATATYPE.has(data_type)) throw `Optional data type should be ${Array.from(data_const.DATATYPE).join(", ")}`
        this.data_type = data_type
        return this
    }
    setHelp(help){
        this.help = help
        return this
    }
    setIsFlag(is_flag){
        this.is_flag = is_flag
        this.data_type = 'boolean'
        return this
    }
    setShortName(short_name){
        this.short_name = short_name
        return this
    }
    parse(name,short_name, value){
        // If match name or short_name
        if ((short_name !== undefined && short_name===this.short_name) || (name!== undefined && this.name === name)){
            // If not a flag but no value is provided
            if (value === undefined && !this.is_flag)
                throw `Missing value <${name}>`
            else if (this.is_flag){
                // If is a flag
                this.value = true
            }
            else{
                switch (this.data_type){
                    case "number":
                        let parsed_value = parseFloat(value)
                        if (Number.isNaN(parsed_value)) throw `Invalid value '${value}'. Expected a number`
                        console.log(value)
                        this.value = parsed_value
                        break
                    case "boolean":
                        if (!(data_const.BOOLEAN_AS_STRING).has(value))
                            throw `Unexpected boolean value ${value}`
                        this.value = (value.toLowerCase() === "true")
                        break
                    case "string":
                        this.value = value
                        break
                }
            }
            this.validate()
        }
    }
    validate(){
        if (this.required && this.value === undefined)
            throw `Option <${this.name}> is required`
        if (!typeof this.value === this.data_type)
            throw `Unexpected value of <${name}>. Expected '${this.data_type}', got '${typeof default_value}'`
        this.constraints.forEach(constraint => constraint.check(this.value))
    }
}