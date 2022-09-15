import {connect , ConnectOptions} from 'mongoose'

// const mongoose = require('mongoose')
// const url = process.env.MONGO_URL
export const dbconnect = ()=>{
   connect(process.env.MONGO_URL!,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   } as ConnectOptions).then(
    ()=> console.log("DB Connected"),
    (error)=> console.log(error)
   )
}