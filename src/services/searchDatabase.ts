import {DatabaseInfo, listDatabases,ListDatabasesResult} from './listDatabases';

export const searchDatabases = async (dbName: string): Promise<void> => {
  try {
    // Await the list of databases
    const dbInfo: ListDatabasesResult | null = await listDatabases();

    // Check if databases list is available
    if (!dbInfo) {
      console.log('No databases found.');
      return;
    }

    // Search for the database by name
    const foundDatabase = dbInfo.databases.find((db:DatabaseInfo) => db.name === dbName);

    if (foundDatabase) {
      console.log(`Database found: ${foundDatabase.name}`);
    } else {
      console.log(`Database not found: ${dbName}`);
    }
  } catch (error) {
    console.error('Error listing databases:', error);
  }
};