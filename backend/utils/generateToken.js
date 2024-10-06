import jwt from "jsonwebtoken";

export const generateToken = data => {

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpires = process.env.JWT_EXPIRES;

    const token = jwt.sign({ data }, jwtSecret, { expiresIn: jwtExpires });
    
    return token;
}