
import { UniqueIdQuery} from '../types.js';
// Import the required modules
import { MongoClient, Db, Collection, ObjectId} from 'mongodb';
import '../loadenv.js'
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

const mdbDeleteOne = async (collection:string, query:UniqueIdQuery)=>{
  try {
    // Connect to MongoDB
    console.log(">>>connecting to mongodb")
    const db: Db = await connectToMongoDB();

    // Get the collection to work with
    console.log(`>>>connecting to ${collection} collection`)
    const newCollection: Collection<UniqueIdQuery> = await db.collection<UniqueIdQuery>(collection);

    console.log('>>>deleting document for query:', query);
    // console.log(usersCollection);
    const fetch = newCollection.deleteOne(query);
    const documents = await fetch;
    console.log('>>>delete success', documents);
    return documents;
  } catch (err) {
    console.error('Error:', err);
  }
};

export default mdbDeleteOne;
