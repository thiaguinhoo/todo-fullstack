const path = require('path');

module.exports = {
    Server: {
        port: process.env.SERVER_PORT || 3334
    },
    Database: {
        filename: path.resolve(__dirname, '../../data.sqlite')
    }
}
