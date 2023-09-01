import {Request, Response, NextFunction} from 'express';
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