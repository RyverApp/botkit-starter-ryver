var path = require('path');
var fs = require('fs');

module.exports = function (controller) {
    let port = parseInt(process.env.PORT || '', 10);
    if (isNaN(port)) {
        port = 3000;
    }
    controller.setupWebserver(port, function (err, webserver) {
        if (err) {
            throw err;
        }
        // import all the pre-defined routes that are present in /components/routes
        var normalizedPath = path.join(__dirname, "routes");
            fs.readdirSync(normalizedPath).forEach(function (file) {
            if (file.endsWith('.js')) {
                require(path.join(normalizedPath, file))(webserver, controller);
            }
        });
    });
}