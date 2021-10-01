require('dotenv').config();
const database = require('./database');

const serverPort = process.env.SERVER_PORT || 3333;

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
            serverPort,
            () => console.log(`Server running on *:${serverPort}`)
        );
}

main();
