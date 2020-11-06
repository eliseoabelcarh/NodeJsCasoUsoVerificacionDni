
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
let lastId = 0

const crearModeloUsuario = (datos) => {
    let usuario = {}
    if (!datos) {
        throw crearErrorArgumentosInvalidos('datos')
    }
    if (!datos.nombres) {
        throw crearErrorArgumentosInvalidos('nombres')
    }
    else {
        usuario.nombres = datos.nombres
    }
    if (!datos.apellidos) {
        throw crearErrorArgumentosInvalidos('apellidos')
    }
    else {
        usuario.apellidos = datos.apellidos
    }


    const idCreado = lastId + 1
    usuario.id = idCreado
    return { ...datos, ...usuario }
}



module.exports = {
    crearModeloUsuario
}