import Servicio from '../servicio/upload.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerPedidos = async (req, res) => {
        try {
            const pedidos = await this.servicio.obtenerPedidos()
            res.json(pedidos)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    recibirArchivo = async (req,res) => {
        const file = req.file
       // console.log(file)
       const urlFotoFTP = await this.servicio.guardarArchivoFTP(file)
       
        res.json({ urlFoto: urlFotoFTP })
    }
}

export default Controlador
