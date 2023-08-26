var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const { mdbFetch } = crud;
import jwt from 'jsonwebtoken';
import '../loadenv.js';
const SECRET_KEY = process.env.SECRET_KEY;
// type MdbQuery = {id: string} & UserDocumentQuery
/****** EXPORTS *******/
/****** POST ONE *******/
export const authPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    // const params = req.params;
    // const query:UserDocumentQuery = req.query;
    const body = req.body;
    if (body) {
        // expect return username and password from request
        const { username, password } = body;
        const mdbQuery = { username };
        // expect user document
        const getResponse = yield mdbFetch("howmuch-app", "users", mdbQuery);
        const userDb = getResponse && getResponse[0];
        // expect user is not null
        if (!userDb) {
            console.log({ error: 403, message: "unauthorized access, username not matched" });
            return res.status(403).json({ error: 403, message: "unauthorized access" });
        }
        console.log(">>> userDB", userDb);
        // expect user password matches login password
        // Compare the entered password with the stored hash
        const pass_hashed = userDb === null || userDb === void 0 ? void 0 : userDb.password;
        const pass_login = password;
        console.log({ pass_login, pass_hashed });
        const passwordMatches = yield bcrypt.compare(pass_login, pass_hashed);
        if (!passwordMatches) {
            console.log({ error: 403, message: "unauthorized access, password not matched", match: passwordMatches });
            res.status(403).json({ error: 403, message: "unauthorized access", match: passwordMatches });
        }
        // expect returns login token
        console.log(">>> bcrypt result", passwordMatches);
        const token = jwt.sign(userDb, SECRET_KEY, { expiresIn: '30m' });
        return res.status(200).json(token);
    }
    else {
        console.log({ error: 401, message: "invalid request body" });
    }
});
