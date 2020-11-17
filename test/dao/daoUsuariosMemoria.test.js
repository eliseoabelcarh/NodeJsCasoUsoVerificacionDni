
const assert = require('assert')
const { crearDaoUsuariosMemoria } = require('../../src/dao/daoUsuariosMemoria')




describe('TESTS PARA DAO MEMORIA USUARIO  ', async () => {


    describe('elimino datos ', async () => {

        it('devuelve array vacío', async () => {
            const dao = await crearDaoUsuariosMemoria()
            const datos = {
                nombres: 'algunNombre',
                apellidos: 'algunApellido',
                email: 'esperado@gmail.com',
            }
            await dao.addUser(datos)
            let array = await dao.cleanAll()
            assert.deepStrictEqual(array.length, 0)
        })
    })



})
