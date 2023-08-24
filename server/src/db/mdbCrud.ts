import mdbDeleteOne from "./delete.js";
import mdbUpdateOne from "./put.js";
import mdbInsertOne from "./post.js";
import mdbFetchMany from "./get.js"; 

class MdbCrud {
    public mdbDeleteOne:typeof mdbDeleteOne;
    public mdbUpdateOne:typeof mdbUpdateOne;
    public mdbInsertOne:typeof mdbInsertOne;
    public mdbFetchMany:typeof mdbFetchMany
    constructor(){
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetchMany = mdbFetchMany;
    }
}
export default MdbCrud;