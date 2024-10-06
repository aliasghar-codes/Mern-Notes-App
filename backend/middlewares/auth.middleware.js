import jwt from "jsonwebtoken";

export const authenticateToken = async (req, res, next) => {

    const cookie = req.cookies;
    const token = cookie.token;
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
    
    jwt.verify(token, jwtSecret, ( err, token ) => {

        if(err) return res.status(500).json({ success: false, Error: err });
        
        req.user = token.data;
        next();

    });

}