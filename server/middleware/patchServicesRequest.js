var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**************************************** EXPORTS */
export const approveServicesRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.hasOwnProperty("body")) {
            console.log({ code: 400, message: "bad request at middleware approveServiceRequest" });
            return res.status(400).json({ code: 400, message: "bad request at middleware approveServiceRequest" });
        }
        req.body['status'] = 'approved';
        next();
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>approveServiceRequest: ERR', { code: 500, message: "internal server error at middleware approveServiceRequest ", error });
        return res.status(500).json({ code: 500, message: "internal server error at middleware approveServiceRequest ", error });
    }
});
export const rejectServicesRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.hasOwnProperty("body")) {
            console.log({ code: 400, message: "bad request at middleware rejectServicesRequest" });
            return res.status(400).json({ code: 400, message: "bad request at middleware rejectServicesRequest" });
        }
        req.body['status'] = 'rejected';
        next();
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>> rejectServicesRequest: ERR', { code: 500, message: "internal server error at middleware rejectServicesRequest", error });
        return res.status(500).json({ code: 500, message: "internal server error at middleware rejectServicesRequest", error });
    }
});
export const softDeleteServicesRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.hasOwnProperty("body")) {
            console.log({ code: 400, message: "bad request at middleware softDeleteServicesRequest" });
            return res.status(400).json({ code: 400, message: "bad request at middleware softDeleteServicesRequest" });
        }
        req.body['archived'] = true;
        next();
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>softDeleteServicesRequest: ERR', { code: 500, message: "internal server error at middleware softDeleteServicesRequest ", error });
        return res.status(500).json({ code: 500, message: "internal server error at middleware softDeleteServicesRequest ", error });
    }
});
export const pendingServiceRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.hasOwnProperty("body")) {
            console.log({ code: 400, message: "bad request at middleware pendingServiceRequest" });
            return res.status(400).json({ code: 400, message: "bad request at middleware pendingServiceRequest" });
        }
        req.body['status'] = "pending";
        next();
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>pendingServiceRequest: ERR', { code: 500, message: "internal server error at middleware pendingServiceRequest ", error });
        return res.status(500).json({ code: 500, message: "internal server error at middleware pendingServiceRequest ", error });
    }
});
export const restrictViewServiceRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.hasOwnProperty("query")) {
            console.log({ code: 400, message: "bad request at middleware restrictViewServiceRequest" });
            return res.status(400).json({ code: 400, message: "bad request at middleware restrictViewServiceRequest" });
        }
        const access = ["admin"];
        const { decodedRole } = req.query;
        if (!decodedRole) {
            return res.status(500).json({ code: 400, message: "bad request at middleware restrictViewServiceRequest no decodedRole" });
        }
        console.log(">>>restrictViewServiceRequest: permission access", decodedRole, access.includes(decodedRole));
        if (!access.includes(decodedRole)) {
            return res.status(500).json({ code: 403, message: "unauthorized role permission to access collections" });
        }
        next();
    }
    catch (error) {
        //expect return error: internal server
        console.log('>>>restrictViewServiceRequest: ERR', { code: 500, message: "internal server error at middleware restrictViewServiceRequest ", error });
        return res.status(500).json({ code: 500, message: "internal server error at middleware restrictViewServiceRequest ", error });
    }
});
