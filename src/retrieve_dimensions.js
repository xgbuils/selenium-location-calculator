function retrieveDimensions(locator) {
    return this.findElement(locator).then(function (element) {
        var functions = [
            'getLocation',
            'getSize'
        ];
        return _.reduce(functions, function(prom, fn) {
            prom.then(function(object) {
                return element[fn]()
                    .then(_.partial(_.extend(object)));
            });
        }, promise.fulfilled({}));
    });
}

module.exports = retrieveDimensions