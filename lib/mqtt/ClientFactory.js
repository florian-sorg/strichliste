var once = require('once');
var mqtt = require('mqtt');

function MqttClientFactory () {
}

MqttClientFactory.prototype.createClient = function (config, callback) {
    callback = once(callback);

    setTimeout(function () {
        callback(new Error('Connect to MQTT broker ' + config.host + ':' + config.port + ' timed out'), null);
    }, 30 * 1000);

    var client = mqtt.connect(null, {
        servers: [
            {
                host: config.host,
                port: config.port
            }
        ],
        username: config.username || undefined,
        password: config.password || undefined
    }).once('connect', function () {
        callback(null, client);
    });
};

module.exports = MqttClientFactory;