const { Router } = require('express');

const router = Router();

const database = global.database;

router.route('/')
    .get(async (request, response) => {
        database.all('SELECT * FROM todos', (err, rows) => {
            response.json({ ...rows });
        })
    })

module.exports = router;
