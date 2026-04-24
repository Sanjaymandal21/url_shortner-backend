import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/ApiResponse.js";
export const checkIsLoggedIn = (req, res, next) => {
  const bearerAuth = req.headers.authorization;

  if (!bearerAuth || !bearerAuth.startsWith("Bearer ")) {
    return res.status(400).send(new ApiResponse(400, null, "Invalid Bearer Token"));
  }

  const token = bearerAuth.split(" ")[1];

  try {
    const decodedInformation = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedInformation;
    next();
  } catch (err) {
    return res.status(401).send(new ApiResponse(401, null, "Invalid or Expired Token"));
  }
};
