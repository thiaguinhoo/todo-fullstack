const NodeCache = require('node-cache');

module.exports = new NodeCache({ stdTTL: 3600 });
