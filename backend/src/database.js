const sqlite = require('sqlite3');

const { Database: DatabaseConfig } = require('./config');

const connect = async () => {
    global.database = new sqlite.Database(DatabaseConfig.filename, (err) => {
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
