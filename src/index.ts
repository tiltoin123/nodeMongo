import { connect, disconect } from './services/mongoClient';
import { csvLoader } from './services/csvMongo/csvLoader';
import path from "path";
import { splitCsv } from './services/csvMongo/splitCsv';
import { listCsv } from './services/csvMongo/listCsv';
async function main() {
    const mongo = await connect();


    const dbName = 'base_cnpj';
    const collectionName = 'empresas';

    // // Use o módulo path para garantir o caminho correto
    // const pathToFile = path.resolve('C:/Users/ISouza/Desktop/empresas/emp/empresas.csv.EMPRECSV');

    // // Chama a função csvLoader com os parâmetros corretos
    // const testeLoader = await csvLoader(mongo, pathToFile, collectionName, dbName);

    // console.log('Resultado do carregamento do CSV:', testeLoader);

    // // Desconectar do MongoDB
    // await mongo.close();
    // console.log('Desconectado do MongoDB.');
    await splitCsv('C:/Users/ISouza/Desktop/empresas/emp/empresas.csv.EMPRECSV', 'C:/Users/ISouza/Desktop/empresas/emp/split_files', 200000);
    let csvFolder = 'C:/Users/ISouza/Desktop/empresas/emp/split_files/'
    let csv = await listCsv(csvFolder)
    for (let i = 0; i < csv.length; i++) {
        let currentFile = csvFolder + csv[i]
        currentFile = currentFile.toString()
        console.log('inserindo:', currentFile)
        await csvLoader(mongo, currentFile, dbName, collectionName)

    }
}

// Executa a função principal
main().catch(console.error);