const { compararStrings } = require('../../src/shared/functions')


async function crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender) {


    async function getNombresApellidosDeFotoDni(pathImagenDniFrontal) {
        const text = await lectorDni.readTextFromImage(pathImagenDniFrontal)
        const { apellidos, nombres } = await lectorDni.getNombresYApellidosDeData(text)
        return { apellidos, nombres }
    }


    return {

        validarInfoEnDbConFotoDni: async ({ userId, imagenDniFrontal }) => {

            const infoUser = await daoUsuarios.getUserById(userId)
            const { apellidos, nombres } = await getNombresApellidosDeFotoDni(imagenDniFrontal)
            const nombresCoinciden = await compararStrings(infoUser.nombres, nombres)
            const apellidosCoinciden = await compararStrings(infoUser.apellidos, apellidos)
            if (nombresCoinciden && apellidosCoinciden) {
                const mail = {
                    //from: emailSender.getEmailSender,//opcional ya no se necesita
                    to: infoUser.email,
                    subject: `Hola ${infoUser.nombres}, tu Dni ha sido veriicado!!`,
                    text: 'Nombres coinciden con la foto de tu Dni!',
                    attachments: [imagenDniFrontal]//TODO agregar watermark
                }
                const recibido = await emailSender.sendEmail(mail)
                console.log('enviado:' + recibido)
            }
            return nombresCoinciden && apellidosCoinciden
        }


    }


}
//CONSULTAS PARA PROFE
// sqlite memory???
// async refactors evito código repetido en tests
// los require de modulos propios como enterarse
// punto de entrada a  los módulos --index.js??


module.exports = {
    crearVerificadorDeIdentidad
}