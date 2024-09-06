import { CollectionInfo, MongoClient } from "mongodb";

export const searchCollection = async (client: MongoClient, dbName: string, collectionName: string): Promise<CollectionInfo | false> => {
    try {
        const db = client.db(dbName)
        const cursor = db.listCollections({ name: collectionName });
        const collectionExists = await cursor.hasNext();

        if (collectionExists) {
            console.log('Collection found!');
            const collection = await cursor.next();
            return collection!
        } else {
            return false
        }
    } catch (error) {
        console.error('Error retrieving collection:', error);
        return false;
    }
}