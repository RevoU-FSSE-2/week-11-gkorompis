import { Request, Response } from "express";
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

/**************************************** INTRINSIC OBJECTS */
type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    role?:string,
    ID?: string
}
type MdbQuery = {id: string} & UserDocumentQuery

const extractMdbQuery = ({id, username, name, email, ID}:MdbQuery) => {
    const mdbQuery = id ? {ID: id}: 
        username ? {username}:
        name ? {name}:
        email ? {email}:
        ID ? {ID}:{};
    return mdbQuery;
}

/**************************************** EXPORTS */
/****** POST ONE *******/
export const usersPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at usersPostController"});
        }

        //expect inserting parameter db instance, collection name, and payload to db
        console.log('>>>usersPostController: inserting body to db ')
        const postResponse = await mdbInsertOne("portal-app", "users", body)

        //expect postResponse is not null
        const {error} = postResponse as any;
        if(!postResponse || error){
            console.log('>>>usersPostController: ERR', {code:500, message: "internal server error at mongodb insert into users collection", error})
            return res.status(500).json({code:500, message: "internal server error at mongodb insert into users collection", error});
        }

        //expect return post postResponse
        console.log('>>>usersPostController: return post response')
        res.status(200).json(postResponse);
  
    } catch (error){
        //expect return error: internal server
        console.log('>>>usersPostController: ERR', {code:500, message: "internal server error at mongodb insert into users collection ", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb insert into users collection ", error});
    }
}