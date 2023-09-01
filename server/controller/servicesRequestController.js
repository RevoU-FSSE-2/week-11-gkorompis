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
const extractMdbQuery = ({ id, requestedBy, status, requestedServices, createdTime, updatedTime }) => {
    const mdbQuery = id ? { _id: id } :
        requestedBy ? { requestedBy } :
            status ? { status } :
                requestedServices ? { requestedServices } :
                    createdTime ? { createdTime } :
                        updatedTime ? { updatedTime } :
                            {};
    return mdbQuery;
};
/**************************************** EXPORTS */
/****** POST ONE *******/
export const servicesRequestPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at servicesRequestPostController" });
        }
        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>servicesRequestPostController: inserting body to db ');
        const postResponse = yield mdbInsertOne("portal-app", "servicesRequest", body);
        //expect postResponse is not null
        if (!postResponse) {
            console.log('>>>servicesRequestPostController: ERR', { code: 500, message: "internal server error at mongodb insert into servicesRequest collection " });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into servicesRequest collection " });
        }
        //expect return response postResponse
        console.log('>>>servicesRequestPostController: return post response');
        return res.status(200).json(postResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', { code: 500, message: "internal server error at mongodb insert into servicesRequest collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into servicesRequest collection ", error });
    }
});
/****** GET MANY *******/
export const servicesRequestGetController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery = extractMdbQuery(query);
        //expect only self transaction if role is maker
        const { decodedRole, decodedUsername } = query;
        if (decodedRole !== "admin") {
            mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
            console.log(">>>role is maker, get self query:", mdbQuery);
        }
        const archived = { $ne: true };
        mdbQuery = Object.assign(Object.assign({}, mdbQuery), { archived });
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ');
        const getResponse = yield mdbFetch('portal-app', 'servicesRequest', mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>servicesGetController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
        }
        //expect return response getResponse
        console.log('>>>servicesGetController: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
    }
});
/****** GET ONE *******/
export const servicesRequestGetOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        // expect return object query
        if (!query) {
            console.log('>>>servicesRequestPatchController: ERR', { code: 400, message: "bad request no params at servicesRequestPatchController" });
        }
        const { id } = params;
        let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        //expect only self transaction if role is maker
        const { decodedRole, decodedUsername } = query;
        if (decodedRole !== "admin") {
            mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
            console.log(">>>role is maker, get self query:", mdbQuery);
        }
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ');
        const getResponse = yield mdbFetch('portal-app', 'servicesRequest', mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>servicesGetController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
        }
        //expect return response getResponse
        console.log('>>>servicesGetController: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
    }
});
/****** PATCH MANY *******/
export const servicesRequestPatchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at servicesRequestPatchController" });
        }
        // expect return object query
        if (!query) {
            console.log('>>>servicesRequestPatchController: ERR', { code: 400, message: "bad request no params at servicesRequestPatchController" });
            return res.status(400).json({ code: 400, message: "bad request no params at servicesRequestPatchController" });
        }
        const { id } = params;
        let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        const { decodedRole, decodedUsername } = query;
        if (decodedRole !== "admin") {
            mdbQuery = Object.assign(Object.assign({}, mdbQuery), { username: decodedUsername });
            console.log(">>>role is maker, get self query:", mdbQuery);
        }
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesRequestPatchController: fetching documents from db ');
        const getResponse = yield mdbUpdateOne('portal-app', 'servicesRequest', body, mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>servicesRequestPatchController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
        }
        //expect return response getResponse
        console.log('>>>servicesRequestPatchController: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
    }
});
/****** DELETE ONE *******/
export const servicesRequestDeleteOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at servicesRequestDeleteOneControlle" });
        }
        // expect return object query
        if (!query) {
            console.log('>>>servicesRequestDeleteOneControlle: ERR', { code: 400, message: "bad request no params at servicesRequestDeleteOneControlle" });
            return res.status(400).json({ code: 400, message: "bad request no params at servicesRequestDeleteOneControlle" });
        }
        const { id } = params;
        let mdbQuery = extractMdbQuery(Object.assign(Object.assign({}, query), { id }));
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesRequestDeleteOneControlle: fetching documents from db ');
        const getResponse = yield mdbDeleteOne('portal-app', 'servicesRequest', mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>servicesRequestDeleteOneController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
        }
        //expect return response getResponse
        console.log('>>>servicesRequestDeleteOneControlle: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesRequestDeleteOneControlle: ERR', { code: 500, message: "internal server error at servicesRequestDeleteOneControlle ", error });
        return res.status(500).json({ code: 500, message: "internal server error atservicesRequestDeleteOneControlle ", error });
    }
});
