var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import '../loadenv.js';
const SECRET = process.env.MONGODB_SECRET;
// Define a function to connect to the MongoDB database
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = SECRET || ''; // Update with your MongoDB connection string
        const client = new MongoClient(uri);
        try {
            // Connect to the MongoDB server
            yield client.connect();
            console.log('Connected to MongoDB successfully');
            // Get the database instance
            const database = client.db('howmuch-app'); // Replace 'myDatabase' with your database name
            return database;
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    });
}
const mdbInsertOne = (collection, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        console.log(">>>connecting to mongodb");
        const db = yield connectToMongoDB();
        // Get the collection to work with
        console.log(`>>>connecting to ${collection} collection`);
        const newCollection = db.collection(collection);
        console.log('>>>inserting payload:', payload, "into collection:", collection);
        // console.log(usersCollection);
        const post = yield newCollection.insertOne(payload);
        console.log('>>>insert success');
    }
    catch (err) {
        console.error('Error:', err);
    }
});
export default mdbInsertOne;
