import { Request, Response, NextFunction } from 'express';
import MdbCrud from "../db/mdbCrud.js"; 

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
export const serviceUnique  = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        //expect body is not null
        const {body} = req;
        if(!body){
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: body not found" })
        }

        //expect service is not existed
        const {serviceName} = body;
        const mdbQuery = {serviceName}
        const getResponse: any = await mdbFetch('portal-app', 'services', mdbQuery);
        const serviceDb = getResponse && getResponse[0]

        if(serviceDb){
            console.log(">>> hashPassword: service name is already existed", { code: 400, message:"bad request at middleware hashPassword: service name is already existed"})
            return res.status(400).json({ code: 400, message:"bad request at middleware hashPassword: service name is already existed"})
        } 
        next();
    } catch(error){
        console.log({code:500, message: "internal server error", error});        
    }
}