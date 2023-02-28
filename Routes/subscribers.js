const express=require('express');
const router=express.Router();
const Subscribers=require('../model/subscribers.js')

router.get('/',  async (req,res)=>{
    try{
   const subscribers= await Subscribers.find();
   res.send(subscribers)
    }
    catch(err){
   res.status(500).json({msg:err.msg})
    }
})

router.get('/:id',getsubscribers,(req,res)=>{
 res.send(res.subscriber)
})

router.post('/', async (req,res)=>{
  const subscribers=new Subscribers({
    name:req.body.name,
    subscribedtochannel:req.body.subscribedtochannel
  })
  try{
   const newsubscriber=await subscribers.save();  //save new subscriber to data
   res.status(201).send(newsubscriber)
  }
  catch(err){
    res.status(400).send({msg:err.msg})
  }
})

router.delete('/:id', getsubscribers, async (req,res)=>{
  try{
  await res.subscriber.remove();
  res.send({msg:"subscriber has been deleted"})
  }
  catch(err){
    res.status(500).send({msg:err.msg})
  }
})

router.patch('/:id', getsubscribers,async (req,res)=>{
if(req.body.name!=null){
    res.subscriber.name=req.body.name;
}
if(req.body.subscribedtochannel!=null){
    res.subscriber.subscribedtochannel=req.body.subscribedtochannel;
}
try{
const updatesubscriber=await res.subscriber.save();
res.send(updatesubscriber)
}
catch(err){
res.status(500).send({msg:err.msg})
}
})

async function getsubscribers(req,res,next){
    let subscriber;
    try{
   subscriber=await Subscribers.findById(req.params.id);
   if(subscriber==null){
    return res.status(404).send({msg:'cant find id'})
   }
    }
    catch(err){
        res.status(500).send({msg:err.msg});
    }
    res.subscriber=subscriber;
    next();
}

module.exports=router