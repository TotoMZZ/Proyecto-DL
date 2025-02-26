import { MongoClient } from 'mongodb';
import config from '../config.js';


class CnxMongoDB {
    static connectionOK = false

    static db = null


    static conectar = async () => {
        try {
            console.log('Conectando a la base de datos...')
            const client = new MongoClient(config.STRCNX);
            await client.connect();
            console.log('[OK] base de datos conectada!')

            CnxMongoDB.connectionOK = true

            CnxMongoDB.db = client.db(config.BASE)
        }
        catch (error) {
            console.log(`[ERROR] Erro en conexion de base de datos: ${error.message}`)
        }
        /* const collection = db.collection('documents'); */
    }
}


export default CnxMongoDB