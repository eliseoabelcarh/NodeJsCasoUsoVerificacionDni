function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}

async function getNombresYApellidosDeData(text) {
    const data = stringCut(text)
    apellidos = data[4]
    nombres = data[6]
    return { apellidos, nombres }
}

async function compararStrings(a, b) {

    let data1 = a.toUpperCase()
    let data2 = b.toUpperCase()
    console.log('DATO1 : ', data1)
    console.log('DATO2 : ', data2)

    return data1 === data2
}

module.exports = {
    getNombresYApellidosDeData,
    compararStrings
}
