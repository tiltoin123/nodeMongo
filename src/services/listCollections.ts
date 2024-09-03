import { CollectionInfo, MongoClient } from "mongodb";

export const listCollections = async (client: MongoClient, dbName: string): Promise<CollectionInfo[] | false> => {
    try {
        const database = client.db(dbName);
        const collections = await database.listCollections().toArray();
        if (collections) {
            return collections; // Return the existing collection info
        } else {
            return false
        }
    } catch (error) {
        console.error('Error creating or retrieving collection:', error);
        return false; // Return null in case of an error
    } finally {
        await client.close(); // Ensure the client is properly closed
    }
}