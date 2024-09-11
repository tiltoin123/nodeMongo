import { connect, disconect } from './services/mongoClient';
import { csvLoader } from './services/csvMongo/csvLoader';
import path from "path";
import { splitCsv } from './services/csvMongo/splitCsv';
import { listFiles } from './services/csvMongo/listFiles';
async function main() {
    const mongo = await connect();

    const dbName = 'base_cnpj';
    const collectionName = 'empresas';

    let csvPath = 'C:/Users/ISouza/Desktop/empresas/emp/'
    let outputPath = 'C:/Users/ISouza/Desktop/empresas/emp/split_files/'
    let csvToSplit = await listFiles(csvPath)
    for (let i = 0; i < csvToSplit.length; i++) {
        let currentFile = csvPath + csvToSplit[i]
        await splitCsv(currentFile, outputPath, 150000);
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