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
import { mdbFetch } from '../db/mongodbFunctions.js';
export const hashPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = req.body;
    const pattern = /^[a-zA-Z0-9]+$/;
    if (!username || username == "") {
        return res.status(400).json({ error: 400, message: "password can't be empty" });
    }
    const fetchUser = yield mdbFetch('howmuch-app', 'users', { username });
    const usernameAlreadyExisted = fetchUser && fetchUser[0];
    if (usernameAlreadyExisted) {
        console.log(">>>username already existed", usernameAlreadyExisted, { fetchUser });
        return res.status(409).json({ error: 409, message: "username already exists" });
    }
    if (!password) {
        return res.status(400).json({ error: 400, message: "password can't be empty" });
    }
    if (typeof password !== 'string' && !pattern.test(password)) {
        return res.status(400).json({ error: 400, message: "bad request at middleware, password is not alphanumeric" });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: 400, message: "bad request at middleware, password is less than 10 digits" });
    }
    const saltRounds = 10;
    const hashedPassword = yield bcrypt.hash(password, saltRounds);
    if (!hashedPassword)
        return res.status(500).json({ error: 'Failed to hash password' });
    req.body.password = hashedPassword;
    console.log(">>>hash password:", hashPassword);
    next();
});
