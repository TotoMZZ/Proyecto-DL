import './ObtenerFoto.css'
import servicioUpload from '../../servicios/upload.js'
import { useState } from 'react'

export function ObtenerFoto(props) {
    const { escribirCampoFoto } = props

    const [porcentaje, setPorcentaje] = useState(0)
    const [urlFoto, setUrlFoto] = useState('')


    const dragEnter = e => {
        //console.log('dragEnter')
        e.preventDefault()
    }
    const dragLeave = e => {
        //console.log('dragLeave')
        e.preventDefault()
    }
    const dragOver = e => {
        //console.log('dragOver')
        e.preventDefault()
    }
    const drop = e => {
        //console.log('drop')
        e.preventDefault()

        const archivo = e.dataTransfer.files[0]
        enviarFoto(archivo)
    }

    const enviarFoto = archivo => {
        //console.log(archivo)

        if (archivo.type.includes('image')) {
            const data = new FormData()
            data.append('archivo', archivo)
            servicioUpload.enviarFormDataAjax(data, porcentaje => {
                setPorcentaje(porcentaje)
            }, urlFoto => {
                //console.log(urlFoto)
                escribirCampoFoto(urlFoto)
                setUrlFoto(urlFoto)
            })
        }
        else {
            console.error('El archivo no es una imagen')
        }
    }

    const change = e => {
        const archivo = e.target.files[0]
        //console.log(archivo)
        enviarFoto(archivo)
    }

    return (
        <div className="ObtenerFoto">
            <input type="file" id="archivo" onChange={change} />
            
            <div
                id="drop"
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDragOver={dragOver}
                onDrop={drop}
            >
                <div className="foto">
                    <label htmlFor="archivo">D&D or Click</label>
                    
                </div>
                {urlFoto && <img src={urlFoto} alt="" />}
                
                


            </div>
            {porcentaje > 0 && <><progress min="0" max="100" value={porcentaje}></progress> <span className='info'>{porcentaje}%</span></>}
        </div>
    )
}