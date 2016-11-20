var parseRelativeOffset = require('./parse_relative_offset.js');

function LocationCalculator (locator, relativeOffset) {
    this.locator = locator
    this.relativeOffset = relativeOffset
}

Object.defineProperties(LocationCalculator.prototype, {
    calculate: {
        value: function() {
            var locator = this.locator;
            return parseRelativeOffset(this.relativeOffset)
            .then(function(relativeOffset) {
                return calculateDimensions(locator)
                .then(function(dimensions) {
                    return {
                        x: dimensions.x + relativeOffset.x * dimensions.width,
                        y: dimensions.y + relativeOffset.y * dimensions.height
                    }
                })
            })
        }
    }
})

function calculateDimensions(locator) {
    return this.findElement(locator).then(function (element) {
        var functions = [
            'getLocation',
            'getSize'
        ]
        return _.reduce(functions, function(prom, fn) {
            prom.then(function(object) {
                return element[fn]()
                    .then(_.partial(_.extend(object)))
            });
        }, promise.fulfilled({}))
    })
}


