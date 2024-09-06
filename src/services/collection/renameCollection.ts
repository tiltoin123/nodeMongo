import { Collection, CollectionInfo, MongoClient } from "mongodb";
import { searchCollection } from "./searchCollection";

export const renameCollection = async (
    client: MongoClient,
    dbName: string,
    collectionName: string,
    newName: string
): Promise<CollectionInfo | false> => {
    try {
        const collection = await searchCollection(client, dbName, collectionName);

        if (!collection) {
            return false;
        }

        const renamedCollection = await collection.rename(newName);
        return renamedCollection;
    } catch (error) {
        console.error('Error renaming collection:', error);
        return false;
    }
};