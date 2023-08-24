import mdbDeleteOne from "./delete.js";
import mdbUpdateOne from "./put.js";
import mdbInsertOne from "./post.js";
import mdbFetchMany from "./get.js";
class MdbCrud {
    constructor() {
        this.mdbDeleteOne = mdbDeleteOne;
        this.mdbUpdateOne = mdbUpdateOne;
        this.mdbInsertOne = mdbInsertOne;
        this.mdbFetchMany = mdbFetchMany;
    }
}
export default MdbCrud;
