import jwt from "jsonwebtoken";

const findToken = async (req, res, next) => {
  try {
    const token = await req.header("auth-token" || "Auth-Token");
    
    const secrets = process.env.JWT_SECRET_KEY;
    
    const decodeToken = jwt.verify(token, secrets);
    
    req.user = decodeToken.user.userId;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export default findToken;
