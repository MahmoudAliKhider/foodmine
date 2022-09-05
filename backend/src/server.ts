import express from "express"
import cors from 'cors'
import { sampl_foods, sampl_tag } from "./data";
const app = express();
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

const port=5000;
app.listen((port),()=>{
  console.log(`server connected to http://localhost ${port}`)
})