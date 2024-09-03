import { client} from './client';

const listDatabases=async()=> {
    try {
        await client.connect();

         const admin = client.db().admin();
         const dbInfo = await admin.listDatabases();
         console.log(dbInfo)
         for (const db of dbInfo.databases) {
           console.log(db.name);
         }

    } catch (error) {
        console.error('Error listing databases:', error);
    }finally{
        await client.close()
    }
}

export default listDatabases