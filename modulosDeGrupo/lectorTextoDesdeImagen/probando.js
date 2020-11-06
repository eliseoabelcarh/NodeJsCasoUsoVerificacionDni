
const { createWorker } = require('tesseract.js')

const crearTextFromImageReader = async () => {


    const worker = createWorker({
        logger: m => console.log(m),
        /*       cacheMethod: 'readOnly',
              gzip: false, */

    });

    return {
        execute: async (pathImage) => {

            let nombres = ''
            let apellidos = ''

            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');

            const { data: { text } } = await worker.recognize(pathImage);

            stringCut = function (str) {
                var nstr = str.split(/\n/);
                return nstr.slice(0, 10);
            }
            console.log(text);
            const data = stringCut(text)
            nombres = data[4]
            apellidos = data[6]
            console.log(data[4], data[6])
            await worker.terminate();
            return { nombres, apellidos }


        }
    }


}


async function main() {

    const lector = await crearTextFromImageReader()
    const { nombres, apellidos } = await lector.execute('ejemplo.jpg')

    console.log('resultadooo: ' + nombres + ' -- ' + apellidos)

}
main()

module.exports = {
    crearTextFromImageReader
}