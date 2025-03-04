//const url = 'http://localhost:8080/api/upload/'
const url = process.env.NODE_ENV === 'production'
            ? '/api/upload/'                         // en producción
            : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/upload/`   // en desarrollo


const enviarFormDataAjax = (data, progress, urlFoto) => {
    let porcentaje = 0

    const xhr = new XMLHttpRequest()
    xhr.open('post', url)

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const rta = JSON.parse(xhr.response)
            ////console.log(rta)
            if (typeof urlFoto === 'function') urlFoto(rta.urlFoto)
        }
    })

    xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
            porcentaje = parseInt((e.loaded * 100) / e.total)
            if (typeof progress === 'function') progress(porcentaje)
        }
    })

    xhr.send(data)
}

/* ------------------------------- */
/*           Exportación           */
/* ------------------------------- */
const servicioUpload = {
    enviarFormDataAjax
}

export default servicioUpload