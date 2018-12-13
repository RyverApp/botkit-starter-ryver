module.exports = function(controller) {

    controller.middleware.ingest.use(function(bot, message, res, next) {
    
        // do something...
        console.log('RAW:', message);
        next();
    
    });

    controller.middleware.receive.use(function(bot, message, next) {
    
        // do something...
        console.log('RCVD:', message);
        next();
    
    });
    
    
    controller.middleware.send.use(function(bot, message, next) {
    
        // do something...
        console.log('SEND:', message);
        next();
    
    });

}
