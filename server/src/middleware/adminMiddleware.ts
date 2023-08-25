import {Request, Response, NextFunction} from 'express';

const permissions = ["admin"]
const setRequestTimestamp =(timestamp:string, body:any)=>{
   if(body.timestamp){
    body.timestamp[timestamp] = new Date();
   }
   return body;
};
export const updateRequestDeleted = async (req: Request, res: Response, next: NextFunction) =>{
    // expect body status
    const {body, query} = req;
    const {decodedRole} = query;
    if(!permissions.includes(decodedRole as string)){
        console.log(">>> unauthorized access:", {error:403, message: "unauthorized role"})
        return res.status(403).json({error:400, message: "unauthorized role"});
    }
    if (!body){
        console.log(">>> bad request body:",{error:400, message: "bad request body"})
        return res.status(400).json({error:400, message: "bad request body"});
    }
    const {status} = body;
    if (!status){
        console.log(">>> bad request body:",{error:400, message: "bad request body - no status found"})
        return res.status(400).json({error:400, message: "bad request body - no status found"});
    }
    req.body.status["isApproved"] = false;
    req.body.status["isRejected"] = false;
    req.body.status["isDeleted"] = true;
    req.body = setRequestTimestamp("updated", req.body)
    next()
}