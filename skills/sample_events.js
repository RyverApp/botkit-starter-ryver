module.exports = function (controller) {

    controller.on('post_created', function(bot, message) {
        bot.reply(message, 'I\'m the first to comment on this new post!');
    });

    controller.on('task_completed', function(bot, message) {
        bot.reply(message, 'Yay! Another task completed!');
    });
};
