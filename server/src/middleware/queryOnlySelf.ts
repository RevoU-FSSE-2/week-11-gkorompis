import {Request, Response, NextFunction} from 'express';


export const queryOnlySelf = async (req: Request, res: Response, next: NextFunction) => {
    // expect role maker
    const {decoderRole, decodedUsername}  =req.query;

    // get many only self
    if(decoderRole=='maker'){
        if(req.query){
            req.query["username"] = decodedUsername;
        }
    }
    console.log(">>>query only self:", req.query)
    next()
};