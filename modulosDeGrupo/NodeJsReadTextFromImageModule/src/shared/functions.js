function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}
function fix1(data) {
    return data.split(' ').filter(strin => {
        return strin.trim().length > 1
    })
}
function fix2(array) {
    let arrayAntesDeUnir = array.filter(palabra => {
        palabra = palabra.trim()
        if (palabra.length > 1) {
            return palabra
        }
    })
    let dato = ''
    arrayAntesDeUnir.forEach(element => {
        dato += (element + ' ')
    });
    dato = dato.trim()
    return dato
}

async function getNombresYApellidosDeData(text) {
    const data = stringCut(text)
    let apellidos = data[4]
    let nombres = data[6]

    let array1 = fix1(apellidos)
    let array2 = fix1(nombres)

    console.log('111111-------')
    console.log(array1)
    console.log(array2)
    console.log('111111---------')

    apellidos = fix2(array1)
    nombres = fix2(array2)


    console.log('222-------')
    console.log(apellidos)
    console.log(nombres)
    console.log('2222---------')

    //TODO remplazar Ñ por N
    apellidos = apellidos.toUpperCase().trim()
    nombres = nombres.toUpperCase().trim()

    console.log('sososos', { apellidos, nombres })
    return { apellidos, nombres }
}


module.exports = {
    getNombresYApellidosDeData
}
