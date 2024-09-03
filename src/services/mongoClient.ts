import { MongoClient } from 'mongodb';
require('dotenv').config();
const uri = process.env.URI!;

let client: MongoClient | null = null;

export const connect = async (): Promise<MongoClient> => {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log('MongoDB connected');
    }
    return client;
};

export const disconect = async (): Promise<void> => {
    if (client) {
        await client.close();
        client = null;
        console.log('MongoDB connection closed');
    }
};