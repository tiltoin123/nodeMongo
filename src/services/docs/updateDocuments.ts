import { BulkWriteResult, MongoClient, Document } from "mongodb";
import { findDocuments } from "./findDocuments";

export const updateDocuments = async (
    client: MongoClient,
    dbName: string,
    collectionName: string,
    searchParams: Document,
    updateData: any
): Promise<BulkWriteResult | false> => {
    try {

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        let docs = await findDocuments(client, dbName, collectionName, searchParams);

        if (!docs) {
            console.log('No documents found.');
            return false;
        }

        const updateOperations = docs.map(doc => ({
            updateOne: {
                filter: { _id: doc._id },
                update: { $set: updateData }
            }
        }));

        const result = await collection.bulkWrite(updateOperations);

        return result;
    } catch (error) {
        console.error('Error updating documents:', error);
        return false;
    }
};