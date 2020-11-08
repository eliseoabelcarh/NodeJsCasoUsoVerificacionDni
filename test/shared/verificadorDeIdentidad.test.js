
const assert = require('assert')
const { crearDaoUsuarios } = require('../../src/dao/daoFactory')
const { crearVerificadorDeIdentidad } = require('../../src/shared/verificadorDeIdentidad')
const { createTextFromImageReader } = require('../../modulosDeGrupo/NodeJsReadTextFromImageModule/src/shared/textFromImageReader')
const { crearEmailSender } = require('../../modulosDeGrupo/NodeJsEmailSenderModule/index')
require('dotenv').config()



let daoUsuarios
const config = {
    user: process.env.GMAIL_FOR_NODEMAILER_USER,
    pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
    service: 'nodemailer'
}

before(async () => {
    daoUsuarios = await crearDaoUsuarios('memoria')


})

afterEach(async () => {
    await daoUsuarios.cleanAll()
})


describe('envío userId que no existe', async () => {

    const idQueNoExiste = 'mxk'

    it('lanza error', async () => {
        await assert.rejects(async () => {

            const emailSender = await crearEmailSender(config)
            const lectorDni = await createTextFromImageReader()
            const verificador = await crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender)
            await verificador.validarInfoEnDbConFotoDni({ userId: idQueNoExiste })
        }, (error) => {
            const recurso = 'usuario'
            const esperado = `no se encontró '${recurso}' con id: ${idQueNoExiste}`
            assert.deepStrictEqual(esperado, error.message)
            return true
        })
    })
})



describe('valido nombres y apellidos con foto del dni', async () => {
    it('devuelve true si coinciden', async () => {
        const emailSender = await crearEmailSender(config)
        const lectorDni = await createTextFromImageReader()
        const verificador = await crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender)
        const nombres = 'JAMIE FALKLAND'
        const apellidos = 'ANDERSON'
        const email = 'eliseoabelcarh@gmail.com'
        const usuario = await daoUsuarios.addUser({ nombres, apellidos, email })
        const userId = usuario.id
        const pathFotoDni = './test/assets/ejemploDni2.jpg'
        const respuesta = await verificador.validarInfoEnDbConFotoDni({ userId, imagenDniFrontal: pathFotoDni })
        assert.deepStrictEqual(respuesta, true)
    })
})


describe('valido nombres y apellidos con foto del dni', async () => {
    it('devuelve true si coinciden', async () => {
        const emailSender = await crearEmailSender(config)
        const lectorDni = await createTextFromImageReader()
        const verificador = await crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender)
        const nombres = 'FRANCISCA'
        const apellidos = 'GORZETTI'
        const email = 'eliseoabelcarh1@gmail.com'
        const usuario = await daoUsuarios.addUser({ nombres, apellidos, email })
        const userId = usuario.id
        const pathFotoDni = './test/assets/ejemploDni4.jpg'
        const respuesta = await verificador.validarInfoEnDbConFotoDni({ userId, imagenDniFrontal: pathFotoDni })
        assert.deepStrictEqual(respuesta, true)
    })
})
