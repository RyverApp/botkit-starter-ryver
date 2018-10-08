/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
This is a sample Ryver bot built with Botkit.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require('node-env-file');
env(__dirname + '/.env');

if (!process.env.bot_token) {
    console.log('Error: Specify a Ryver bot_token in environment.');
    process.exit(1);
}

if (!process.env.api_root) {
    console.log('Error: Specify a Ryver api_root in environment.');
    process.exit(1);
}

if (!process.env.webhook_secret) {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Webhook signature validation has not been enabled');
    console.log('To enable, pass in a webhook_secret parameter as specified when configuring the webhook in Ryver');
}

var Botkit = require('botkit');
var debug = require('debug')('botkit:ryver:main');

// Create the Botkit controller, which controls all instances of the bot.
var controller = require('botkit-ryver-connector')(Botkit, {
    debug: true,
    api_root: process.env.api_root,
    bot_token: process.env.bot_token,
    webhook_secret: process.env.webhook_secret,
    studio_token: process.env.studio_token,
    studio_command_uri: process.env.studio_command_uri,
});

// Set up an Express-powered webserver to expose the webhook endpoint
require(__dirname + '/components/express_webserver.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("./skills/" + file)(controller);
});

// enable advanced botkit studio metrics
require('botkit-studio-metrics')(controller);

// This captures and evaluates any message sent to the bot as a DM
// and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
if (controller.config.studio_token) {
    controller.on('direct_message', function (bot, message) {
        if (message.text) {
            controller.studio.runTrigger(bot, message.text, message.user, message.channel, message).then(function (convo) {
                if (!convo) {
                    // no trigger was matched
                    // If you want your bot to respond to every message,
                    // define a 'fallback' script in Botkit Studio
                    // and uncomment the line below.
                    controller.studio.run(bot, 'fallback', message.user, message.channel, message);
                } else {
                    // set variables here that are needed for EVERY script
                    // use controller.studio.before('script') to set variables specific to a script
                    convo.setVar('current_time', new Date());
                }
            }).catch(function (err) {
                if (err) {
                    bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
                    debug('Botkit Studio: ', err);
                }
            });
        }
    });
} else {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Botkit Studio functionality has not been enabled');
    console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/');
}