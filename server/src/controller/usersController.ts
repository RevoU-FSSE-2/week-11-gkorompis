import { Request, Response } from "express";
import {StandardError} from "../middleware/standardError.js"
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetchMany, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;

type UserDocument = {
    name: string,
    email: string,
    username: string, 
    password: string,
    ID?: string
}

export const usersPostController = async (req:any, res:any) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        //check body is not empty
        if(body){
            //post to db
            console.log('>>>connecting to mongodb insert')
            await mdbInsertOne("users", body)
            console.log('>>>insert sucess')
        } else {
            console.log({error:400, message: "bad request at users post"});
        }
    } catch (error){
        console.log({error, message: "internal server error at users post"});
    }
}