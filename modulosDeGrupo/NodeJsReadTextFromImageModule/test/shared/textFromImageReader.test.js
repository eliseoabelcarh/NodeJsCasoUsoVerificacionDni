

const assert = require('assert')
const { createTextFromImageReader } = require('../../src/shared/textFromImageReader')
const { getNombresYApellidosDeData } = require('../../src/shared/functions')





describe('envio FOTO de Dni2', async () => {
    it('recibo nombres y apellidos esperados', async () => {
        const lector = await createTextFromImageReader()
        const pathFotoDni = './test/assets/ejemploDni2.jpg'

        const text = await lector.readTextFromImage(pathFotoDni)
        const { apellidos, nombres } = await getNombresYApellidosDeData(text)
        const apellidosEsperado = 'ANDERSON'
        const nombresEsperado = 'JAMIE FALKLAND'

        assert.deepStrictEqual(nombresEsperado, nombres)
        assert.deepStrictEqual(apellidosEsperado, apellidos)

    })
})

describe('envio FOTO de Dni3', async () => {
    it('recibo nombres y apellidos esperados', async () => {
        const lector = await createTextFromImageReader()
        const pathFotoDni = './test/assets/ejemploDni3.jpg'

        const text = await lector.readTextFromImage(pathFotoDni)
        const { apellidos, nombres } = await getNombresYApellidosDeData(text)
        const apellidosEsperado = 'ARROYO MUNOZ'
        const nombresEsperado = 'JUAN CARLOS'
        assert.deepStrictEqual(nombresEsperado, nombres)
        assert.deepStrictEqual(apellidosEsperado, apellidos)

    })
})


describe('envio FOTO de Dni4', async () => {
    it('recibo nombres y apellidos esperados', async () => {
        const lector = await createTextFromImageReader()
        const pathFotoDni = './test/assets/ejemploDni4.jpg'

        const text = await lector.readTextFromImage(pathFotoDni)
        const { apellidos, nombres } = await getNombresYApellidosDeData(text)
        const apellidosEsperado = 'GORZETTI'
        const nombresEsperado = 'FRANCISCA'
        assert.deepStrictEqual(nombresEsperado, nombres)
        assert.deepStrictEqual(apellidosEsperado, apellidos)

    })
})





describe('le paso una ruta que no existe a lectorDni111', async () => {

    const rutaQueNoExiste = 'algo'

    it('lanza error', async () => {
        await assert.rejects(async () => {
            const lector = await createTextFromImageReader()
            await lector.readTextFromImage({ imagenDniFrontal: rutaQueNoExiste })
        }, (error) => {
            const esperado = 'no existe ruta o archivo'
            assert.deepStrictEqual(esperado, error.message)
            return true
        })
    })
})

