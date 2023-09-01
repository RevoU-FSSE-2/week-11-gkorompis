import { NextFunction, Request, Response } from "express";

import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

/**************************************** INTRINSIC OBJECTS */
type ServiceDocumentQuery = {
    owner?: string[],
    expiredAt?: Date,
    itemUrl?: string,
    createdTime?: Date,
    updatedTime?: Date,
    id?: string,
}

type MdbQuery = ServiceDocumentQuery

const extractMdbQuery = ({id, owner, expiredAt, itemUrl, createdTime, updatedTime}:MdbQuery) => {
    const mdbQuery = id ? {_id: id}: 
        owner ? {owner}:
        expiredAt ? {expiredAt}:
       itemUrl ? {itemUrl}:
        createdTime ? {createdTime}:
        updatedTime ? {updatedTime}:
        {};
    return mdbQuery;
}

/**************************************** EXPORTS */
/****** POST ONE *******/
export const storageReportPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:ServiceDocumentQuery = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at storageReportPostController"});
        }

        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>storageReportPostController: inserting body to db ')
        const postResponse = await mdbInsertOne("portal-app", "storageReport", body)

        //expect postResponse is not null
        if(!postResponse){
            console.log('>>>storageReportPostController: ERR', {code:500, message: "internal server error at mongodb insert into storageReport collection "})
            return res.status(500).json({code:500, message: "internal server error at mongodb insert into storageReport collection "});
        }

        //expect return response postResponse
        console.log('>>>storageReportPostController: return post response')
        return res.status(200).json(postResponse);
  
    } catch (error){
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', {code:500, message: "internal server error at mongodb insert into storageReport collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb insert into storageReport collection ", error});
    }
}

/****** GET MANY *******/
export const storageReportGetController = async (req: Request, res: Response, next: NextFunction) =>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery = extractMdbQuery(query);

        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ')
        const getResponse = await mdbFetch('portal-app', 'storageReport', mdbQuery);

        //expect getResponse is not null
        if(!getResponse){
            console.log('>>>servicesGetController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"})
            return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"});
        }

        //expect return response getResponse
        console.log('>>>servicesGetController: return Get response')
        return res.status(200).json(getResponse);
    } catch (error){
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error});
    }
}

/****** PATCH MANY *******/
export const storageReportPatchController=async (req:Request, res: Response, next:NextFunction)=>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at storageReportPatchController: no body request"});
            return res.status(400).json({code:400, message: "bad request at storageReportPatchController: no body request"});
        }
        // expect return object query
        let mdbQuery = extractMdbQuery(query);

        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>storageReportPatchController: fetching documents from db ')
        const getResponse = await mdbUpdateOne('portal-app', 'storageReport', body , mdbQuery);

        //expect getResponse is not null
        if(!getResponse){
            console.log('>>>storageReportPatchController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"})
            return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"});
        }

        //expect return response getResponse
        console.log('>>>storageReportPatchController: return Get response')
        return res.status(200).json(getResponse);
    } catch (error){
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error});
    }   
}

/****** GET DOWNLOAD *******/

export const storageReportDownloadController = (req: Request, res: Response) =>{
    try {
        const {body} = req as any;
        const {s3url} = body;
        if(!s3url){
            console.log('>>>storageReportDownloadController: ERR', {code:400, message: "bad request at storageReportDownloadController"})
            return res.status(400).json({code:400, message: "bad request at storageReportDownloadController"});        
        }
        return res.redirect(body.s3url) ;         
    } catch (error){
        //expect return error: internal server
        console.log('>>>storageReportPostController: ERR', {code:500, message: "internal server error at storageReportDownloadController", error})
        return res.status(500).json({code:500, message: "internal server error at storageReportDownloadController", error});
    }
};