import { client} from './client';
client.connect()
const database   = client.db('myDatabase');
client.close()