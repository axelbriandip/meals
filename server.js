// import dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { app } = require('./app');

// import utils
// initModels
const { db } = require('./utils/db.util');

const startServer = async () => {
    try {
        await db.authenticate()
        
        // initModels implement

        await db.sync();

        const PORT = 4000;
        
        app.listen(PORT, () => {
            console.log('¡Express running!');
        })

    } catch (error) {
        console.log(error);
    }
}

startServer();