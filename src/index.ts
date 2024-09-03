import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { searchDatabase } from './services/searchDatabase';
import { createCollection } from './services/createCollection';
import { connect } from './services/mongoClient';
// import {listDatabases} from './services/listDatabases';

async function main() {
    const mongo = await connect();
    console.log(createCollection(mongo, 'coca_cola_espumante', 'jacare_com_pimenta'))
}

main().catch(console.error);