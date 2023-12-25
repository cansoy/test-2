import express from "express"
import passport from "passport"
import {Strategy} from "passport-local"
import session from "express-session"
import dotnenv from "dotenv"
import {v4} from "uuid"
import jwt from "jsonwebtoken"
import flash from "connect-flash"
import cookieParser from "cookie-parser"
import cors from "cors"

import {authUser} from "./controllers/authUser.js"
import {isAuthSession} from "./middlewares/isAuthSession.js"
import {isAuthJwt} from "./middlewares/isAuthJwt.js"

dotnenv.config({path:"./.env"})
const PORT =process.env.PORT || 3000

const server=express()
server.set("view engine","ejs")
server.set("views","./views")
server.use(cors({origin:"http://127.0.0.1:5500",credentials:true}))
server.use(express.json())
server.use(cookieParser())
server.use(session({
    name:"muhammed",
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    genid:v4,
}))

server.use(flash())

server.use(passport.initialize())
server.use(passport.session())
passport.use(new Strategy(  
                        {usernameField:"username",passwordField:"password"},
                        authUser
                        )
            )
passport.serializeUser((userObj,cb)=>cb(null,userObj))
passport.deserializeUser((userObj,cb)=>cb(null,userObj))

server.post("/logged",passport.authenticate("local"),(req,res)=>{
    const access_token=jwt.sign(req.user,process.env.ACCESS_JWT_SECRET,{expiresIn:10})
    const refresh_token=jwt.sign(req.user,process.env.REFRESH_JWT_SECRET,{expiresIn:100000})
    res.cookie("access_token",access_token,{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:10*1000})
    res.cookie("refresh_token",refresh_token,{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:100000*10000})
    res.json({you:"logged-using-by-passportjs"})
})

server.get("/users",isAuthSession,isAuthJwt,(req,res)=>{
    res.cookie("refresh_token",req.refresh_token,{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:100000*10000})
    res.json({data:`users: _${Math.floor(Math.random()*999)}`})
})

server.get("/todos",isAuthSession,isAuthJwt,(req,res)=>{
    res.cookie("refresh_token",req.refresh_token,{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:100000*10000})
    res.json({data:`todos: _${Math.floor(Math.random()*999)}`})
})

server.get("/logout",(req,res)=>{
    req.session.destroy()
    res.cookie("refresh_token","",{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:0})
    res.cookie("muhammed","",{httpOnly:true,sameSite:"lax",secure:"auto",maxAge:0})
    res.json({you:"log-out-deleted-everything"})
})

server.listen(PORT,()=>console.log("**************************************"))

