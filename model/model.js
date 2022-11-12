require('dotenv').config();
const mongoose=require('mongoose');
mongoose.pluralize(null);

//---------------------------------------------------connection through MongoClient-------------------------------------------

// const {MongoClient}= require('mongodb');
// MongoClient.connect(process.env.uri,{useNewUrlParser:true, useUnifiedTopology:true}, async (err, client)=>{
//    if(err)
//    throw err;
//    else{
//     console.log("Connection with Database has been established successfully");
//     var db=client.db();
//     var res= await db.collection('data').find({}).toArray();
//     console.log(res);
//    }
// });

//---------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------Connection through Mongoose--------------------------------------------------

mongoose.connect(process.env.uri,{useNewUrlParser:true, useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once("open",()=>{console.log("Mongoose successfully connected");}).on("error",(err)=>{throw err;});

const schema= new mongoose.Schema({
                        filename: {type:String,required:true},
                        path: {type:String,required:true},
                        size: {type:Number,required:true},
                        uuid: {type:String,required:true},
                        sender: String,
                        receiver: String
                      
},{versionKey:false, timestamps:{updatedAt: false}});

module.exports=new mongoose.model('fileSchema',schema);