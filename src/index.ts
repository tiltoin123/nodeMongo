import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import listDatabases from './services/listDatabases';


async function main() {
console.log('jacare')
listDatabases()
}

main().catch(console.error);