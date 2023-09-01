/**************************************** EXPORTS */
export const setTimeCreated = (req, res, next) => {
    console.log(">>> setTimeCreated ...");
    const createdTime = new Date();
    const { body } = req;
    //expect body is not null
    if (!req.hasOwnProperty("body")) {
        console.log({ code: 400, message: "bad request at middleware setTimeCreated" });
        return res.status(400).json({ code: 400, message: "bad request at middleware setTimeCreated" });
    }
    //expect createdTime is empty string
    console.log(">>> setTimeCreated", body["createdTime"] == "");
    if (body["createdTime"] == "") {
        next();
    }
    //assign created Time to request body
    req.body['createdTime'] = createdTime;
    console.log(">>> setTimeCreated body:", req.body, createdTime);
    next();
};
export const setTimeUpdated = (req, res, next) => {
    console.log(">>> setTimeUpdated ...");
    const updatedTime = new Date();
    const { body } = req;
    //expect body is not null
    if (!req.hasOwnProperty("body")) {
        console.log({ code: 400, message: "bad request at middleware setTimeUpdated" });
        return res.status(400).json({ code: 400, message: "bad request at middleware setTimeUpdated" });
    }
    //assign created Time to request body
    req.body['updatedTime'] = updatedTime;
    console.log(">>> setTimeUpdated body:", req.body, updatedTime);
    next();
};
export const setTimeLastLogin = (req, res, next) => {
    console.log(">>> setTimeLastLogin ...");
    const lastLoginTime = new Date();
    const { body } = req;
    //expect body is not null
    if (!req.hasOwnProperty("body")) {
        console.log({ code: 400, message: "bad request at middleware setTimeLastLogin" });
        return res.status(400).json({ code: 400, message: "bad request at middleware setTimeLastLogin" });
    }
    //assign created Time to request body
    req.body['lastLoginTime'] = lastLoginTime;
    console.log(">>> setTimeLastLogin ... body", req.body);
    next();
};
