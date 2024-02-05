import jwt from "jsonwebtoken";
import { config } from "dotenv"
config()
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

const isLoggedIn = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        throw new ApiError(400, "Unauthorized, please login to continue");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }

    } catch (err) {
        throw new ApiError(403, "Unauthorized, please login to continue", err);
    }
});

const adminMiddleware = (...roles) =>
    asyncHandler(async (req, res, next) => {
        const { token } = req.cookies;

        if (!token) {
            throw new ApiError(400, "Unauthorized, please login to continue");
        }

        try {
            const decodedRole = jwt.verify(token, process.env.JWT_SECRET);

            if (!decodedRole.role) {
                throw new ApiError(403, "Role information not found in the token");
            }

            // Assuming req.user is an object, initialize it if not present
            req.user = req.user || {};

            req.user.role = decodedRole.role;
            console.log(req.user.role);

            if (!roles.includes(req.user.role)) {
                throw new ApiError(403, "You don't have permission to access this route");
            }

            next();
        } catch (err) {
            throw new ApiError(403, "Could not verify the token");
        }
    });


export {
    isLoggedIn,
    adminMiddleware
}
