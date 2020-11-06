
const assert = require('assert')
const { crearModeloUsuario } = require('../../src/models/usuario')



describe('agrego usuario nuevo a base datos vacía', () => {
    it('devuelve esperado', () => {
        const nombreUsuarioEsperado = 'Abel'
        const apellidoUsuarioEsperado = 'Carh'
        let idExistenciaEsperada = false

        const datos = {
            nombres: nombreUsuarioEsperado,
            apellidos: apellidoUsuarioEsperado
        }
        const userRecibido = crearModeloUsuario(datos)
        assert.deepStrictEqual(userRecibido.nombres, nombreUsuarioEsperado)
        assert.deepStrictEqual(userRecibido.apellidos, apellidoUsuarioEsperado)
        if (userRecibido.id) {
            console.log('id del usuario creado: ' + userRecibido.id)
            idExistenciaEsperada = true
        }
        assert.deepStrictEqual(idExistenciaEsperada, true)


    })
})

describe('agrego campo email a usuario nuevo', () => {
    it('devuelve esperado', () => {
        const nombreUsuarioEsperado = 'Abel'
        const apellidoUsuarioEsperado = 'Carh'
        const emailEsperado = 'algo@gmail.com'
        let idExistenciaEsperada = false

        const datos = {
            nombres: nombreUsuarioEsperado,
            apellidos: apellidoUsuarioEsperado,
            email: emailEsperado
        }
        const userRecibido = crearModeloUsuario(datos)
        assert.deepStrictEqual(userRecibido.email, emailEsperado)
        if (userRecibido.id) {
            console.log('id del usuario creado: ' + userRecibido.id)
            console.log('email del usuario creado: ' + userRecibido.email)
            idExistenciaEsperada = true
        }
        assert.deepStrictEqual(idExistenciaEsperada, true)

    })
})



