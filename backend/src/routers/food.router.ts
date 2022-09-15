import { Router } from "express"
import {sampl_foods,sampl_tag} from "../data"
const router = Router()

router.get('/',(req,res)=>{
    res.send(sampl_foods)
})



router.get('/search/:searchTerm',(req,res)=>{
   const searchTerm = req.params.searchTerm
   const foods = sampl_foods
   .filter(food=> food.name.toLowerCase()
   .includes(searchTerm.toLowerCase()))
   res.send(foods)
   
})


router.get('/tags',(req,res)=>{
    res.send(sampl_tag)
})

router.get ('/tag/:tagName',(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sampl_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods)
})


router.get('/:foodId',(req,res)=>{
    const foodId = req.params.foodId;
    const foods = sampl_foods.filter(food => food.id == foodId)
    res.send(foods)
})


export default router;