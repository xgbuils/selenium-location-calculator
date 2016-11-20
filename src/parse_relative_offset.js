var _ = require('lodash')

var values = {
    top: {
        y: 0,
    },
    right: {
        x: 1
    },
    bottom: {
        y: 1
    },
    left: {
        x: 0,
    }
}

function parseRelativeOffset(param) {
    var config = {};
    var prom = _.isString(param)
        ? parseRelativeOffsetString(param)
        : parseRelativeOffsetObject(param);
    return prom.then(function(relativeOffset) {
        return _.defaults(relativeOffset, {
            x: 0.5,
            y: 0.5
        });
    });
}

function parseRelativeOffsetString (param) {
    var config = values[param]
    return Promise.resolve(_.pick(config, ['x', 'y']));
}


function parseRelativeOffsetObject (param) {
    return Promise.resolve().then(function() {
        param = _.pick(param, ['x', 'y']);
        return _.reduce(['x', 'y'], function (memo, prop) {
            var value = param[prop];
            var offsetObject = values[value]
            if (_.has(offsetObject, prop)) {
                memo[prop] = offsetObject[prop]
            } else if (!_.isNaN(+value)) {
                memo[prop] = +value;
            } else if (!_.isUndefined(value)) {
                throw new Error('Coordinate `' + prop + 
                    '` with value "' + value + '" is not castable to number.');
            }
            return memo;
        }, {});        
    })
}

module.exports = parseRelativeOffset;
