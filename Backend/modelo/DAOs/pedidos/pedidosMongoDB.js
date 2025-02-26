import CnxMongoDB from "../../DBMongo.js"

class ModelMongoDB {

    constructor() { }

    obtenerPedidos = async () => {
        if (!CnxMongoDB.connectionOK) throw new Error('DAO son conexion a MongoDB')

        const pedidos = await CnxMongoDB.db.collection('pedidos').find({}).toArray()
        return pedidos

    }

    guardarPedido = async pedido => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexion a MongoDB')

        await CnxMongoDB.db.collection('pedidos').insertOne(pedido)
        return pedido
    }
}

export default ModelMongoDB