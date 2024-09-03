import { MongoClient } from "mongodb";

export interface DatabaseInfo {
    name: string;
    sizeOnDisk?: number;
    empty?: boolean;
}

export interface ListDatabasesResult {
    databases: DatabaseInfo[];
}

export const listDatabases = async (client: MongoClient): Promise<ListDatabasesResult | null> => {
    try {

        const admin = client.db().admin();
        const dbInfo = await admin.listDatabases();

        return dbInfo;
    } catch (error) {
        console.error('Error listing databases:', error);
        throw error;
    } finally {
        await client.close();
    }
};