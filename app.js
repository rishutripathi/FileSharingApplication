const cors=require('cors');
require('dotenv').config();
require('./model/model.js');
const path=require('path');
const express= require('express');
const app= express();
app.use(express.json());
const route=require('./routes/route.js');
const show=require('./routes/show.js');
const download=require('./routes/download.js');
const corsOption={
    origin: process.env.CLIENTS.split(","),
}
app.use(route,show,download,cors(corsOption));
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));
app.use(express.static(path.join(__dirname)));

const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is listening on port: ${port}`);
});
