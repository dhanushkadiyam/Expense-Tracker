import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        //console.log(req.headers);
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        
        const token = authHeader.split(" ")[1];
        //console.log("TOKEN =", token);

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default protect;