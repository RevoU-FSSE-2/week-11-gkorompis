// Import the required modules
import { MongoClient, Db, Collection, InsertOneResult} from 'mongodb';
import './loadenv.js';

const SECRET = process.env.MONGODB_SECRET


// Define an interface for the data you want to store in the collection
type CollectionName = string;
type MongoClientUri = string;
type DbInstance = string;

// Define a function to connect to the MongoDB database
async function connectToMongoDB(db_instance:DbInstance): Promise<Db> {
  const uri:MongoClientUri = SECRET || ""; 
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('>>>connected to MongoDB successfully');

    // Get the database instance
    const database: Db = client.db(db_instance);
    return database;
  } catch (err) {
    console.error('>>>Error connecting to MongoDB:', err);
    throw err;
  }
}

// createMdbCollection('transactions');
const buildNewCollection = async (db_instance:DbInstance, collection_name:CollectionName) =>{
    try {
        //connecting to mongodb
        console.log(">>>connecting to mongodb")
        const db = await connectToMongoDB(db_instance);

        // fetch array of collections
        const collections = await db.listCollections().toArray();
        console.log(">>>fetch collection lists:", collections);
        const collectionNames = collections.map(collection => collection.name);

        // check collection doesnt exists
        if(collectionNames.includes(collection_name)){
          console.log(">>>collection is already existed")
          // throw new Error('collection is already existed');
        }

        // create new collection
        console.log(">>>creating collection", collection_name)
        // const newCollection =  await db.collection(collection_name);
        const newCollection = await db.createCollection(collection_name);
        console.log(">>>SUCCESS: new collection is made:", newCollection);
        console.log(">>>SUCCESS: new collection is made");
    } catch (err) {
        console.log("error:", err);
    }
};

let appCollections = ['transactionRequests', 'users', 'transactions', 'profiles']

appCollections.map(collection =>{
  buildNewCollection("howmuch-app", collection);
})
