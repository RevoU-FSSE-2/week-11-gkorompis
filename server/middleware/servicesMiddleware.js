var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MdbCrud from "../db/mdbCrud.js";
const crud = new MdbCrud();
const { mdbFetch, mdbUpdateOne, mdbInsertOne, mdbDeleteOne } = crud;
/**************************************** EXPORTS */
export const serviceUnique = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //expect body is not null
        const { body } = req;
        if (!body) {
            return res.status(400).json({ code: 400, message: "bad request at middleware hashPassword: body not found" });
        }
        //expect service is not existed
        const { serviceName } = body;
        const mdbQuery = { serviceName };
        const getResponse = yield mdbFetch('portal-app', 'services', mdbQuery);
        const serviceDb = getResponse && getResponse[0];
        if (serviceDb) {
            console.log(">>> hashPassword: service name is already existed", { code: 400, message: "bad request at middleware hashPassword: service name is already existed" });
            return res.status(400).json({ code: 400, message: "bad request at middleware hashPassword: service name is already existed" });
        }
        next();
    }
    catch (error) {
        console.log({ code: 500, message: "internal server error", error });
    }
});
