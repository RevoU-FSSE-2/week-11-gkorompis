import bcrypt from 'bcrypt';
export const hashPassword = (req, res, next) => {
    const { password } = req.body;
    const pattern = /^[a-zA-Z0-9]+$/;
    if (password) {
        if (typeof password !== 'string' && !pattern.test(password)) {
            res.status(400).json({ error: 400, message: "bad request at middleware, password is not alphanumeric" });
            return;
        }
        if (password.length <= 10) {
            res.status(400).json({ error: 400, message: "bad request at middleware, password is less than 10 digits" });
            return;
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err)
                return res.status(500).json({ error: 'Failed to hash password' });
            req.body.hashedPassword = hashedPassword;
            console.log(">>>hash password:", hashPassword);
            next();
        });
    }
    else {
        next();
    }
};
