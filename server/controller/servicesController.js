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
const extractMdbQuery = ({ id, serviceCode, serviceName, permission, createdTime, updatedTime }) => {
    const mdbQuery = id ? { _id: id } :
        serviceCode ? { serviceCode } :
            serviceName ? { serviceName } :
                permission ? { permission } :
                    createdTime ? { createdTime } :
                        updatedTime ? { updatedTime } :
                            {};
    return mdbQuery;
};
/**************************************** EXPORTS */
/****** POST ONE *******/
export const servicesPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at servicesPostController" });
        }
        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>servicesPostController: inserting body to db ');
        const postResponse = yield mdbInsertOne("portal-app", "services", body);
        //expect postResponse is not null
        if (!postResponse) {
            console.log('>>>servicesPostController: ERR', { code: 500, message: "internal server error at mongodb insert into services collection " });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into services collection " });
        }
        //expect return response postResponse
        console.log('>>>servicesPostController: return post response');
        return res.status(200).json(postResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesPostController: ERR', { code: 500, message: "internal server error at mongodb insert into services collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb insert into services collection ", error });
    }
});
/****** GET MANY *******/
export const servicesGetGontroller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery = extractMdbQuery(query);
        console.log(">>> servicesGetController mdbquery:", mdbQuery);
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ');
        const getResponse = yield mdbFetch('portal-app', 'services', mdbQuery);
        //expect getResponse is not null
        if (!getResponse) {
            console.log('>>>servicesgetController: ERR', { code: 500, message: "internal server error at mongodb fetch from services collection" });
            return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from services collection" });
        }
        //expect return response getResponse
        console.log('>>>servicesGetController: return Get response');
        return res.status(200).json(getResponse);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>servicesPostController: ERR', { code: 500, message: "internal server error at mongodb fetch from services collection ", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch from services collection ", error });
    }
});
