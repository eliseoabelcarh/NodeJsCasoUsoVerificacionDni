
const assert = require('assert')
const { crearDaoUsuariosMemoria } = require('../../src/dao/daoUsuariosMemoria')


describe('elimino datos ', async () => {

    it('devuelve array vacío', async () => {
        const dao = await crearDaoUsuariosMemoria()
        const datos = {
            nombres: 'algunNombre',
            apellidos: 'algunApellido'
        }
        dao.addUser(datos)
        let array = await dao.cleanAll()
        assert.deepStrictEqual(array.length, 0)
    })
})
