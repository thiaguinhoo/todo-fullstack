const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(compression());
application.use(helmet());
application.use(cors());
if (process.env.NODE_ENV == 'development') {
    application.use(require('morgan')('tiny'));
}

application.use('/todos', routes);

module.exports = application;
