import {
    mdbInsertOne,
    mdbFetch, 
    mdbUpdateOne,
    mdbDeleteOne
} from "./mongodbFunctions.js"

class MdbCrud {
    public mdbDeleteOne:typeof mdbDeleteOne;
    public mdbUpdateOne:typeof mdbUpdateOne;
    public mdbInsertOne:typeof mdbInsertOne;
    public mdbFetch:typeof mdbFetch;
    constructor(){
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetch = mdbFetch;
    }
}
export default MdbCrud;