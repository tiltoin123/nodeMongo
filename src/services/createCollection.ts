import { Collection, CollectionInfo, Document, MongoClient } from "mongodb";
import { searchDatabase } from "./searchDatabase";

export const createCollection = async (client: MongoClient, dbName: string, collectionName: string): Promise<CollectionInfo | Collection<Document> | null> => {
    try {
        const dbExist = await searchDatabase(dbName);
        if (dbExist) {
            console.log("A database with the name", dbName, "already exists.");
        }

        await client.connect();

        const database = client.db(dbName);
        const collections = await database.listCollections().toArray();

        const foundCollection = collections.find(collection => collection.name === collectionName);
        if (foundCollection) {
            return foundCollection; // Return the existing collection info
        } else {
            const collection = database.collection(collectionName);
            return collection; // Return the newly created collection
        }

    } catch (error) {
        console.error('Error creating or retrieving collection:', error);
        return null; // Return null in case of an error
    } finally {
        await client.close(); // Ensure the client is properly closed
    }
};
