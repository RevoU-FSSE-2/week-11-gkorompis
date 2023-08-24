var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const { mdbFetchMany, mdbUpdateOne, mdbInsertOne, mdbDeleteOne } = crud;
export const usersPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (body) {
            //post to db
            console.log('>>>connecting to mongodb insert');
            yield mdbInsertOne("users", body);
            console.log('>>>insert sucess');
        }
        else {
            console.log({ error: 400, message: "bad request at users post" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at users post" });
    }
});
