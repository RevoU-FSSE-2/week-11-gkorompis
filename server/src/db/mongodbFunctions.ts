import { MongoClient, Db, Collection, InsertOneResult} from 'mongodb';
import '../loadenv.js';

const SECRET = process.env.MONGODB_SECRET

// Define an interface for the data you want to store in the collection
type CollectionName = string;
type MongoClientUri = string;
type DbInstance = string;

type DbDocument = Record<string,any>;


const connectToMongoDB= async (db_instance:DbInstance): Promise<Db> => {
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
};


 /****** EXPORTS *******/

 /****** INSERT ONE *******/
export const mdbInsertOne = async (db_instance:DbInstance, collection_name:CollectionName, document:DbDocument) =>{
    try {
        // build connection
        console.log('>>> connection is building...')
        const db = await connectToMongoDB(db_instance);
        
        // get collection
        console.log('>>> fetching collection name...')
        const collection = db.collection(collection_name);
        
        // insert into collection
        console.log('>>> inserting into...')
        const postResponse = await collection.insertOne(document);

        console.log(">>> insert success to:", collection_name, "|||", postResponse);
        return postResponse;
    } catch (error){
        console.log({error:500, message: "internal server error at database insert"});
    }
}

 /****** FETCH MANY/ONE *******/
export const mdbFetch = async (db_instance:DbInstance, collection_name:CollectionName, query:DbDocument) =>{
    try {
        // build connection
        console.log('>>> connection is building...')
        const db = await connectToMongoDB(db_instance);
        
        // get collection
        console.log('>>> fetching collection name...')
        const collection = db.collection(collection_name);
        
        // fetch from collection
        console.log('>>> fetching document from collection name')
        const getResponse = collection.find(query);
        const documents = await getResponse.toArray();
        

        console.log(">>> fetch success from:", collection_name, "|||", getResponse);
        return documents;
    } catch (error){
        console.log({error:500, message: "internal server error at database fetch"});
    }
}


 /****** UPDATE ONE *******/
export const mdbUpdateOne = async (db_instance:DbInstance, collection_name:CollectionName, document:DbDocument, query:DbDocument) =>{
    try {
        // build connection
        console.log('>>> connection is building...')
        const db = await connectToMongoDB(db_instance);
        
        // get collection
        console.log('>>> fetching collection name...')
        const collection = db.collection(collection_name);
        
        // update into collection
        console.log('>>> updating document into collection name')
        const updateResponse = collection.updateOne(query, {$set: document});

        console.log(">>>  update success into:", collection_name, "|||", updateResponse);
        return updateResponse;

    } catch (error){
        console.log({error:500, message: "internal server error at database update"});
    }
}


 /****** DELETE ONE *******/
export const mdbDeleteOne = async (db_instance:DbInstance, collection_name:CollectionName, query:DbDocument) =>{
    try {
        // build connection
        console.log('>>> connection is building...')
        const db = await connectToMongoDB(db_instance);
        
        // get collection
        console.log('>>> fetching collection name...')
        const collection = db.collection(collection_name);
        
        // delete from collection
        console.log('>>> deleting document into collection name')
        const deleteResponse = collection.deleteOne(query);

        console.log(">>>  delete success from:", collection_name, "|||", deleteResponse);
        return deleteResponse;
        
    } catch (error){
        console.log({error:500, message: "internal server error at database delete"});
    }
}
