import express from "express";
import userRouter from "./user.route.js";
import urlRouter from "./url.route.js";

const indexRouter=express.Router()

// Health check endpoint
indexRouter.get("/", (req, res) => {
    res.status(200).json({ message: "✅ URL Shortener Backend is Running!", status: "healthy" })
})

indexRouter.use("/api/v1/users",userRouter)
indexRouter.use("/api/v1/urls",urlRouter)

export default indexRouter