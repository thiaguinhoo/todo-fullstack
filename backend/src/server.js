require('dotenv').config();
const database = require('./database');
const { Server: ServerConfig } = require('./config');

process.on('uncaughtException', async (err) => {
    console.log(err.message);
    await database.disconnect();
    process.exit(1);
})

async function main() {
    await database.connect();
    await database.serializeModels();
    require('./application')
        .listen(
            ServerConfig.port,
            () => console.log(`Server running on *:${ServerConfig.port}`)
        );
}

main();
