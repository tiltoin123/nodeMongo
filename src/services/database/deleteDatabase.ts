import { MongoClient } from "mongodb";
import { searchDatabase } from "./searchDatabase";

export const deleteDatabase = async (client: MongoClient, dbName: string): Promise<boolean> => {
    try {
        const result = await searchDatabase(client, dbName)
        if (!result) {
            console.log('database not found', dbName)
            return false
        }
        let database = client.db(dbName)
        return await database.dropDatabase()
    } catch (error) {
        console.error('could not delete the database', error)
    }
    return false
}