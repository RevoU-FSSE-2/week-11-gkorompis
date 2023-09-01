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
import '../loadenv.js';
const SECRET_KEY = process.env.SECRET_KEY;
// type MdbQuery = {id: string} & UserDocumentQuery
/**************************************** EXPORTS */
/****** POST ONE *******/
export const authPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract request parameter, query, body, header
    const params = req.params;
    const query = req.query;
    const body = req.body;
    try {
        // expect request body is not null
        if (!body) {
            //expect return error: body is undefined
            console.log({ code: 400, message: "bad request at authPostController" });
        }
        //expect jwt sign return token messages
        const loginInfo = body;
        const token = jwt.sign(loginInfo, SECRET_KEY, { expiresIn: '30m' });
        return res.status(200).json(token);
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>authPostController: ERR', { code: 500, message: "internal server error at authPostController", error });
        return res.status(500).json({ code: 500, message: "internal server error at mongodb fetch for authPostController", error });
    }
});
