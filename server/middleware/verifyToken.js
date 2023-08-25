var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { mdbFetch } from '../db/mongodbFunctions.js';
import '../loadenv.js';
const SECRET_KEY = process.env.SECRET_KEY;
const setRequestTimestampUpdate = (body) => {
    if (body.timestamp) {
        body.timestamp["updated"] = new Date();
    }
    return body;
};
export const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get header token
    console.log(">>>get header authorization:", req);
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader)
        return res.status(401).json({ message: 'Token missing' });
    const token = authorizationHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Token missing' });
    console.log('>>>token retrieved from header|', "||", token);
    // verify
    jwt.verify(token, SECRET_KEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('err/user', err);
        if (err)
            return res.status(403).json({ message: 'Token invalid or Expired' });
        const { username, role } = decoded;
        // expect user document
        const mdbQuery = { username };
        const getResponse = yield mdbFetch("howmuch-app", "users", mdbQuery);
        const userDb = getResponse && getResponse[0];
        // expect user is not null
        if (!userDb) {
            console.log({ error: 403, message: "unauthorized access, username not matched" });
            return res.status(403).json({ error: 403, message: "unauthorized access" });
        }
        if (!role) {
            console.log({ error: 403, message: "unauthorized access, role not matched" });
            return res.status(403).json({ error: 403, message: "unauthorized access" });
        }
        // modifty request status and timestbody
        req.query["decodedRole"] = role;
        req.query["decoderUsername"] = username;
        req.body["status"] = {};
        req.body["timestamp"] = {};
        req.body = setRequestTimestampUpdate(req.body);
        console.log('>>> veriy token', req);
        next();
    }));
});
