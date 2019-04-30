module.exports = function (controller) {

    // immediate command responses are ephemeral by default

    controller.hears('^/test immediate', 'command', function (bot, message) {        
        bot.replyImmediate(message, 'Quick response');
    });

    controller.hears('^/test', 'command', function (bot, message) {
        // for the best user-experience, showing an immediate response will acknowledge that the command has been received successfully
        // not calling bot.respondImmediately() will cause a timeout on the Ryver side.
        bot.replyImmediate(message, 'Processing your command now...');

        // some longer running process could occur here, such as making http requests.
        let ts = Date.now();
        setTimeout(function () {
            bot.reply(message, { text: 'The process you requested was run taking ' + (Date.now()- ts) + ' ms.', ephemeral: false });
        }, 3000);
    });
};
