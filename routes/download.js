const express=require('express');
const router=express.Router();
const Model=require('../model/model.js');

router.get("/download/:uuid",async (req, res)=>{
   
    const file=await Model.findOne({uuid: req.params.uuid});
                   if(!file)
                   res.render('download.ejs',{error:"Link has been expired"});
                   else{
                    const filePath=`${__dirname}/../${file.path}`;
                   res.download(filePath);
                   }


    });








module.exports=router;