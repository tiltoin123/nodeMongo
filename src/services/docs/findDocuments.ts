import { MongoClient, Document } from "mongodb";

export const findDocuments = async (client: MongoClient, dbName: string, collectionName: string, searchParams: Document): Promise<Document[] | false> => {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const results = await collection.find(searchParams).toArray();
        if (results.length) {
            return results
        }
    } catch (error) {
        console.error("Error finding document", error)
    }
    return false
}