import { MongoClient, Db, Collection, InsertOneResult, ObjectId} from 'mongodb';
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
        console.log('>>> inserting document:', document)
        const postResponse = await collection.insertOne(document);

        console.log(">>> insert success to:", collection_name, "|||", postResponse);
        return postResponse;
    } catch (error){
        console.log({code:500, message: "internal server error at database insert", error});
        return {code:500, message: "internal server error at database insert", error};
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
        const {_id} = query;
        if(_id){
            query._id = new ObjectId(_id);
        }
        console.log('>>>query id aware', query);
        const getResponse =  collection.find(query);
        const documents = await getResponse.toArray();
        

        console.log(">>> fetch success from:", collection_name, "|||", getResponse);
        return documents;
    } catch (error){
        console.log({code:500, message: "internal server error at database fetch", error});
        return error
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
        const {_id} = query;
        if(_id){
            query._id = new ObjectId(_id);
        }
        console.log(">>>update query:", query);
        console.log(">>>update document:", document);
         console.log(">>>instanceof Buffer:", document instanceof Buffer);
        const {status, timestamp} = document;
        if(document instanceof Buffer){
            const updateResponse = await collection.updateOne(query, {$set: {
                status: status,
                timestamp: timestamp
            }});
            console.log(">>>  update success into:", collection_name, "|||", updateResponse);
            return updateResponse;
        } 
        const updateResponse = await collection.updateOne(query, {$set: document});
        
        console.log(">>>  update success into:", collection_name, "|||", updateResponse);
        return updateResponse;

    } catch (error){
        console.log({error, message: "internal server error at database update"});
        return {code:500, message: "internal server error at database update", error};
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
        const {_id} = query;
        if(_id){query._id = new ObjectId(_id);}
        console.log('>>> deleting document into collection name')
        const deleteResponse = await collection.deleteOne(query);

        console.log(">>>  delete success from:", collection_name, "|||", deleteResponse);
        return deleteResponse;
        
    } catch (error){
        console.log({error:500, message: "internal server error at database delete"});
    }
}
