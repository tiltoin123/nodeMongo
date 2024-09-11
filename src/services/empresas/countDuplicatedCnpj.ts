import { MongoClient } from "mongodb";
import { searchCollection } from "../collection/searchCollection";

export const countDuplicatedCnpj = async (client: MongoClient, dbName: string, collectionName: string) => {
    try {
        const collection = await searchCollection(client, dbName, collectionName);
        if (!collection) {
            console.error('Collection not found');
            return false;
        }

        const db = client.db(dbName);
        const duplicates = await db.collection(collectionName).aggregate([
            {
                $group: {
                    _id: "$cnpj",
                    count: { $sum: 1 }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]).toArray();

        console.log(duplicates);
        return duplicates;
    } catch (error) {
        console.error('Error counting duplicated CNPJ:', error);
        return false;
    }
};
