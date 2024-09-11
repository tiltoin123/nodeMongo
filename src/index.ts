import { connect, disconect } from './services/mongoClient';
import { csvLoader } from './services/csvMongo/csvLoader';
import path from "path";
import { splitCsv } from './services/csvMongo/splitCsv';
import { listFiles } from './services/csvMongo/listFiles';
import { countDuplicatedCnpj } from './services/empresas/countDuplicatedCnpj';
async function main() {
    const mongo = await connect();

    const dbName = 'base_cnpj';
    // const collectionName = 'empresas';
    const collectionName = 'estabelecimentos';
    let csvPath = 'C:/Users/ISouza/Desktop/empresas/estabelecimentos/'
    let outputPath = 'C:/Users/ISouza/Desktop/empresas/estabelecimentos/split_files/'
    let csvToSplit = await listFiles(csvPath)
    console.log(csvToSplit)
    for (let i = 0; i < csvToSplit.length; i++) {
        let currentFile = csvPath + csvToSplit[i]
        await splitCsv(currentFile, outputPath, 50000);
    }

    let csvForDb = await listFiles(outputPath)
    for (let i = 0; i < csvForDb.length; i++) {
        let currentFile = outputPath + csvForDb[i]
        currentFile = currentFile.toString()
        await csvLoader(mongo, currentFile, dbName, collectionName)
    }

    mongo.close()
}

main().catch(console.error);