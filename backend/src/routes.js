const { Router } = require('express');
const cache = require('./utils/cache');

const router = Router();

const database = global.database;

router.route('/')
    .get(async (request, response) => {
        const accessKey = '__express__' + request.url || request.originalUrl;
        const cached = cache.get(accessKey);
        if (cached == undefined) {
            database.all('SELECT * FROM todos', [], (err, rows) => {
                cache.set(accessKey, rows);
                response.json(rows);   
            });
        } else {
            response.json(cached);
        }        
    })

module.exports = router;
