
const { createWorker } = require('tesseract.js')
const fs = require('fs')
const { getNombresYApellidosDeData } = require('../shared/functions')

const createTextFromImageReader = async () => {
    const worker = createWorker({
        logger: m => {
            let num = m.progress
            num = Number.parseFloat(num * 100).toFixed(2)
            console.log(num + '%')
        },
    });

    return {
        readTextFromImage: async (pathImage) => {
            try {

                if (!fs.existsSync(pathImage)) {
                    throw new Error('no existe ruta o archivo')
                }
                let nombres = ''
                let apellidos = ''

                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');

                const { data: { text } } = await worker.recognize(pathImage);
                /* const data = stringCut(text)
                apellidos = data[4]
                nombres = data[6] */
                await worker.terminate();
                //return { apellidos, nombres }
                return text

            } catch (error) {
                throw handleError(error)
            }

        },
        getNombresYApellidosDeData: async (text) => {
            return await getNombresYApellidosDeData(text)
        }
    }

}

function handleError(error) {
    if (error.message === 'no existe ruta o archivo') {
        return error
    }
    else {
        return new Error('algo salió mal')
    }
}
/* 
function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}
 */



module.exports = {
    createTextFromImageReader
}