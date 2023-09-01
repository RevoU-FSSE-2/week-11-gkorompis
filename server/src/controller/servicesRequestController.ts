import { NextFunction, Request, Response } from "express";
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

/**************************************** INTRINSIC OBJECTS */
type ServiceDocumentQuery = {
    requestedBy?: string, /* username */
    status?: string, /* approved, pending */
    requestedServices?: string[],  /* array of servicesCode */
    createdTime?: Date,
    updatedTime?: Date,
    id?: string,
}

type MdbQuery = ServiceDocumentQuery

const extractMdbQuery = ({id, requestedBy, status, requestedServices, createdTime, updatedTime}:MdbQuery) => {
    const mdbQuery = id ? {_id: id}: 
        requestedBy ? {requestedBy}:
        status ? {status}:
       requestedServices ? {requestedServices}:
        createdTime ? {createdTime}:
        updatedTime ? {updatedTime}:
        {};
    return mdbQuery;
}

/**************************************** EXPORTS */
/****** POST ONE *******/
export const servicesRequestPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:ServiceDocumentQuery = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at servicesRequestPostController"});
        }

        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>servicesRequestPostController: inserting body to db ')
        const postResponse = await mdbInsertOne("portal-app", "servicesRequest", body)

        //expect postResponse is not null
        if(!postResponse){
            console.log('>>>servicesRequestPostController: ERR', {code:500, message: "internal server error at mongodb insert into servicesRequest collection "})
            return res.status(500).json({code:500, message: "internal server error at mongodb insert into servicesRequest collection "});
        }

        //expect return response postResponse
        console.log('>>>servicesRequestPostController: return post response')
        return res.status(200).json(postResponse);
  
    } catch (error){
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', {code:500, message: "internal server error at mongodb insert into servicesRequest collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb insert into servicesRequest collection ", error});
    }
}

/****** GET MANY *******/
export const servicesRequestGetController = async (req: Request, res: Response, next: NextFunction) =>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        let mdbQuery:any = extractMdbQuery(query);
        //expect only self transaction if role is maker
        const {decodedRole, decodedUsername} = query as any;
        if(decodedRole!=="admin"){
            mdbQuery = {...mdbQuery, username: decodedUsername};
            console.log(">>>role is maker, get self query:", mdbQuery);
        }  
        const archived = {$ne: true};
        mdbQuery = {...mdbQuery, archived};
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ')
        const getResponse = await mdbFetch('portal-app', 'servicesRequest', mdbQuery);

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
        console.log('>>>servicesRequestPostController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error});
    }
}

/****** GET ONE *******/
export const servicesRequestGetOneController = async (req: Request, res: Response, next: NextFunction) =>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        // expect return object query
        // expect return object query
        if(!query){
            console.log('>>>servicesRequestPatchController: ERR', {code:400, message: "bad request no params at servicesRequestPatchController"})
        }       
        const {id} = params;
        let mdbQuery:any = extractMdbQuery({...query, id});

        //expect only self transaction if role is maker
        const {decodedRole, decodedUsername} = query as any;
        if(decodedRole!=="admin"){
            mdbQuery = {...mdbQuery, username: decodedUsername};
            console.log(">>>role is maker, get self query:", mdbQuery);
        }   
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesGetController: fetching documents from db ')
        const getResponse = await mdbFetch('portal-app', 'servicesRequest', mdbQuery);

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
        console.log('>>>servicesRequestPostController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error});
    }
}

/****** PATCH MANY *******/
export const servicesRequestPatchController=async (req:Request, res: Response, next:NextFunction)=>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at servicesRequestPatchController"});
        }
        // expect return object query
        if(!query){
            console.log('>>>servicesRequestPatchController: ERR', {code:400, message: "bad request no params at servicesRequestPatchController"})
            return res.status(400).json({code:400, message: "bad request no params at servicesRequestPatchController"});           
        }
        const {id} = params;
        let mdbQuery:any = extractMdbQuery({...query, id});
        const {decodedRole, decodedUsername} = query as any;     
        if(decodedRole!=="admin"){
            mdbQuery = {...mdbQuery, username: decodedUsername};
            console.log(">>>role is maker, get self query:", mdbQuery);
        }   
        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesRequestPatchController: fetching documents from db ')
        const getResponse = await mdbUpdateOne('portal-app', 'servicesRequest', body , mdbQuery);

        //expect getResponse is not null
        if(!getResponse){
            console.log('>>>servicesRequestPatchController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"})
            return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"});
        }

        //expect return response getResponse
        console.log('>>>servicesRequestPatchController: return Get response')
        return res.status(200).json(getResponse);
    } catch (error){
        //expect return error: internal server
        console.log('>>>servicesRequestPostController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection ", error});
    }   
}

/****** DELETE ONE *******/
export const servicesRequestDeleteOneController=async (req:Request, res: Response, next:NextFunction)=>{
    // extract request parameter, query, body, header
    const params = req.params;

    const query:ServiceDocumentQuery = req.query && req.query || {};
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at servicesRequestDeleteOneControlle"});
        }
        // expect return object query
        if(!query){
            console.log('>>>servicesRequestDeleteOneControlle: ERR', {code:400, message: "bad request no params at servicesRequestDeleteOneControlle"})
            return res.status(400).json({code:400, message: "bad request no params at servicesRequestDeleteOneControlle"});           
        }
        const {id} = params;
        let mdbQuery = extractMdbQuery({...query, id});

        //expect fetching documents from db by parameter: db instance, collection name, query object
        console.log('>>>servicesRequestDeleteOneControlle: fetching documents from db ')
        const getResponse = await mdbDeleteOne('portal-app', 'servicesRequest', mdbQuery);

        //expect getResponse is not null
        if(!getResponse){
            console.log('>>>servicesRequestDeleteOneController: ERR', {code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"})
            return res.status(500).json({code:500, message: "internal server error at mongodb fetch from serviesReqeust collection"});
        }

        //expect return response getResponse
        console.log('>>>servicesRequestDeleteOneControlle: return Get response')
        return res.status(200).json(getResponse);
    } catch (error){
        //expect return error: internal server
        console.log('>>>servicesRequestDeleteOneControlle: ERR', {code:500, message: "internal server error at servicesRequestDeleteOneControlle ", error})
        return res.status(500).json({code:500, message: "internal server error atservicesRequestDeleteOneControlle ", error});
    }   
}

