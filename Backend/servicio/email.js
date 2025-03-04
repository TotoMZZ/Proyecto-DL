import nodemailer from 'nodemailer'

export const enviarEmail = (contenido, cb) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'totoxm40@gmail.com',
                pass: 'pietajgnhneyrhrn'
            }
        })
    
        const mailOptions = {
            from: 'totoxm40@gmail.com',
            to: 'elpuffle@gmail.com',
            subject: 'Informacion de pago',
            html: contenido
        }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                reject(err)
            }
            resolve(info)
        })
    })
    
}