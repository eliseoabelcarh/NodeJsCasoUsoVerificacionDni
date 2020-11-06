
const { compararStrings } = require('../../src/shared/functions')
const assert = require('assert')


describe('envio 4 textos iguales', async () => {

    const a = 'mxk'
    const b = 'ooo'
    const x = 'MxK'
    const y = 'OoO'

    it('devuelve true', async () => {
        const esperado = true
        const respuesta = await compararStrings(a, x) && await compararStrings(b, y)
        assert.deepStrictEqual(respuesta, esperado)
    })
})