import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies (images arrive as base64 strings → need a higher limit)
app.use(express.urlencoded({ extended: true })); // parse form-encoded bodies
app.use(cookieParser()); // makes req.cookies available

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});