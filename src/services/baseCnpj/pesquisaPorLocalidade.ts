import { MongoClient } from "mongodb";
import { searchCollection } from "../collection/searchCollection";


export const pesquisaPorLocalidade = async (client: MongoClient, dbName: string, collectionName: string, uf: string, municipio: string) => {
    try {
        const collection = await searchCollection(client, dbName, collectionName);
        if (!collection) {
            console.error('Collection not found');
            return false;
        }

        const db = client.db(dbName);

        // Combined aggregation pipeline
        const allOccurrences = await db.collection(collectionName).aggregate([
            {}])
    } catch (error) {
        console.error('Erro ao procurar em localidade', error)
        return false;
    }
}