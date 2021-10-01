const path = require('path');
const sqlite = require('sqlite3');

const connect = async () => {
    const databaseFilename = path.resolve(
        __dirname, '../data.sqlite'
    );
    global.database = new sqlite.Database(databaseFilename, (err) => {
        if (err) return console.log(err.message);
        console.log('Connected in database with successfully');
    });
};

const disconnect = async () => {
    global.database.close();
}

const serializeModels = async () => {
    global.database.serialize(() => {
        database.run(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL
            )
        `);
    });
}

module.exports = { connect, disconnect, serializeModels };
