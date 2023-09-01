import {Request, Response, NextFunction} from 'express';
/**************************************** INTRINSIC OBJECTS */
type ServiceRequestQuery = {
    requestedBy?: string,
    status?: string,
    requestedServices?: string[],
    createdTime?: Date,
    updatedTime?: Date,
    decodedRole?: string,
    decodedUsername?: string,
    id?: string
}

/**************************************** EXPORTS */

export const approveServicesRequest = async(req:Request, res:Response, next: NextFunction) =>{
    try {
        if(!req.hasOwnProperty("body")){
            console.log({code:400, message: "bad request at middleware approveServiceRequest"})
            return res.status(400).json({code:400, message: "bad request at middleware approveServiceRequest"});
        }
        req.body['status'] = 'approved';
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>>approveServiceRequest: ERR', {code:500, message: "internal server error at middleware approveServiceRequest ", error})
        return res.status(500).json({code:500, message: "internal server error at middleware approveServiceRequest ", error});
    }
}
export const rejectServicesRequest = async(req:Request, res:Response, next: NextFunction) =>{
    try {
        if(!req.hasOwnProperty("body")){
            console.log({code:400, message: "bad request at middleware rejectServicesRequest"})
            return res.status(400).json({code:400, message: "bad request at middleware rejectServicesRequest"});
        }
        req.body['status'] = 'rejected';
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>> rejectServicesRequest: ERR', {code:500, message: "internal server error at middleware rejectServicesRequest", error})
        return res.status(500).json({code:500, message: "internal server error at middleware rejectServicesRequest", error});
    }
}
export const softDeleteServicesRequest = async(req:Request, res:Response, next: NextFunction) =>{
    try {
        if(!req.hasOwnProperty("body")){
            console.log({code:400, message: "bad request at middleware softDeleteServicesRequest"})
            return res.status(400).json({code:400, message: "bad request at middleware softDeleteServicesRequest"});
        }
        req.body['archived'] = true;
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>>softDeleteServicesRequest: ERR', {code:500, message: "internal server error at middleware softDeleteServicesRequest ", error})
        return res.status(500).json({code:500, message: "internal server error at middleware softDeleteServicesRequest ", error});
    }
}
export const pendingServiceRequest = async(req:Request, res:Response, next: NextFunction) =>{
    try {
        if(!req.hasOwnProperty("body")){
            console.log({code:400, message: "bad request at middleware pendingServiceRequest"})
            return res.status(400).json({code:400, message: "bad request at middleware pendingServiceRequest"});
        }
        req.body['status'] = "pending";
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>>pendingServiceRequest: ERR', {code:500, message: "internal server error at middleware pendingServiceRequest ", error})
        return res.status(500).json({code:500, message: "internal server error at middleware pendingServiceRequest ", error});
    }
}

export const restrictViewServiceRequest = async(req:Request, res:Response, next: NextFunction) =>{
    try {
        if(!req.hasOwnProperty("query")){
            console.log({code:400, message: "bad request at middleware restrictViewServiceRequest"})
            return res.status(400).json({code:400, message: "bad request at middleware restrictViewServiceRequest"});
        }
        const access = ["admin"]
        const {decodedRole} = req.query as ServiceRequestQuery;
        if(!decodedRole){
            return res.status(500).json({code:400, message: "bad request at middleware restrictViewServiceRequest no decodedRole"});
        }
        
        console.log(">>>restrictViewServiceRequest: permission access", decodedRole,access.includes(decodedRole));
        if(!access.includes(decodedRole)){
            return res.status(500).json({code:403, message: "unauthorized role permission to access collections"});
        }
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>>restrictViewServiceRequest: ERR', {code:500, message: "internal server error at middleware restrictViewServiceRequest ", error})
        return res.status(500).json({code:500, message: "internal server error at middleware restrictViewServiceRequest ", error});
    }
}