var debug = require('debug')('botkit:ryver:incoming_webhooks');

module.exports = function (webserver, controller) {
    
    debug('Configured POST /ryver/receive url for receiving events');
    controller.createWebhookEndpoint(webserver, '/ryver/receive');
}
