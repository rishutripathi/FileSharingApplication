const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const Model=require('../model/model.js');
const {v4: uuidv4}=require('uuid');
const storage=multer.diskStorage({
                
        destination: (req, file, cb)=>{                                              // 'file' is passed in .single()
               cb(null, 'uploadedFiles')
        },

        filename: (req, file, cb)=>{  
               var uniqName=`${Date.now()}-${parseInt(Math.random()*100000000)}-${path.basename(file.originalname)}`;
               cb(null, uniqName)
        }
                
});

const upload=multer({
                 storage: storage,
                 limits: {fileSize: 1000000*100}

}).single("myFile");                             // file=myFile                        // 'myFile' is 'Name' attribute of class in HTML form

router.post("", (req,res)=>{         
    
    upload(req,res, async (err)=>{
        if(!req.file)                                                                   // for validation of request                  
            return res.json({Error:"All fields are required"});            
        else if(err){
            res.status(500).json({message: err.message});}
        else{
            const file=new Model({                                                      // for storage into Database
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });  
            
        const response= await file.save();
        res.status(200).json({file: `${process.env.app_base_url}/route/-${response.filename}-${response.uuid}`});
        }      
    });


});

router.post('/send', async (req,res)=>{
    
                const {uuid, emailSender, emailReceiver}= req.body;                         // Validation of request
                   if(!uuid || !emailSender || !emailReceiver)
                res.status(422).json({error: "All fields are required"});
                else{
                    const file= await Model.findOne({uuid: uuid});
                    if(file.sender)
                    res.json({Message: "Email has already been sent for this uuid"});
                    else{

                        file.sender=emailSender;
                        file.receiver=emailReceiver;
                        const response= await file.save();
                        const sendMail=require('../services/emailService.js');

                        sendMail({
                            from: file.sender,
                            to: file.receiver,
                            subject: 'File Sharing',
                            text: `${file.sender} has shared a file with you.`,
                            html: require('../services/emailTemplate')({
                                emailFrom: file.sender,
                                downloadLink: `${process.env.app_base_url}/route/${file.uuid}`,
                                size: parseInt(file.size/1000)+'KB',
                                expires: '24 Hours'
                            })
                        });

                        res.status(200).json({Message:"Mail has been sent successfully."});
                    }

                }

});

module.exports=router;