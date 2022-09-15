import { sample_users } from "../data";
import { Router } from "express";
const router =Router()
import jwt from "jsonwebtoken";



router.post('/login',(req,res)=>{
   // const body = req.body;
    const {email , password} = req.body
    const user = sample_users.find(user=>user.email === email &&
        user.password === password)

        if(user){
          res.send(generateTokenRespons(user))
        }else{
            res.status(400).send("username or password is not correct")
        }
})

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
