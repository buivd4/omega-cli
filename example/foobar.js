import * as omega_cli from 'omega-cli';

let program = new omega_cli.Program();

program.addCommand(
    new omega_cli.Command('foo').addOption(
        new omega_cli.Optional('omega').setDataType(omega_cli.constants.data.STRING)
    )
)
program.addCommand(
    new omega_cli.Command('bar').addOption(
        new omega_cli.Optional('other').setDataType(omega_cli.constants.data.NUMBERIC)
    )
)

program.run()
// foobar.js foo --omega=cli
console.log(program.events.foo.called) // true
console.log(program.events.foo.args.omega) // cli
console.log(program.events.bar) // undefined

if (program.events.foo.called){
    // Do something
}