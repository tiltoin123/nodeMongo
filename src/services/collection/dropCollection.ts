import { MongoClient } from "mongodb";
import { searchCollection } from "./searchCollection";

export const dropCollection = async (
    client: MongoClient,
    dbName: string,
    collectionName: string,
): Promise<true | false> => {
    try {
        const collection = await searchCollection(client, dbName, collectionName);

        if (!collection) {
            return false;
        }

        await collection.drop();
        return true;
    } catch (error) {
        console.error('Error droping collection:', error);
        return false;
    }
};