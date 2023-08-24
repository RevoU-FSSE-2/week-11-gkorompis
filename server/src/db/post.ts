import { MongoClient, Db, Collection, InsertOneResult} from 'mongodb';
import '../loadenv.js'

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
    const database: Db = client.db('howmuch-app'); // Replace 'myDatabase' with your database name
    return database;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}
// Define an interface for the data you want to store in the collection
interface InsertResultWithOps<T> extends InsertOneResult<T> {
  ops: T[];
}

const mdbInsertOne = async (collection:string, payload:any)=>{
  try {
    // Connect to MongoDB
    console.log(">>>connecting to mongodb")
    const db: Db = await connectToMongoDB();

    // Get the collection to work with
    console.log(`>>>connecting to ${collection} collection`)
    const newCollection: Collection<any> = db.collection<any>(collection);

    console.log('>>>inserting payload:', payload,"into collection:", collection );
    // console.log(usersCollection);
    const post = await newCollection.insertOne(payload) as InsertResultWithOps<any>;
    console.log('>>>insert success');
  } catch (err) {
    console.error('Error:', err);
  }
};

export default mdbInsertOne;
