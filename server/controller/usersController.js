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
/****** EXPORTS *******/
/****** POST ONE *******/
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
            yield mdbInsertOne("howmuch-app", "users", body);
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
/****** GET MANY *******/
export const usersGetManyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        console.log('>>>destructuring necesary params and queries');
        const { id } = params;
        const mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        console.log('>>>connecting to mongodb fetch');
        yield mdbFetch("howmuch-app", "users", mdbQuery);
        console.log('>>>fetch sucess');
    }
    catch (error) {
        console.log({ error, message: "internal server error at users fetch many " });
    }
});
/****** GET ONE *******/
export const usersGetOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if (params || query) {
            console.log('>>>destructuring necesary params and queries');
            const { id } = params;
            const mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
            //expect mdbquery object keys is not undefined
            if (Object.keys(mdbQuery)[0]) {
                console.log({ error: 400, message: "bad request at users fetch one, filter query undefined" });
                res.status(400).json({ error: 400, message: "bad request at users fetch one, filter query undefined" });
            }
            ;
            console.log('>>>connecting to mongodb fetch');
            yield mdbFetch("howmuch-app", "users", mdbQuery);
            console.log('>>>fetch sucess');
        }
        else {
            console.log({ error: 400, message: "bad request at users fetch one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at users fetch one" });
    }
});
/****** PATCH ONE *******/
export const usersPatchOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if (body) {
            console.log('>>>destructuring necesary params and queries');
            const { id } = params;
            const mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
            //expect mdbquery object keys is not undefined
            if (Object.keys(mdbQuery)[0]) {
                console.log({ error: 400, message: "bad request at users patch one, filter query undefined" });
                res.status(400).json({ error: 400, message: "bad request at users patch one, filter query undefined" });
            }
            ;
            console.log('>>>connecting to mongodb update');
            yield mdbUpdateOne("howmuch-app", "users", body, mdbQuery);
            console.log('>>>update sucess');
        }
        else {
            console.log({ error: 400, message: "bad request at users patch one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at users patch one" });
    }
});
/****** DELETE ONE *******/
export const usersDeleteOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if (params) {
            console.log('>>>destructuring necesary params and queries');
            const { id } = params;
            const mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
            //expect mdbquery object keys is not undefined
            if (Object.keys(mdbQuery)[0]) {
                console.log({ error: 400, message: "bad request at users delete filter query undefined" });
                res.status(400).json({ error: 400, message: "bad request at users delete filter query undefined" });
            }
            ;
            console.log('>>>connecting to mongodb delete');
            yield mdbUpdateOne("howmuch-app", "users", body, mdbQuery);
            console.log('>>>delete sucess');
        }
        else {
            console.log({ error: 400, message: "bad request at users delete one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at users delete one" });
    }
});
