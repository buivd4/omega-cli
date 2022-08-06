export class StringConstraint{
    regex=undefined
    max_length=undefined
    min_length=undefined
    enum_set=undefined

    setMaxLength(max_length){
        this.max_length = max_length
        return this
    }

    setMinLength(min_length){
        this.min_length = min_length
        return this
    }
    setRegex(regex){
        this.regex = regex
        return this
    }

    setEnum(enum_set){
        this.enum_set = enum_set
        return this
    }

    check(value){
        if (this.min_length!==undefined && value.length<this.min_length)
            throw `Unexpected value '${value}'. Min length must <= ${this.min_length}`
        if (this.max_length!==undefined && value.length>this.max_length)
            throw `Unexpected value '${value}'. Min length must <= ${this.max_length}`
        if (this.enum_set!==undefined && this.enum_set.length>0 && !this.enum_set.has(value))
            throw `Unexpected value '${value}. The possible values is :${this.enum_set.join(',')}`
        if (this.regex!==undefined && !this.regex.test(value))
            throw `Unexpected value '${value}. Unmatch regex`
    }
}

export class NumberConstraint{
    max=undefined
    min=undefined
    is_integer=false
    
    setMax(max){
        this.max = max
        return this
    }
    setMin(min){
        this.min = min
        return this
    }
    mustBeInteger(){
        this.is_integer = true
        return this
    }
    check(value){
        function isInt(value) {
            return !isNaN(value) && 
                   parseInt(Number(value)) == value && 
                   !isNaN(parseInt(value, 10));
        }
        if (this.max!==undefined && value>this.max)
            throw `Unexpected value ${value}. Must be smaller than or equal ${this.max}`
        if (this.min!==undefined && value<this.min)
            throw `Unexpected value ${value}. Must be greater than or equal ${this.min}`
        if (this.is_integer && !isInt(value))
            throw `Unexpected value '${value}'. Must be an integer`
    }
}