import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { mdbFetch } from '../db/mongodbFunctions.js';
import { usersDeleteOneController } from '../controller/usersController.js';


export const hashPassword = async (req: Request, res: Response, next: NextFunction)=> {
  const { password, username } = req.body;
  const pattern = /^[a-zA-Z0-9]+$/
  if(!username || username == ""){
    return res.status(400).json({ error: 400, message:"password can't be empty" })
  }
  const fetchUser = await mdbFetch('howmuch-app', 'users', {username});
  const usernameAlreadyExisted = fetchUser && fetchUser[0];
  
  if(usernameAlreadyExisted){
    console.log(">>>username already existed", usernameAlreadyExisted, {fetchUser})
    return res.status(409).json({ error: 409, message:"username already exists" })
  }
  if (!password) {
    return res.status(400).json({ error: 400, message:"password can't be empty" })
  }
  if (typeof password !== 'string' && !pattern.test(password)){
    return res.status(400).json({error:400, message: "bad request at middleware, password is not alphanumeric"});
  }
  if (password.length < 8){
    return res.status(400).json({error:400, message: "bad request at middleware, password is less than 10 digits"});
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (!hashedPassword) return res.status(500).json({ error: 'Failed to hash password' });
  req.body.password = hashedPassword;
  console.log(">>>hash password:", hashPassword)
  next();
}

