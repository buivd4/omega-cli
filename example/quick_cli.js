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
// foobar.js foo --omega=cli
// i
// love
// cli