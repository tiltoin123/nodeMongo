import { connect, disconect } from './services/mongoClient';
import { csvLoader } from './services/csvMongo/csvLoader';
import path from "path";
import { splitCsv } from './services/csvMongo/splitCsv';
import { listFiles } from './services/csvMongo/listFiles';
import { empHeaders, estabHeaders, municipioHeaders } from './services/csvMongo/headers';
import { fixEncoding } from './services/fixEncoding';
import { buscarEndereco } from './services/osm/buscarEndereco';
import { exit } from 'process';
import { compareAndModifyCsv } from './services/csvMongo/modifyPairValues';
async function main() {
    const mongo = await connect();

    const dbName = 'base_cnpj';
    // const collectionName = 'empresas';
    const collectionName = 'estabelecimentos';
    // const collectionName = 'municipios'
    // let csvPath = 'C:/Users/ISouza/Desktop/empresas/municipios/fixed/'

    let csvPath = 'C:/Users/ISouza/Desktop/empresas/estabelecimentos/'
    // let csvPath = 'C:/Users/ISouza/Desktop/empresas/emp/'
    // let outputPath = 'C:/Users/ISouza/Desktop/empresas/emp/split_files/'
    // let outputPath = 'C:/Users/ISouza/Desktop/empresas/municipios/fixed/split_files/'
    let outputPath = 'C:/Users/ISouza/Desktop/empresas/estabelecimentos/split_files/'
    let csvToSplit = await listFiles(outputPath)
    // console.log(csvToSplit)
    // for (let i = 0; i < csvToSplit.length; i++) {
    //     let currentFile = csvPath + csvToSplit[i]
    //     await splitCsv(currentFile, outputPath, estabHeaders, 50000);
    // }
    // console.log("acabou, arquivos alterados:", csvToSplit.length)

    // let end = ['Rua Ernesto Silvio 1130,Franca,SP, Brasil', 'Rua  Maj. Mendonça 1659,Franca,SP,Brasil', 'Avenida Alonso y Alonso 500,Franca,SP,Brasil']
    // for (let i = 0; i < end.length; i++) {
    //     console.log(await buscarEndereco(end[i]))
    // }

    // for (let i = 0; i < csvToSplit.length; i++) {
    //     let currentFile = outputPath + csvToSplit[i]
    //     currentFile = currentFile.toString()

    //     await compareAndModifyCsv(
    //         currentFile,       // O CSV com os dados originais
    //         'codTom',                // Coluna alvo para comparação no arquivoAlvo
    //         'C:/Users/ISouza/Desktop/empresas/municipios/fixed/split_files/municipios1.csv',     // O CSV com os valores a serem comparados
    //         'tom',                   // Coluna de comparação no arquivoValores
    //         'nomeTom',               // Coluna que será adicionada
    //         'municipio'              // Nova coluna no arquivo de destino
    //     );
    // }
    let f = await listFiles(outputPath + '/mod')
    // for (let i = 0; i < f.length; i++) {
    //     await fixEncoding(outputPath + '/mod/' + f[i], outputPath + '/mod/' + f[i])
    //     console.log('fixEncoding', f[i])
    // }
    // console.log('terminou o fix encoding')

    for (let i = 0; i < f.length; i++) {
        let currentFile = outputPath + f[i]
        currentFile = currentFile.toString()
        await csvLoader(mongo, currentFile, dbName, collectionName)
        console.log('inseriu', collectionName + i)
    }
    console.log('terminou de inserir no banco')
}

main().catch(console.error);