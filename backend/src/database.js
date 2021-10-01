const path = require('path');
const sqlite = require('sqlite3');

let database;

const connect = async () => {
    const databaseFilename = path.resolve(
        __dirname, '../data.sqlite'
    );
    database = new sqlite.Database(databaseFilename, (err) => {
        if (err) return console.log(err.message);
        console.log('Connected in database with successfully');
    });
};

const disconnect = async () => {
    database.close();
}

const serializeModels = async () => {
    database.serialize(() => {
        database.run(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL
            )
        `);
    });
}

module.exports = { connect, disconnect, serializeModels };
