import { Request, Response, NextFunction } from 'express';
import MdbCrud from "../db/mdbCrud.js";
import bcrypt from 'bcryptjs';

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

/**************************************** EXPORTS */
export const hashPassword = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        //expect body is not null
        const {body} = req;
        if(!body){
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: body not found" })
        }

        //expect username is not null
        const {username, password} = req.body;
        if(!(username || username=="")){
            console.log(">>> hashPassword: hashing bcrypt", { code: 400, message:"bad request at middleware hashPassword: username is not found" })
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: username is not found"})
        }

        //expect password is not null
        if(!(password || password=="")){
            console.log(">>> hashPassword: hashing bcrypt", { code: 400, message:"bad request at middleware hashPassword: password is not found"})
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: password is not found"})
        }

        //expect password alphanumeric and minimal 8 digit
        const pattern = /^[a-zA-Z0-9]+$/
        if(!(pattern.test(password) && password.length>=8)){
            console.log(">>> hashPassword: hashing bcrypt", { code: 400, message:"bad request at middleware hashPassword: password is not alphanumeric or less then 8 digit"})
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: password is not alphanumeric or less then 8 digit"})
        }

        //expect username is not existed
        const mdbQuery = {username}
        const getResponse:any = await mdbFetch('portal-app', 'users', mdbQuery);
        const userDb = getResponse && getResponse[0]

        if(userDb){
            console.log(">>> hashPassword: username is already existed", { code: 409, message:"bad request at middleware hashPassword: username is already existed"})
            return res.status(403).json({ code: 409, message:"bad request at middleware hashPassword: username is already existed"})
        }        

        //expect return hash strings
        console.log(">>> hashPassword: hashing bcrypt ")
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //expect password is hashed
        if (!hashedPassword) {
            return res.status(500).json({ error: 'Failed to hash password' });
        }
        req.body.password = hashedPassword;
        console.log(">>> hashPassword: hashed success", hashPassword)
        next();
    } catch(error){
        console.log({code:500, message: "internal server error", error});        
    }
}