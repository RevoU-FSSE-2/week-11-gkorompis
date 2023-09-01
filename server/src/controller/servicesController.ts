import { NextFunction, Request, Response } from "express";
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

/**************************************** INTRINSIC OBJECTS */
type ServiceDocumentQuery = {
    serviceName?: string,
    serviceCode?: string,
    permission?: string[],
    createdTime?: Date,
    updatedTime?: Date,
    id?: string
}
type MdbQuery = ServiceDocumentQuery

const extractMdbQuery = ({id, serviceCode, serviceName, permission, createdTime, updatedTime}:MdbQuery) => {
    const mdbQuery = id ? {_id: id}: 
        serviceCode ? {serviceCode}:
        serviceName ? {serviceName}:
        permission ? {permission}:
        createdTime ? {createdTime}:
        updatedTime ? {updatedTime}:
        {};
    return mdbQuery;
}

/**************************************** EXPORTS */
/****** POST ONE *******/
export const servicesPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:ServiceDocumentQuery = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at servicesPostController"});
        }

        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>servicesPostController: inserting body to db ')
        const postResponse = await mdbInsertOne("portal-app", "services", body)

        //expect postResponse is not null
        if(!postResponse){
            console.log('>>>servicesPostController: ERR', {code:500, message: "internal server error at mongodb insert into services collection "})
            return res.status(500).json({code:500, message: "internal server error at mongodb insert into services collection "});
        }

        //expect return response postResponse
        console.log('>>>servicesPostController: return post response')
        return res.status(200).json(postResponse);
  
    } catch (error){
        //expect return error: internal server
        console.log('>>>servicesPostController: ERR', {code:500, message: "internal server error at mongodb insert into services collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb insert into services collection ", error});
    }
}

/****** GET MANY *******/
export const servicesGetGontroller = async (req: Request, res: Response, next: NextFunction) =>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery = extractMdbQuery(query);
        console.log(">>> servicesGetController mdbquery:", mdbQuery)

        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ')
        const getResponse = await mdbFetch('portal-app', 'services', mdbQuery);

        //expect getResponse is not null
        if(!getResponse){
            console.log('>>>servicesgetController: ERR', {code:500, message: "internal server error at mongodb fetch from services collection"})
            return res.status(500).json({code:500, message: "internal server error at mongodb fetch from services collection"});
        }

        //expect return response getResponse
        console.log('>>>servicesGetController: return Get response')
        return res.status(200).json(getResponse);
    } catch (error){
        //expect return error: internal server
        console.log('>>>servicesPostController: ERR', {code:500, message: "internal server error at mongodb fetch from services collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from services collection ", error});
    }
}