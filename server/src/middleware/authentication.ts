import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import MdbCrud from "../db/mdbCrud.js";
import '../loadenv.js';

/**************************************** INTRINSIC OBJECTS */
type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    role?:string,
    ID?: string
}
const crud = new MdbCrud();
const {mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne} = crud;
const SECRET_KEY = process.env.SECRET_KEY;

/**************************************** EXPORTS */
//expect login user is already existed in database
export const verifyLoginUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        //expect body is not null
        const {body} = req;
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at verifyLoginUser"});  
        }

        //expect get userdb based on login username
        const {username, password} = body;
        const mdbQuery = {username};
        const getResponse = await mdbFetch('portal-app', 'users', mdbQuery);
        const userDb = getResponse && getResponse[0]

        //expect userDb is not null
        if(!userDb){
            console.log({error:403, message: "unauthorized access, username is not found"});
            return res.status(403).json({error:403, message: "unauthorized access"});            
        }

        //expect login password is the same in db
        const pass_hashed = userDb?.password;
        const pass_login = password;
        const passwordMatches = await bcrypt.compare(pass_login, pass_hashed);
        console.log(">>> verifyLoginUser: passwordMatches", passwordMatches)
        if(!passwordMatches){
            console.log({error:403, message: "unauthorized access, password not matched", match: passwordMatches});
            res.status(403).json({error:403, message: "unauthorized access", match: passwordMatches});
        }
        req.body = {...body, ...userDb};        
        next();
    } catch (error){
        //expect return error: internal server
        console.log('>>>verifyLoginUser: ERR', {code:500, message: "internal server error verifyLoginUser", error})
        return res.status(500).json({code:500, message: "internal server error at verifyLoginUser", error});
    }
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        //expect body is not null
        const {body, headers, method} = req;
        if(!body && method=='POST'){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at verifyToken"});  
        }

        //expect authorization field from request header
        console.log(">>> verifyToken: get header authorization", headers)
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) return res.status(400).json({ message: 'Bad request headers at verifyToken' });

        //expect token is found
        const token = authorizationHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Bad request headers at verifyToken' });
        console.log(">>> verifyToken: token is retrieved", token)

        //jwt verify
        jwt.verify(token, SECRET_KEY as string, async (err, decoded) => {   
            console.log('err/user', err);
            if (err) return res.status(403).json({ message: 'Token invalid or Expired' });

            const {username, role} = decoded as UserDocumentQuery;
            console.log(">>> verifyToken",decoded);
            // expect user document is existed
            const mdbQuery = {username};
            console.log(">>> verifyToken: fetch user document based on", mdbQuery)
            const getResponse = await mdbFetch("portal-app", "users", mdbQuery);
            const userDb = getResponse && getResponse[0];
            if(!userDb) {
                console.log({error:403, message: "unauthorized access, username not matched"});
                return res.status(403).json({error:403, message: "unauthorized access, username is not matched"});
            }
            
            // expect role existed
            if(!role){
                console.log({error:403, message: "unauthorized access, role not matched"});
                return res.status(403).json({error:403, message: "unauthorized access, role is not matched"});
            }

            // modifty request status and timestbody
            req.query["decodedRole"] = role;
            req.query["decodedUsername"] = username;
            console.log('>>> verifyToken', req);
            next();
        });      
    } catch (error){
        //expect return error: internal server
        console.log('>>>verifyToken: ERR', {code:500, message: "internal server error verifyToken", error})
        return res.status(500).json({code:500, message: "internal server error at verifyToken", error});
    }
};

