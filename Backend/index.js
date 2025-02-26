import config from "./config.js";
import CnxMongoDB from "./modelo/DBMongo.js";
import Server from "./server.js";

if (config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}

new Server().start()