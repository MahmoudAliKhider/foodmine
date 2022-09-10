import express from "express"
import cors from 'cors'
import { sample_users, sampl_foods, sampl_tag } from "./data";
import jwt from "jsonwebtoken"
const app = express();
app.use(express.json())
app.use(cors(
   {
    credentials:true,
    origin:['http://localhost:4200']
   }

))

app.get('/api/foods',(req,res)=>{
    res.send(sampl_foods)
})



app.get('/api/foods/search/:searchTerm',(req,res)=>{
   const searchTerm = req.params.searchTerm
   const foods = sampl_foods
   .filter(food=> food.name.toLowerCase()
   .includes(searchTerm.toLowerCase()))
   res.send(foods)
   
})


app.get('/api/foods/tags',(req,res)=>{
    res.send(sampl_tag)
})

app.get ('/api/foods/tag/:tagName',(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sampl_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods)
})


app.get('/api/foods/:foofId',(req,res)=>{
    const foodId = req.params.foofId;
    const foods = sampl_foods.filter(food => food.id == foodId)
    res.send(foods)
})

app.post('/api/users/login',(req,res)=>{
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

const port=5000;
app.listen((port),()=>{
  console.log(`server connected to http://localhost:${port}`)
})