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
const extractMdbQuery = ({ id, owner, expiredAt, itemUrl, createdTime, updatedTime }) => {
    const mdbQuery = id ? { _id: id } :
        owner ? { owner } :
            expiredAt ? { expiredAt } :
                itemUrl ? { itemUrl } :
                    createdTime ? { createdTime } :
                        updatedTime ? { updatedTime } :
                            {};
    return mdbQuery;
};
/**************************************** EXPORTS */
/****** POST ONE *******/
export const storageReportPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at storageReportPostController" });
        }
        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>storageReportPostController: inserting body to db ');
        const postResponse = yield mdbInsertOne("portal-app", "storageReport", body);
        //expect postResponse is not null
        if (!postResponse) {
            console.log('>>>storageReportPostController: ERR', { code: 500, message: "internal server error at mongodb insert into storageReport collection " });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into storageReport collection " });
        }
        //expect return response postResponse
        console.log('>>>storageReportPostController: return post response');
        return res.status(200).json(postResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', { code: 500, message: "internal server error at mongodb insert into storageReport collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into storageReport collection ", error });
    }
});
/****** GET MANY *******/
export const storageReportGetController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery = extractMdbQuery(query);
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ');
        const getResponse = yield mdbFetch('portal-app', 'storageReport', mdbQuery);
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
        console.log('>>>storageReportPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
    }
});
/****** PATCH MANY *******/
export const storageReportPatchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at storageReportPatchController: no body request" });
            return res.status(400).json({ code: 400, message: "bad request at storageReportPatchController: no body request" });
        }
        // expect return object query
        let mdbQuery = extractMdbQuery(query);
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>storageReportPatchController: fetching documents from db ');
        const getResponse = yield mdbUpdateOne('portal-app', 'storageReport', body, mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>storageReportPatchController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection" });
        }
        //expect return response getResponse
        console.log('>>>storageReportPatchController: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error });
    }
});
/****** GET DOWNLOAD *******/
export const storageReportDownloadController = (req, res) => {
    try {
        const { body } = req;
        const { s3url } = body;
        if (!s3url) {
            console.log('>>>storageReportDownloadController: ERR', { code: 400, message: "bad request at storageReportDownloadController" });
            return res.status(400).json({ code: 400, message: "bad request at storageReportDownloadController" });
        }
        return res.redirect(body.s3url);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', { code: 500, message: "internal server error at storageReportDownloadController", error });
        return res.status(500).json({ code: 500, message: "internal server error at storageReportDownloadController", error });
    }
};
