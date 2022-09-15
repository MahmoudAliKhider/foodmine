import { sample_users, sampl_foods } from "../data";
import { Router } from "express";
const router =Router()
import asyncHandler from 'express-async-handler'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User, UserModule } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constant/http-status";



router.get('/seed',asyncHandler(async(req,res)=>{
    const UsersCount = await UserModule.countDocuments();
    if(UsersCount > 0){
        res.send('Seed is alredy done')
        return;
    }
    await UserModule.create(sample_users)
    res.send("Seed is Done")
}))

router.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModule.findOne({email,password});
        
       if(user) {
        res.send(generateTokenRespons(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ))

router.post('/register',asyncHandler(
    async(req,res)=>{
        const{name,email,password,address} = req.body;
        const user = await UserModule.findOne({email})
        if(user){
          res.status(HTTP_BAD_REQUEST).send("User is Already exist")
          return;
        }
        const encryptPassword = await bcrypt.hash(password,10)

        const newUser:User={
            id:"",
            name,
            email:email.toLowerCase(),
            password:encryptPassword,
            address,
            isAdmin:false
        }

        const dbUser = await UserModule.create(newUser)
        res.send(generateTokenRespons(dbUser))
    }
))



const generateTokenRespons=(user:any)=>{
const token = jwt.sign({
    email: user.email,isAdmin:user.isAdmin
},"Some Roundem Text",{
 expiresIn:"30d"
})

user.token=token
return user
}

export default router;
