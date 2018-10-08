var debug = require('debug')('botkit:ryver:incoming_webhooks');

module.exports = function (webserver, controller) {

    debug('Configured POST /ryver/receive url for receiving events');
    webserver.post('/ryver/receive', function (req, res) {
        res.status(200);

        // Pass the webhook into be processed
        controller.handleWebhookPayload(req, res);
    });
}
