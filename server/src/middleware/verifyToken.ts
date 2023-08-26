import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { mdbFetch } from '../db/mongodbFunctions.js';

import '../loadenv.js'
const SECRET_KEY = process.env.SECRET_KEY;

type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    role?: string,
    ID?: string
}
type TransactionRequestStatus = {
    isApproved: boolean,
    isRejected: boolean,
    isDeleted: boolean,
}
type TransactionRequestTimestamp = {
    resolved?: Date,
    created?: Date,
    deleted?: Date,
    updated?: Date,
}
type TransactionDocumentQuery = {
    username?: string,
    type?: string,
    amount?: string, 
    status?: TransactionRequestStatus,
    timestamp?: TransactionRequestTimestamp,
    ID?: string
}

const setRequestTimestampUpdate =(body: TransactionDocumentQuery)=>{
   if(body.timestamp){
    body.timestamp["updated"] = new Date();
   }
   return body;
};



export const verifyToken = async (req: Request, res: Response, next: NextFunction) =>{
    // get header token
    console.log(">>>get header authorization:", req)
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.status(401).json({ message: 'Token missing' });

    const token = authorizationHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });
        console.log('>>>token retrieved from header|',"||", token);
     
    // verify
    jwt.verify(token, SECRET_KEY as string, async (err, decoded) => {
        console.log('err/user', err);
        if (err) return res.status(403).json({ message: 'Token invalid or Expired' });

        const {username, role} = decoded as UserDocumentQuery;

        // expect user document
        const mdbQuery = {username};
        const getResponse = await mdbFetch("howmuch-app", "users", mdbQuery);
        const userDb = getResponse && getResponse[0];

        // expect user is not null
        if(!userDb) {
            console.log({error:403, message: "unauthorized access, username not matched"});
            return res.status(403).json({error:403, message: "unauthorized access"});
        }
        if(!role){
            console.log({error:403, message: "unauthorized access, role not matched"});
            return res.status(403).json({error:403, message: "unauthorized access"});
        }

        // modifty request status and timestbody
        req.query["decodedRole"] = role;
        req.query["decodedUsername"] = username;
        req.body["status"] = {};
        req.body["timestamp"] = {};
        req.body = setRequestTimestampUpdate(req.body);
        console.log('>>> veriy token', req);
        next();
    });
}