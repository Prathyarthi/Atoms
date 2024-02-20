import express from "express";
import authRouter from "./router/authRoute.js";
import communityRoutes from "./router/communityRoutes.js";
import dbConnect from "./Config/DBconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dbConnect();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true, //access-control-allow-credentials
  })
);

app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/doctor", doctorRoutes);
// app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", communityRoutes);

app.use('/', (req, res) => {
  res.status(200).json({
    data: "JWTAuth Server",
  });
});

export default app;
