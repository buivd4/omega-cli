# Omega-CLI
Create Command Line Interface (CLI) for your JS project.

**Author**: buivd4<br/>
**License**: MIT License

## Installation
Install from source code:

```shell
$ npm install .
```

Import to use:
```javascript
import * as omegacli from 'omega-cli';

```

## Features
* Declaratively create CLI program with just a few lines of code.
* Support parameter auto-convert (Numeric, Boolean, String)
* Support parameter validate (bound, length, regex, etc) or you can easily define your own

**DISCLAIMER**: 

This library is inspired by python's argparse and click package :stuck_out_tongue_winking_eye:

## Examples

Check out my examples at [Example folder](./example/)

Create a CLI program now is easy, my friend:

```javascript
import * as omega_cli from 'omega-cli';

let program = new omega_cli.Program();

function foo_exec(omega, help, alot) {
    // auto mapping between foo_exec's parameters and cli parameters
    console.log(omega)
    console.log(help)
    console.log(alot)
}

program.addCommand(
    new omega_cli.Command('foo')
        .addOption(new omega_cli.Optional('omega').setDataType(omega_cli.constants.data.STRING))
        .addOption(new omega_cli.Optional('help').setDataType(omega_cli.constants.data.STRING))
        .addOption(new omega_cli.Optional('alot').setDataType(omega_cli.constants.data.STRING)),
    foo_exec,
    omega_cli.constants.operation.HANDLER_MODE_CALL
)

program.run()


// $ foobar.js foo --omega=cli
// i
// love
// cli
```

## Documentation
### Classes
1. Optional
2. Input
3. Command
4. CommandGroup
5. Constraint
6. Program
