import { Request, Response } from "express"; 
import jwt from 'jsonwebtoken'; 
import '../loadenv.js';

const SECRET_KEY = process.env.SECRET_KEY;

/**************************************** INTRINSIC OBJECTS */
type UserDocumentQuery = {
    name?: string,
    email?: string,
    username?: string, 
    password?: string,
    role?: string,
    ID?: string
}
// type MdbQuery = {id: string} & UserDocumentQuery

/**************************************** EXPORTS */
/****** POST ONE *******/
export const authPostController = async (req:Request, res:Response) =>{
    // extract request parameter, query, body, header
    const params = req.params;
    const query:UserDocumentQuery = req.query;
    const body:UserDocumentQuery = req.body;
    try {
        // expect request body is not null
        if(!body){
            //expect return error: body is undefined
            console.log({code:400, message: "bad request at authPostController"});
        }
            //expect jwt sign return token messages
            const loginInfo = body;
            const token = jwt.sign(loginInfo as UserDocumentQuery, SECRET_KEY as string, {expiresIn: '30m'});
            return res.status(200).json(token);         
    } catch (error){
       //expect return error: internal server
        console.log('>>>authPostController: ERR', {code:500, message: "internal server error at authPostController", error})
        return res.status(500).json({code:500, message: "internal server error at mongodb fetch for authPostController", error});       
    }
};