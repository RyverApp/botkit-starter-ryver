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

// Create the Botkit controller, which controls all instances of the bot.
var controller = require('botkit-ryver-connector')(Botkit, {
    //debug: true,
    api_root: process.env.api_root,
    bot_token: process.env.bot_token,
    webhook_secret: process.env.webhook_secret,
    stats_optout: true,
});

// Set up an Express-powered webserver to expose the webhook endpoint
require(__dirname + '/components/express_webserver.js')(controller);

var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    require("./skills/" + file)(controller);
});