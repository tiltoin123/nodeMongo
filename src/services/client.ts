import { MongoClient } from 'mongodb';
require('dotenv').config();
const uri = process.env.URI!;
const client = new MongoClient(uri);
export { client};