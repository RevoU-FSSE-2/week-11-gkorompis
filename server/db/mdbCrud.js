import { mdbInsertOne, mdbFetch, mdbUpdateOne, mdbDeleteOne } from "./mongodbFunctions.js";
class MdbCrud {
    constructor() {
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetch = mdbFetch;
    }
}
export default MdbCrud;
