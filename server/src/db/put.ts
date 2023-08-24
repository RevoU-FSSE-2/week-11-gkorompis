import { MongoClient, Db, Collection} from 'mongodb';
import '../loadenv.js'
import { UniqueIdQuery,NewTransactionPayload } from '../types.js';
// console.log(process.env.TEST_VAR);
const SECRET = process.env.MONGODB_SECRET;

// Define a function to connect to the MongoDB database
async function connectToMongoDB(): Promise<Db> {
const uri = SECRET || '' // Update with your MongoDB connection string
const client = new MongoClient(uri);

try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB successfully');

    // Get the database instance
    const database: Db = client.db('server-portal'); // Replace 'myDatabase' with your database name
    return database;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

const mdbUpdateOne = async (collection:string, query:UniqueIdQuery, updatePayload: NewTransactionPayload)=>{
  try {
    // Connect to MongoDB
    console.log(">>>connecting to mongodb")
    const db: Db = await connectToMongoDB();

    // Get the collection to work with
    console.log(`>>>connecting to ${collection} collection`)
    const newCollection: Collection<NewTransactionPayload> = await db.collection<NewTransactionPayload>(collection);

    console.log('>>>updating document for query:', query);
    // console.log(usersCollection);
    const fetch = newCollection.updateOne(query, {$set: updatePayload});
    const documents = await fetch;
    // const cursor = newCollection.find({});

    console.log('>>>fetch success', documents);
    return documents;
  } catch (err) {
    console.error('Error:', err);
  }
};

export default mdbUpdateOne;
