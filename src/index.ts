import { connect, disconect } from './services/mongoClient';
import { csvLoader } from './services/csvMongo/csvLoader';
import path from "path";
async function main() {
    const mongo = await connect();


    const dbName = 'batata2';
    const collectionName = 'jacare_com_pimenta';

    // Use o módulo path para garantir o caminho correto
    const pathToFile = path.resolve('C:/Users/ISouza/Desktop/empresas/emp/empresas.csv');

    // Chama a função csvLoader com os parâmetros corretos
    const testeLoader = await csvLoader(mongo, pathToFile, collectionName, dbName);

    console.log('Resultado do carregamento do CSV:', testeLoader);

    // Desconectar do MongoDB
    await mongo.close();
    console.log('Desconectado do MongoDB.');
}

// Executa a função principal
main().catch(console.error);