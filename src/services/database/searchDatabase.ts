import { MongoClient } from 'mongodb';
import { DatabaseInfo, listDatabases, ListDatabasesResult } from './listDatabases';

export const searchDatabase = async (client: MongoClient, dbName: string): Promise<DatabaseInfo | false> => {
  try {
    // Await the list of databases
    const dbInfo: ListDatabasesResult | null = await listDatabases(client);

    // Check if databases list is available
    if (!dbInfo) {
      console.log('No databases found.');

    }

    // Search for the database by name
    const foundDatabase = dbInfo?.databases.find((db: DatabaseInfo) => db.name === dbName);

    if (foundDatabase) {
      return foundDatabase
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error listing databases:', error);
    return false
  }
};