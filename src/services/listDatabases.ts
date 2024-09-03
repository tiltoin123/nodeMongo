import { client } from './client';

export interface DatabaseInfo {
    name: string;
    sizeOnDisk?: number;
    empty?: boolean;
}

export interface ListDatabasesResult {
    databases: DatabaseInfo[];
}

export const listDatabases = async (): Promise<ListDatabasesResult | null> => {
    try {
        await client.connect();

        const admin = client.db().admin();
        const dbInfo = await admin.listDatabases();
        console.log(dbInfo);

        return dbInfo;
    } catch (error) {
        console.error('Error listing databases:', error);
        throw error;
    } finally {
        await client.close();
    }
};