import { InsertManyResult, MongoClient } from "mongodb";

export const insertDocuments = async (client: MongoClient, dbName: string, collectionName: string, docs: Array<any>): Promise<InsertManyResult<Document> | false> => {

    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        console.log("insertDocuemtn", collection)
        console.log("docs", docs)
        const result = await collection.insertMany(docs); // Pass a single-element array
        return result
    } catch (error) {
        console.error("Error inserting document:", error);
    }
    return false
}