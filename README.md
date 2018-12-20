Botkit Starter Kit for Ryver Bots
===================

This repo contains everything you need to get started building a Ryver bot with [botkit](https://botkit.ai) and the [botkit-ryver-connector](https://github.com/RyverApp/botkit-ryver-connector).

# Components:

With the use of `botkit-ryver-connector` there are only a few parts in this project to have a functioning bot. 

- Configuration
- Simple web-server with one end-point
- Bot skills/functionality

# Prequisites:

* [nodejs](https://nodejs.org)
* [npm](https://www.npmjs.com)

# Set-up

Once you've cloned this repository, there are just a few steps to get a running bot.

## Install dependencies
Run:
```
npm install
```

## Set up your Ryver custom-integration

You will need to set-up a Ryver *custom-integration*, which can be found in the *Integrations* dialog from the menu within your Ryver organization. If you'd like your Ryver users to interact with your botkit bot via *direct-messages* then you should ensure that the *interactive* option is enabled.

As part of this *custom-integration* you'll also need to create an outbound webhook. The url should point to the web-server end-point that will be exposed by this project. E.g. `https://{hosted-domain}.com/ryver/receive`. If you wish to change the url path you can modify this in the `incoming_webhook.js` source file. By default this project will host on port 3000 but this can be changed from within `.env`. It is highly recommended that you host your project with TLS/SSL.  
Depending on how you'd like your users to interact with your bot, you will need to choose one or more of the following webhook events for the bot to listen to.
- `chat_created` - for DMs and Team/Forum chats
- `postcomment_created` - for post comments
- `taskcomment_created` - for task comments

## Edit your configuration

There are 3 main bits of configuration that will enable your bot to securely interact with Ryver.

### `api_root`

This will be the base url for your Ryver organization. 
E.g. `https://{your-org}.ryver.com/`

### `bot_token`

In the `custom-ingegration` that was created in Ryver, you'll need to create a token. This token provides access to the API which the `botkit-ryver-connector` uses to respond to chat. This raw token string is only ever shown once so make sure you copy it into the project configuration immediately.

### `webhook_secret`

As there is no authentication between the Ryver webhook service and your bot end-point, we add a signature to all webhook requests so that you can verify that these came from Ryver and not a potentially malicious actor. The webhook secret can be found with the *Outbound Webhook* that you created for this bot within Ryver.

## Aditional notes

Ryver will only send webhooks for teams/forums that the *custom-integration* is a member of, so make sure you add the integration to all teams/forums you would like your bot to be able to 'hear' and respond to.

