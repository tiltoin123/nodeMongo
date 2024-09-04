import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { searchDatabase } from './services/searchDatabase';
import { createCollection } from './services/createCollection';
import { connect, disconect } from './services/mongoClient';
import { listCollections } from './services/listCollections';

async function main() {
    const mongo = await connect();
    let dbName = 'batata'
    let seila = await createCollection(mongo, dbName, 'jacare_com_pimenta')
    console.log(seila)
    let seisim = await listCollections(mongo, dbName)
    console.log(seisim)
    console.log('fez algo???')
    disconect()
}

main().catch(console.error);