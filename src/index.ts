import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { searchDatabase } from './services/database/searchDatabase';
import { createCollection } from './services/collection/createCollection';
import { connect, disconect } from './services/mongoClient';
import { listCollections } from './services/collection/listCollections';
import { insertDocuments } from './services/docs/insertDocuments';
import { findDocuments } from './services/docs/findDocuments';

async function main() {
    const mongo = await connect();
    let dbName = 'batata2'
    let collectionName = 'jacare_com_pimenta'
    let doc = await findDocuments(mongo, dbName, collectionName, { name: { $exists: false } })
    console.log(doc)
    disconect()
}

main().catch(console.error);