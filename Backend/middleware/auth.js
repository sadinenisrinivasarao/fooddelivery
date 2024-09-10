import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }
    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}

export default authMiddleWare;