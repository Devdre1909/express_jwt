const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const chalk = require('chalk');

module.exports = () => {
    let server = express(), create, start;

    create = (config, db) => {

        let routes = require('../routes')

        // set all the server things
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // add middleware to parse the json
        server.use(bodyParser.json());
        server.use(expressValidator());
        server.use(bodyParser.urlencoded({
            extended: true
        }))

        //connect to db
        mongoose.connect(
            db.database,
            {
                useNewUrlParser: true,
                useCreateIndex: true
            }
        )

        //set up routes 
        routes.init(server);

    }

    start = () => {
        let hostname = server.get('hostname');
        let post = server.get('post');
        server.listen(port, () => {
            console.log(chalk.green.bold(`Express server listening on - https://${hostname}:${port}`))
        });
    }

    return {
        create: create,
        start: start
    }

}