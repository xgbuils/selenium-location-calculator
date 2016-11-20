var chai = require('chai')
var expect = chai.expect
var assert = chai.assert

var parseRelativeOffset = require('../src/parse_relative_offset.js')

describe('parseRelativeOffset', function () {
    it('default relative offset is {x: 0.5, y: 0.5}', function () {
        return parseRelativeOffset().then(function (offset) {
            expect(offset).to.be.deep.equal({
                x: 0.5,
                y: 0.5
            })
        })
    })

    it('passing string "left" resolves to {x: 0, y: 0.5}', function () {
        return parseRelativeOffset('left').then(function (offset) {
            expect(offset).to.be.deep.equal({
                x: 0,
                y: 0.5
            })
        })
    })

    it('passing string "top" resolves to {x: 0.5, y: 1}', function () {
        return parseRelativeOffset('bottom').then(function (offset) {
            expect(offset).to.be.deep.equal({
                x: 0.5,
                y: 1
            })
        })
    })

    it('passing object {x: "right", y: "top"} resolves to {x: 1, y: 0}', function () {
        return parseRelativeOffset({
            x: 'right',
            y: 'top'
        }).then(function (offset) {
            expect(offset).to.be.deep.equal({
                x: 1,
                y: 0
            })
        })
    })

    it('passing object {x: 0.3, y: "top"} resolves to {x: 0.3, y: 0}', function () {
        return parseRelativeOffset({
            x: 0.3,
            y: 'top'
        }).then(function (offset) {
            expect(offset).to.be.deep.equal({
                x: 0.3,
                y: 0
            })
        })
    })

    it('passing object {x: "top", y: 0.1} rejects', function () {
        return parseRelativeOffset({
            x: 'top',
            y: 0.1
        }).then(function () {
            assert.fail('promise.fulfilled()', 'promise.rejected()', 'it must return rejected promise')
        }).catch(function (err) {
            expect(err.message).to.be.equal('Coordinate `x` with value "top" is not castable to number.')
        })
    })

    it('passing object {x: "left", y: "0.1abc"} rejects', function () {
        return parseRelativeOffset({
            x: 'left',
            y: '0.1abc'
        }).catch(function (err) {
            expect(err.message).to.be.equal('Coordinate `y` with value "0.1abc" is not castable to number.')
        })
    })
})