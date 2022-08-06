export default function tokenize(token){
    let name
    let short_name = undefined
    let value = undefined
    if (token.includes("=")){
        let splitted = token.split("=")
        name = splitted.shift()
        value = splitted.join("=")
    }
    else{
        name = token
        value
    }
    // remove -- or - from function name
    let count_header = 0
    while (name.startsWith("-")){
        name = name.slice(1,)
        count_header ++
    }
    switch(count_header){
        case 1:
            short_name = name
            name = undefined
            break
        case 2:
            // Do nothing
            break
        default:
            throw `Unexpected token ${token}`
    }
    return [name, short_name, value]
}