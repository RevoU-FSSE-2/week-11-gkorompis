import {Request, Response, NextFunction} from 'express';

type TransactionRequestStatus = {
    isApproved: boolean,
    isRejected: boolean,
    isDeleted: boolean,
}
type TransactionRequestTimestamp = {
    resolved?: Date,
    created?: Date,
    deleted?: Date
}
type TransactionDocumentQuery = {
    username?: string,
    type?: string,
    amount?: string, 
    status?: TransactionRequestStatus,
    timestamp?: TransactionRequestTimestamp,
    ID?: string,
    decodedRole?: string,
    decoderUsername?: string,
}

const permissions = ["admin", "approver", "maker"]

const setRequestStatusDefault =(body: TransactionDocumentQuery)=>{
   if(body.status){
    body.status["isApproved"] = false;
    body.status["isRejected"] = false;
    body.status["isDeleted"] = false;
   }
   return body;
};



const setRequestTimestampDefault =(body: TransactionDocumentQuery)=>{
   if(body.timestamp){
    body.timestamp["created"] = new Date();
    body.timestamp["resolved"] = undefined;
    body.timestamp["deleted"] = undefined;
   }
   return body;
};

const setRequestTimestamp =(timestamp:string, body:any)=>{
   if(body.timestamp){
    body.timestamp[timestamp] = new Date();
   }
   return body;
};

export const updateRequestPending = async (req: Request, res: Response, next: NextFunction) =>{
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
    req.body = setRequestStatusDefault(req.body);
    req.body = setRequestTimestampDefault(req.body);
    req.body = setRequestTimestamp("updated", req.body)
    next()
}