import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const {mdbFetch} = crud;
import jwt from 'jsonwebtoken';

import '../loadenv.js'
const SECRET_KEY = process.env.SECRET_KEY;

/****** INTRINSIC OBJECTS*******/
type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    role?: string,
    ID?: string
}
// type MdbQuery = {id: string} & UserDocumentQuery

/****** EXPORTS *******/

/****** POST ONE *******/
export const authPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    // const params = req.params;
    // const query:UserDocumentQuery = req.query;
    const body = req.body;
    if(body){
        // expect return username and password from request
        const {username, password} = body;
        const mdbQuery = {username};

        // expect user document
        const getResponse = await mdbFetch("howmuch-app", "users", mdbQuery);
        const userDb = getResponse && getResponse[0];

        // expect user is not null
        if(!userDb) {
            console.log({error:403, message: "unauthorized access, username not matched"});
            return res.status(403).json({error:403, message: "unauthorized access"});
        }
        console.log(">>> userDB", userDb)

        // expect user password matches login password
        // Compare the entered password with the stored hash

        const pass_hashed = userDb?.password;
        const pass_login = password;
        console.log({pass_login, pass_hashed})
        const passwordMatches = await bcrypt.compare(pass_login, pass_hashed);
        if(!passwordMatches){
            console.log({error:403, message: "unauthorized access, password not matched", match: passwordMatches});
            res.status(403).json({error:403, message: "unauthorized access", match: passwordMatches});
        }

        // expect returns login token
        console.log(">>> bcrypt result", passwordMatches)
        const token = jwt.sign(userDb as UserDocumentQuery, SECRET_KEY as string,{expiresIn: '30m'});
        return res.status(200).json(token);
    } else {
        console.log({error:401, message: "invalid request body"});
    }
}