const { Router } = require('express');
const { body, validationResult } = require('express-validator');
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
    .post(body('title').isLength({ min: 3 }), async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({ errors: errors.array() });
        }
        const { title } = request.body;
        database.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
            if (err) throw err;
            response
                .status(201)
                .json({ id: this.lastID, title })
        } )
    })

router.route('/:id')
    .get(async (request, response) => {
        const accessKey = '__express__' + request.url || request.originalUrl;
        const cached = cache.get(accessKey);
        if (cached == undefined) {
            const { id } = request.params;
            database.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
                if (err) throw err;
                if (row) {
                    cache.set(accessKey, row);
                    response.json({ ...row });
                }
            })
        } else {
            response.json(cached);
        }
    })

module.exports = router;
