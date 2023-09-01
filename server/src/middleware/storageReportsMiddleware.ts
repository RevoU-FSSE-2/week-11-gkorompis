import {Request, Response, NextFunction} from 'express';
import { PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import '../loadenv.js';

/**************************************** INTRINSIC OBJECTS */

//types
type ReportQuery = {
    filename?: string,
    decodedRole?: string,
    decodedUsername?: string,
}
type StorageReportDocument = {
    owner?: string[],
    expiredAt?: string,
    bucketKey?: string,
    createdTime?: Date,
    updatedTime?: Date
}

const BUCKET = process.env.BUCKET;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY as string;

const client = new S3Client({ 
    region: "ap-southeast-3",
    credentials: {accessKeyId:ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY}
});


const emptyUploadFolder = () =>{
    try {
    const folderPath = "/tmp";
    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file);
        // Check if it's a file (not a directory) before deleting
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
            console.log('Deleted:', filePath);
        }
    });
        console.log('>>> emptyUploadFolder All files in the folder have been deleted.');   
    } catch(error){
        console.log('>>>error at emptyUploadFolder', error);
        return ;    
    }
}

const getDirFilesList =  (path:string)=>{
    const directoryPath = path;
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        console.log('Files in the directory:');
        files.forEach(file => {
            console.log("file in directory:", file);
        });
        return files;
    });
}
/**************************************** EXPORTS */

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, '/tmp'); // Folder where files will be stored
    },
    filename: (req:any, file:any, cb:any) => {
        cb(null, file.originalname); // Keep the original filename
    },
});

// multer upload
export const uploadFileToServer = multer({ storage: storage })


// upload to S3
export const uploadFromServerToS3 = async (req:any, res:Response, next: NextFunction) =>{
    try {
        console.log(">>>uploadFromServerToS3:initiating...")
        console.log(">>>uploadFromServerToS3:initiating...", req["file"]);
        //get filename from query
        const {query, file} = req;
        //expect query is not null
        if(!query){
            console.log({code:400, message: "bad request at middleware uploadFromServerToS3"})
            return res.status(400).json({code:400, message: "bad request at middleware uploadFromServerToS3"});           
        }
        if(!file){
            console.log({code:400, message: "bad request at middleware uploadFromServerToS3: filename not found"})
            return res.status(400).json({code:400, message: "bad request at middleware uploadFromServerToS3: filename not found"});           
        }        

        //expect read file from upload directory in local server
        const {decodedRole, decodedUsername} = query as ReportQuery;
        const {filename} = file;
        const filePath = `/tmp/${filename}`;
        const fileData = await fs.promises.readFile(filePath);
        console.log('>>>uploadFromServerToS3: fileDate-', fileData);
        console.log('>>>uploadFromServerToS3: fileDate-', fileData.toString());

        //expect read file from upload directory in local server
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: filename,
            Body: fileData,
        });

         try {
            console.log('>>> uploadFromServerToS3: get tmp directory file lists...');
            getDirFilesList('/tmp');
            console.log('>>> uploadFromServerToS3: tmp dir file lists');
            //expect to return promise response: sending filename to s3
            const response = await client.send(command);
            console.log('>>> uploadFromServerToS3: response client.send',response);
            if(response){
                emptyUploadFolder();
            }
            const owner = [decodedUsername];
            var currentDate = new Date();
            const expiredAt = new Date(currentDate.getTime() + (7 * 60 * 60 * 1000));
            const bucketKey = filename;
            req.body.owner = owner;
            req.body.expiredAt = expiredAt;
            req.body.bucketKey= bucketKey;
            delete req.body.file;
            next(); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({code:500, message: "internal server error at middleware uploadFromServerToS3", error});
        }
    } catch (error){
        //expect return error: internal server
        console.log('>>> uploadFromServerToS3: ERR', {code:500, message: "internal server error at middleware uploadFromServerToS3", error})
        return res.status(500).json({code:500, message: "internal server error at middleware uploadFromServerToS3", error});
    }
}


//download from s3
export const getSignedS3Url = async (req:any, res:Response, next: NextFunction) =>{
    try {
        const {params} = req;
        if(!params){
            console.log({code:400, message: "bad request at middleware getSignedS3Url"})
            return res.status(400).json({code:400, message: "bad request at middleware getSignedS3Url"});           
        }    
        const {bucketKey} = params;
        if(!bucketKey){
            console.log({code:400, message: "bad request at storageReportDownloadGetController: no bucket key params"});
            return res.status(400).json({code:400, message: "bad request at storageReportDownloadGetController: no bucket key params"});
        };
        const command = new GetObjectCommand({Bucket: 'portal-app-uploads', Key: bucketKey });
        console.log(">>>getSignedS3Url: getting s3 url...")
        const s3url = await getSignedUrl(client, command, { expiresIn: 15 * 60 }); // expires in seconds
        console.log(">>>getSignedS3Url: s3 url -", s3url)
        //get filename from query
        req.body.s3url = s3url;
        console.log(">>>getSignedS3Url: req body -", req.body);
        next()
    } catch (error){
        //expect return error: internal server
        console.log('>>> getSignedS3Url: ERR', {code:500, message: "internal server error at middleware getSignedS3Url", error})
        return res.status(500).json({code:500, message: "internal server error at middleware getSignedS3Url", error});
    }
}
