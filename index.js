require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const port=8000;
//connection to mongodb
mongoose.connect(process.env.DATA_BASE_URL,{useNewUrlParser:true})
const db=mongoose.connection;
db.on('error',(err)=>console.log(err));
db.once('open',()=>console.log('database connected'))


app.use(bodyparser.json())

const subscribersroute=require('./Routes/subscribers.js')
app.use('/subscribers',subscribersroute)


app.listen(port,()=>{
    console.log(`server is listning http://localhost:${port}`);
})