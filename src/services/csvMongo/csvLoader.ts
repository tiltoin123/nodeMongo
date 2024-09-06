import fs from 'fs';
import csv from 'csv-parser';
import { MongoClient } from 'mongodb';
import { searchCollection } from '../collection/searchCollection';

export const csvLoader = async (
    client: MongoClient,
    path: string,
    collectionName: string,
    dbName: string
): Promise<boolean> => {
    try {
        const collection = await searchCollection(client, dbName, collectionName);
        if (!collection) {
            console.error('Collection not found');
            return false;
        }

        const data: any[] = [];

        // Encapsular a leitura do CSV e inserção dentro de uma Promise
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (row) => {
                    data.push(row);
                })
                .on('end', async () => {
                    try {
                        const result = await collection.insertMany(data);
                        console.log(`${result.insertedCount} documentos inseridos com sucesso!`);
                        resolve(); // Resolve a Promise após inserção bem-sucedida
                    } catch (insertError) {
                        console.error('Erro ao inserir documentos:', insertError);
                        reject(insertError); // Rejeita a Promise em caso de erro na inserção
                    }
                })
                .on('error', (error) => {
                    console.error('Erro ao ler o CSV:', error);
                    reject(error); // Rejeita a Promise em caso de erro na leitura
                });
        });

        return true; // Retorna true se tudo der certo
    } catch (error) {
        console.error('Error loading the CSV into the database:', error);
        return false;
    }
};
