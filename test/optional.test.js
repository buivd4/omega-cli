
import * as chai from "chai"
import * as omega_cli from "../index.js"

describe("Option test", () => {
    context('before parse', function() {
        it("should return an optional object with undefined value", function () {
            let option = new omega_cli.Optional("example")
            chai.expect(option).to.have.property('value').equal(undefined)
        })
        it("should return an optional object with default value if set", function () {
            let option = new omega_cli.Optional("example","default_value")
            chai.expect(option).to.have.property('value').equal("default_value")
        })

    })
    context('command do not include option', function() {
        it("should return an optional object with undefined value", function () {
            let option = new omega_cli.Optional("example")
            option.parse("aaa","a", 10)
            chai.expect(option).to.have.property('value').equal(undefined)
        })
    })

    context('parse flag', function() {
        it("should has value when parse full name flag", function () {
            let option = new omega_cli.Optional("example").setIsFlag(true)
            option.parse("example", undefined, undefined)
            chai.expect(option).to.have.property('value').equal(true)
        })
        it("should has value when parse short name flag", function () {
            let option = new omega_cli.Optional("example").setIsFlag(true).setShortName("e")
            option.parse(undefined, "e", undefined)
            chai.expect(option).to.have.property('value').equal(true)
        })
    })
    context('parse integer', function() {
        it("should has value when parse full name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.NUMBERIC)
            option.parse("example", undefined, "10")
            chai.expect(option).to.have.property('value').equal(10)
        })
        it("should has value when parse short name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            option.parse(undefined, "e", "10")
            chai.expect(option).to.have.property('value').equal(10)
        })
        it("should return error if can not cast input to integer", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "sasd")}).to.throw("Invalid value 'sasd'. Expected a number")
        })
        it("should return error validate error (max)", function () {
            let constraints = [new omega_cli.constraints.NumberConstraint().setMax(10)]
            let option = new omega_cli.Optional("example",undefined,false,constraints).setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "11")}).to.throw("Unexpected value 11. Must be smaller than or equal 10")
        })
        it("should return if validate success (max)", function () {
            let constraints = [new omega_cli.constraints.NumberConstraint().setMax(10)]
            let option = new omega_cli.Optional("example",undefined,false,constraints).setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "10")}).to.not.throw()
        })
        it("should return error validate error (max, min)", function () {
            let constraints = [new omega_cli.constraints.NumberConstraint().setMax(10).setMin(5)]
            let option = new omega_cli.Optional("example",undefined,false,constraints).setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "11")}).to.throw("Unexpected value 11. Must be smaller than or equal 10")
            chai.expect(()=>{option.parse(undefined, "e", "3")}).to.throw("Unexpected value 3. Must be greater than or equal 5")
        })
        it("should return if validate success (max, min)", function () {
            let constraints = [new omega_cli.constraints.NumberConstraint().setMax(10)]
            let option = new omega_cli.Optional("example",undefined,false,constraints).setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "7")}).to.not.throw()
        })
        it("should return if validate success (integer)", function () {
            let constraints = [new omega_cli.constraints.NumberConstraint().mustBeInteger()]
            let option = new omega_cli.Optional("example",undefined,false,constraints).setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            chai.expect(()=>{option.parse(undefined, "e", "7.5")}).to.throw("Unexpected value '7.5'. Must be an integer")
        })

    })
    context('parse float', function() {
        it("should has value when parse full name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.NUMBERIC)
            option.parse("example", undefined, "199.99")
            chai.expect(option).to.have.property('value').equal(199.99)
        })
        it("should has value when parse short name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.NUMBERIC).setShortName("e")
            option.parse(undefined, "e", "199.99")
            chai.expect(option).to.have.property('value').equal(199.99)
        })
    })
    context('parse string', function() {
        it("should has value when parse full name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.STRING)
            option.parse("example", undefined, "omega cli js")
            chai.expect(option).to.have.property('value').equal("omega cli js")
        })
        it("should has value when parse short name flag", function () {
            let option = new omega_cli.Optional("example").setDataType(omega_cli.constants.data.STRING).setShortName("e")
            option.parse(undefined, "e", "omega cli js")
            chai.expect(option).to.have.property('value').equal("omega cli js")
        })
    })

})
