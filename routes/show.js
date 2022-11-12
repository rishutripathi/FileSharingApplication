const express=require('express');
const router=express.Router();
const Model=require('../model/model.js');

router.get("/:uuid",async (req,res)=>{
    try{
    const file=await Model.findOne({uuid: req.params.uuid});
    if(!file)
    res.render('download.ejs',{error: "Link has been expired"});
    else
    res.render('download.ejs', {
          uuid: file.uuid,
          fileName: file.filename,
          fileSize:file.size,
          downloadLink: `${process.env.app_base_url}/route/downloads/${file.uuid}`
    });
    }
    catch(err){
        res.render('download.ejs', {error: "Something went wrong!", Message: err});
    }
});




module.exports=router;