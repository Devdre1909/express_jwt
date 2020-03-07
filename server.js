const server = require("./server/config/app")();
const config = require("./server/config/env/config");
const db = require("./server/config/db");

server.create(config, db);

server.start();