var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient, ObjectId } from 'mongodb';
import '../loadenv.js';
const SECRET = process.env.MONGODB_SECRET;
const connectToMongoDB = (db_instance) => __awaiter(void 0, void 0, void 0, function* () {
    const uri = SECRET || "";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB server
        yield client.connect();
        console.log('>>>connected to MongoDB successfully');
        // Get the database instance
        const database = client.db(db_instance);
        return database;
    }
    catch (err) {
        console.error('>>>Error connecting to MongoDB:', err);
        throw err;
    }
});
/****** EXPORTS *******/
/****** INSERT ONE *******/
export const mdbInsertOne = (db_instance, collection_name, document) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // build connection
        console.log('>>> connection is building...');
        const db = yield connectToMongoDB(db_instance);
        // get collection
        console.log('>>> fetching collection name...');
        const collection = db.collection(collection_name);
        // insert into collection
        console.log('>>> inserting document:', document);
        const postResponse = yield collection.insertOne(document);
        console.log(">>> insert success to:", collection_name, "|||", postResponse);
        return postResponse;
    }
    catch (error) {
        console.log({ code: 500, message: "internal server error at database insert", error });
        return { code: 500, message: "internal server error at database insert", error };
    }
});
/****** FETCH MANY/ONE *******/
export const mdbFetch = (db_instance, collection_name, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // build connection
        console.log('>>> connection is building...');
        const db = yield connectToMongoDB(db_instance);
        // get collection
        console.log('>>> fetching collection name...');
        const collection = db.collection(collection_name);
        // fetch from collection
        console.log('>>> fetching document from collection name');
        const { _id } = query;
        if (_id) {
            query._id = new ObjectId(_id);
        }
        console.log('>>>query id aware', query);
        const getResponse = collection.find(query);
        const documents = yield getResponse.toArray();
        console.log(">>> fetch success from:", collection_name, "|||", getResponse);
        return documents;
    }
    catch (error) {
        console.log({ code: 500, message: "internal server error at database fetch", error });
        return error;
    }
});
/****** UPDATE ONE *******/
export const mdbUpdateOne = (db_instance, collection_name, document, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // build connection
        console.log('>>> connection is building...');
        const db = yield connectToMongoDB(db_instance);
        // get collection
        console.log('>>> fetching collection name...');
        const collection = db.collection(collection_name);
        // update into collection
        console.log('>>> updating document into collection name');
        const { _id } = query;
        if (_id) {
            query._id = new ObjectId(_id);
        }
        console.log(">>>update query:", query);
        console.log(">>>update document:", document);
        console.log(">>>instanceof Buffer:", document instanceof Buffer);
        const { status, timestamp } = document;
        if (document instanceof Buffer) {
            const updateResponse = yield collection.updateOne(query, { $set: {
                    status: status,
                    timestamp: timestamp
                } });
            console.log(">>>  update success into:", collection_name, "|||", updateResponse);
            return updateResponse;
        }
        const updateResponse = yield collection.updateOne(query, { $set: document });
        console.log(">>>  update success into:", collection_name, "|||", updateResponse);
        return updateResponse;
    }
    catch (error) {
        console.log({ error, message: "internal server error at database update" });
        return { code: 500, message: "internal server error at database update", error };
    }
});
/****** DELETE ONE *******/
export const mdbDeleteOne = (db_instance, collection_name, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // build connection
        console.log('>>> connection is building...');
        const db = yield connectToMongoDB(db_instance);
        // get collection
        console.log('>>> fetching collection name...');
        const collection = db.collection(collection_name);
        // delete from collection
        const { _id } = query;
        if (_id) {
            query._id = new ObjectId(_id);
        }
        console.log('>>> deleting document into collection name');
        const deleteResponse = yield collection.deleteOne(query);
        console.log(">>>  delete success from:", collection_name, "|||", deleteResponse);
        return deleteResponse;
    }
    catch (error) {
        console.log({ error: 500, message: "internal server error at database delete" });
    }
});
