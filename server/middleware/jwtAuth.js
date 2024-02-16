import JWT from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

// router level middleware function
export const jwtAuth = (req, res, next) => {
  // get cookie token(jwt token generated using json.sign()) form the request
  const token = (req.cookies && req.cookies.token) || null;

  // return response if there is no token(jwt token attached with cookie)
  if (!token) {
    return res.status(400).json({ success: false, message: "NOT authorized" });
  }

  // verify the token
  try {
    const payload = JWT.verify(token, process.env.SECRET);
    req.user = { id: payload.id, email: payload.email, role: payload.role };
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user.role);
      res.status(400).json({
        success: false,
        mesage: "Invalid Role"
      })
    }

    next();
  });