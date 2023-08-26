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
const extractMdbQuery = ({ id, username, type, amount, status, timestamp, ID }) => {
    const mdbQuery = id ? { _id: id } :
        username ? { username } :
            type ? { type } :
                amount ? { amount } :
                    status ? { timestamp } :
                        ID ? { _id: ID } : {};
    return mdbQuery;
};
/****** EXPORTS *******/
/****** POST ONE *******/
//OK
export const transactionsRequestPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (!body && !query) {
            console.log({ error: 400, message: "bad request at transactionsRequest post" });
            return res.status(400).json({ error: 400, message: "bad request at transactionsRequest post" });
        }
        console.log('>>>destructuring necesary params and queries');
        const { id } = params;
        const { decodedRole, decodedUsername } = query;
        console.log(">>> decoder query", query);
        let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        delete query.decodedRole;
        delete query.decodedUsername;
        //post only self transaction if role is maker
        if (decodedRole == "maker") {
            body["username"] = decodedUsername;
        }
        delete query.decodedRole;
        delete query.decodedUsername;
        console.log(">>> decoder query", query);
        console.log('>>>connecting to mongodb insert');
        const postResponse = yield mdbInsertOne("howmuch-app", "transactionsRequest", body);
        console.log('>>>insert sucess');
        return res.status(200).json(postResponse);
    }
    catch (error) {
        console.log({ error, message: "internal server error at transactionsRequest post" });
    }
});
/****** GET MANY *******/
// maker get self OK
// approver admin get all OK
export const transactionsRequestGetManyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        console.log('>>>destructuring necesary params and queries');
        const { id } = params;
        const { decoderRole, decodedUsername } = query;
        delete query.decodedRole;
        delete query.decodedUsername;
        let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        //expect only self transaction if role is maker
        if (decoderRole == "maker") {
            mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
            console.log(">>>role is maker, get self query:", mdbQuery);
        }
        console.log('>>>connecting to mongodb fetch');
        const getResponse = yield mdbFetch("howmuch-app", "transactionsRequest", mdbQuery);
        console.log('>>>fetch sucess');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        console.log({ error, message: "internal server error at transactionsRequest fetch many " });
    }
});
/****** GET ONE *******/
// maker self
// admin approver all
export const transactionsRequestGetOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if (params || query) {
            console.log('>>>destructuring necesary params and queries');
            const { id } = params;
            const { decoderRole, decodedUsername } = query;
            delete query.decodedRole;
            delete query.decodedUsername;
            let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
            //expect only self transaction if role is maker
            if (decoderRole == "maker") {
                mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
                console.log(">>>role is maker, get self query:", mdbQuery);
            }
            //expect mdbquery object keys is not undefined
            if (Object.keys(mdbQuery)[0]) {
                console.log({ error: 400, message: "bad request at transactionsRequest fetch one, filter query undefined", mdbQuery });
                return res.status(400).json({ error: 400, message: "bad request at transactionsRequest fetch one, filter query undefined", mdbQuery });
            }
            ;
            console.log('>>>connecting to mongodb fetch');
            const getResponse = yield mdbFetch("howmuch-app", "transactionsRequest", mdbQuery);
            console.log('>>>fetch sucess');
            return res.status(200).json(getResponse);
        }
        else {
            console.log({ error: 400, message: "bad request at transactionsRequest fetch one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at transactionsRequest fetch one" });
    }
});
/****** PATCH ONE *******/
// admin approver isApproved, isRejected
// admin isDeleted
export const transactionsRequestPatchOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //expect body is not null
        if (body) {
            console.log('>>>destructuring necesary params and queries');
            const { id } = params;
            const { decoderRole, decodedUsername } = query;
            delete query.decodedRole;
            delete query.decodedUsername;
            let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
            //expect only self transaction if role is maker
            if (decoderRole == "maker") {
                mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
                console.log(">>>role is maker, get self query:", mdbQuery);
                return res.status(400).json({ error: 400, message: "bad request at transactionsRequest patch one, filter query undefined" });
            }
            //expect mdbquery object keys is not undefined
            if (Object.keys(mdbQuery)[0]) {
                console.log({ error: 400, message: "bad request at transactionsRequest patch one, filter query undefined" });
                return res.status(400).json({ error: 400, message: "bad request at transactionsRequest patch one, filter query undefined" });
            }
            ;
            console.log('>>>connecting to mongodb update');
            const patchResponse = yield mdbUpdateOne("howmuch-app", "transactionsRequest", body, mdbQuery);
            console.log('>>>update sucess');
            res.status(200).json(patchResponse);
        }
        else {
            console.log({ error: 400, message: "bad request at transactionsRequest patch one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at transactionsRequest patch one" });
    }
});
/****** DELETE ONE *******/
// admin  all
export const transactionsRequestDeleteOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                console.log({ error: 400, message: "bad request at transactionsRequest delete filter query undefined" });
                res.status(400).json({ error: 400, message: "bad request at transactionsRequest delete filter query undefined" });
            }
            ;
            console.log('>>>connecting to mongodb delete');
            const deleteResponse = yield mdbDeleteOne("howmuch-app", "transactionsRequest", mdbQuery);
            console.log('>>>delete sucess');
            res.status(200).json(deleteResponse);
        }
        else {
            console.log({ error: 400, message: "bad request at transactionsRequest delete one" });
        }
    }
    catch (error) {
        console.log({ error, message: "internal server error at transactionsRequest delete one" });
    }
});
