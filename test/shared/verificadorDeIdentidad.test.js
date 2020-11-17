
const assert = require('assert')
const { crearDaoUsuarios } = require('../../src/dao/daoFactory')
const { crearVerificadorDeIdentidad } = require('../../src/shared/verificadorDeIdentidad')
const { createTextFromImageReader } = require('../../modulosDeGrupo/NodeJsReadTextFromImageModule/src/shared/textFromImageReader')
const { crearEmailSender } = require('../../modulosDeGrupo/NodeJsEmailSenderModule/index')
require('dotenv').config()




describe.only(' TEST PARA FUNCTION CREAR-VERIFICADOR-DE-IDENTIDAD()', async () => {


    let daoUsuarios
    let emailSender
    let lectorDni
    let verificador

    const config = {
        user: process.env.GMAIL_FOR_NODEMAILER_USER,
        pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
        service: 'nodemailer'
    }


    const usuario1 = {
        nombres: 'JAMIE FALKLAND',
        apellidos: 'ANDERSON',
        email: 'eliseoabelcarh1@gmail.com',
        pathDniFront: './test/assets/ejemploDni2.jpg'
    }
    const usuario2 = {
        nombres: 'FRANCISCA',
        apellidos: 'GORZETTI',
        email: 'eliseoabelcarh1@gmail.com',
        pathDniFront: './test/assets/ejemploDni4.jpg'
    }

    before(async () => {
        daoUsuarios = await crearDaoUsuarios('memoria')
        emailSender = await crearEmailSender(config)
        lectorDni = await createTextFromImageReader()
        verificador = await crearVerificadorDeIdentidad(daoUsuarios, lectorDni, emailSender)
    })

    afterEach(async () => {
        await daoUsuarios.cleanAll()
    })


    describe('envío userId que no existe', async () => {

        const idQueNoExiste = 'mxk'

        it('lanza error', async () => {
            await assert.rejects(async () => {
                await verificador.validarInfoEnDbConFotoDni({ userId: idQueNoExiste })
            }, (error) => {
                const recurso = 'usuario'
                const esperado = `no se encontró '${recurso}' con id: ${idQueNoExiste}`
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
        })
    })




    describe('valido usuario1 con foto del dni', async () => {
        it('devuelve true si coinciden', async () => {
            const usuario = await daoUsuarios.addUser(usuario1)
            const userId = usuario.id
            const respuesta = await verificador.validarInfoEnDbConFotoDni({ userId })
            assert.deepStrictEqual(respuesta, true)
        })
    })


    describe('valido usuario2 con foto del dni', async () => {
        it('devuelve true si coinciden', async () => {
            const usuario = await daoUsuarios.addUser(usuario2)
            const userId = usuario.id
            const respuesta = await verificador.validarInfoEnDbConFotoDni({ userId })
            assert.deepStrictEqual(respuesta, true)
        })
    })
})
