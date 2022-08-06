import * as data_const from './constants/data.js';

export default class Input{
    name
    data_type = 'string'
    value
    required
    constraints = []
    constructor(name, data_type, default_value = undefined, required = false, constraints = []){
        this.name = name
        if (!data_const.DATATYPE.has(data_type)) throw `Optional data type should be ${Array.from(data_const.DATATYPE).join(", ")}`
        this.data_type = data_type
        this.value = default_value
        this.required = required
        this.constraints = constraints
    }
    parse(value){
        switch (this.data_type){
            case "number":
                value = parseFloat(value)
                this.value = value
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
        this.validate()
    }
    validate(){
        if (this.required && this.value === undefined)
            throw `Option <${this.name}> is required`
        if (!typeof this.value === this.data_type)
            throw `Unexpected value of <${name}>. Expected '${this.data_type}', got '${typeof default_value}'`
        this.constraints.forEach(constraint => constraint.check(this.value))
    }
}
