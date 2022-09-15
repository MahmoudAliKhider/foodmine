import { Router } from "express"
import {sampl_foods,sampl_tag} from "../data"
import asyncHandler from 'express-async-handler'
import { FoodModels } from "../models/food.model"
const router = Router()

router.get('/seed',asyncHandler(async(req,res)=>{
    const FoodCount = await FoodModels.countDocuments();
    if(FoodCount > 0){
        res.send('Seed is alredy done')
        return;
    }
    await FoodModels.create(sampl_foods)
    res.send("Seed is Done")
}))

router.get('/', asyncHandler(async (req,res)=>{
    const foods = await FoodModels.find();
    res.send(foods)
}))



router.get('/search/:searchTerm',asyncHandler(async(req,res)=>{

    const searchRegex = new RegExp(req.params.searchTerm,'i')
    const foods = await FoodModels.find({name:{$regex:searchRegex}})
    res.send(foods)


//    const searchTerm = req.params.searchTerm
//    const foods = sampl_foods
//    .filter(food=> food.name.toLowerCase()
//    .includes(searchTerm.toLowerCase()))
//    res.send(foods)
   
}))


router.get('/tags',asyncHandler(async(req,res)=>{
const tags = await FoodModels.aggregate([
    {
        $unwind:'$tags'
    },
    {
        $group:{
            _id:"$tags",
            count:{$sum:1}
        }
    },{
        $project:{
            _id:0,
            name:'$_id',
            count:'$count'
        }
    }
]).sort({count:-1})

const all={
    name:"All",
    count: await FoodModels.countDocuments()
}
 tags.unshift(all)
    res.send(tags)
}))

router.get ('/tag/:tagName',asyncHandler(async(req,res)=>{

    const foods = await FoodModels.find({tags : req.params.tagName})
 
     res.send(foods)
 }))


router.get('/:foodId',asyncHandler(async(req,res)=>{
    
    const foods = await FoodModels.findById(req.params.foodId)
    res.send(foods)
}))


export default router;