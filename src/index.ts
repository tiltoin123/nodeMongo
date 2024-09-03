import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { searchDatabases } from './services/searchDatabase';
// import {listDatabases} from './services/listDatabases';

async function main() {
console.log('jacare')
// listDatabases()
console.log(searchDatabases('batata'))
}

main().catch(console.error);