import { BulkWriteResult, MongoClient, Document } from "mongodb";
import { findDocuments } from "./findDocuments";

export const deleteDocuments = async (
    client: MongoClient,
    dbName: string,
    collectionName: string,
    searchParams: Document,
): Promise<BulkWriteResult | false> => {
    try {

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        let docs = await findDocuments(client, dbName, collectionName, searchParams);

        if (!docs) {
            console.log('No documents found.');
            return false;
        }

        const deleteOperations = docs.map(doc => ({
            deleteOne: {
                filter: { _id: doc._id },
            }
        }));

        const result = await collection.bulkWrite(deleteOperations);

        return result;
    } catch (error) {
        console.error('Error deleting documents:', error);
        return false;
    }
};