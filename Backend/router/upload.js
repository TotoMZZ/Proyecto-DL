import express from 'express'

import Controlador from '../controlador/upload.js'

import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})
  
const upload = multer({ storage: storage })


class Router {
    constructor(){
        this.controlador = new Controlador()
    }

    config() {
        const router = express.Router()

        router.post('/', upload.single("archivo"), this.controlador.recibirArchivo)

        return router
    }
}


export default Router