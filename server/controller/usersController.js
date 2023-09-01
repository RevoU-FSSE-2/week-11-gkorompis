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
const { mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne } = crud;
const extractMdbQuery = ({ id, username, name, email, ID }) => {
    const mdbQuery = id ? { ID: id } :
        username ? { username } :
            name ? { name } :
                email ? { email } :
                    ID ? { ID } : {};
    return mdbQuery;
};
/**************************************** EXPORTS */
/****** POST ONE *******/
export const usersPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at usersPostController" });
        }
        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>usersPostController: inserting body to db ');
        const postResponse = yield mdbInsertOne("portal-app", "users", body);
        //expect postResponse is not null
        const { error } = postResponse;
        if (!postResponse || error) {
            console.log('>>>usersPostController: ERR', { code: 500, message: "internal server error at mongodb insert into users collection", error });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into users collection", error });
        }
        //expect return post postResponse
        console.log('>>>usersPostController: return post response');
        res.status(200).json(postResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>usersPostController: ERR', { code: 500, message: "internal server error at mongodb insert into users collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into users collection ", error });
    }
});
