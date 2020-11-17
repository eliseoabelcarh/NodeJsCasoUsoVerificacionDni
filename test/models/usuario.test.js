
const assert = require('assert')
const { crearModeloUsuario, tieneNombre } = require('../../src/models/usuario')



describe('TEST PARA USUARIO.JS - MODELO DE USUARIO', () => {

    describe('agrego usuario nuevo a base datos vacía', () => {
        it('devuelve esperado', () => {
            const nombreUsuarioEsperado = 'Abel'
            const apellidoUsuarioEsperado = 'Carh'
            let idExistenciaEsperada = false

            const datos = {
                nombres: nombreUsuarioEsperado,
                apellidos: apellidoUsuarioEsperado,
                email: apellidoUsuarioEsperado
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


    describe('comparo si nombres guardados en bd son iguales a enviados', () => {
        it('devuelve esperado true', () => {

            const nombreUsuarioEsperado = 'Eliseo Abel'
            const apellidoUsuarioEsperado = 'Carh Vil'

            const datos = {
                nombres: 'Eliseo Abel',
                apellidos: 'Carh Vil',
                email: 'some@some.com'
            }
            const usuario = crearModeloUsuario(datos)
            const rspta = tieneNombre(usuario, { nombres: nombreUsuarioEsperado, apellidos: apellidoUsuarioEsperado })
            assert.deepStrictEqual(rspta, true)

        })
    })



})



