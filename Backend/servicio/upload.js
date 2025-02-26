import config from "../config.js"

import { Client } from "basic-ftp"

class Servicio {
    guardarArchivoFTP = async file => {
        const urlFotoFTP = await this.subirArchivoFTP(file)
        return urlFotoFTP
    }

    subirArchivoFTP = async file => {
        //await new Promise(r => setTimeout(r, 2000))
        //return `http://localhost:${config.PORT}/uploads/${file.filename}`

        const client = new Client()
        client.ftp.verbose = false

        try {
            await client.access({
                host: config.FTP_HOST,
                user: config.FTP_USER,
                password: config.FTP_PASS,
                secure: false
            })
            console.log(await client.list())
            await client.uploadFrom("README.md", "README_FTP.md")
            await client.downloadTo("README_COPY.md", "README_FTP.md")
        }
        catch (err) {
            console.log(err)
        }
        client.close()
    }
}

export default Servicio