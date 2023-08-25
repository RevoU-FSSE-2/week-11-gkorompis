var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const permissions = ["admin", "approver"];
const setRequestTimestamp = (timestamp, body) => {
    if (body.timestamp) {
        body.timestamp[timestamp] = new Date();
    }
    return body;
};
export const updateRequestApproved = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // expect body status
    const { body, query } = req;
    const { decodedRole } = query;
    if (!permissions.includes(decodedRole)) {
        console.log(">>> unauthorized access:", { error: 403, message: "unauthorized role" });
        return res.status(403).json({ error: 400, message: "unauthorized role" });
    }
    if (!body) {
        console.log(">>> bad request body:", { error: 400, message: "bad request body" });
        return res.status(400).json({ error: 400, message: "bad request body" });
    }
    const { status } = body;
    if (!status) {
        console.log(">>> bad request body:", { error: 400, message: "bad request body - no status found" });
        return res.status(400).json({ error: 400, message: "bad request body - no status found" });
    }
    req.body.status["isApproved"] = true;
    req.body.status["isRejected"] = false;
    req.body.status["isDeleted"] = false;
    req.body = setRequestTimestamp("resolved", req.body);
    req.body = setRequestTimestamp("updated", req.body);
    next();
});
export const updateRequestRejected = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // expect body status
    const { body, query } = req;
    const { decodedRole } = query;
    if (!permissions.includes(decodedRole)) {
        console.log(">>> unauthorized access:", { error: 403, message: "unauthorized role" });
        return res.status(403).json({ error: 400, message: "unauthorized role" });
    }
    if (!body) {
        console.log(">>> bad request body:", { error: 400, message: "bad request body" });
        return res.status(400).json({ error: 400, message: "bad request body" });
    }
    const { status } = body;
    if (!status) {
        console.log(">>> bad request body:", { error: 400, message: "bad request body - no status found" });
        return res.status(400).json({ error: 400, message: "bad request body - no status found" });
    }
    req.body.status["isApproved"] = false;
    req.body.status["isRejected"] = true;
    req.body.status["isDeleted"] = false;
    req.body = setRequestTimestamp("resolved", req.body);
    req.body = setRequestTimestamp("updated", req.body);
    next();
});
