import express from "express";
import indexRouter from "./routers/index.route.js";
import cors from "cors"


const app=express()

app.use(express.json())

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL 
        : "http://localhost:5173"
}))

app.use("/",indexRouter)

export default app