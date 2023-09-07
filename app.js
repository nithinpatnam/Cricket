const express = require("express");
const path = require("path");
const app = express();
const fs = require('fs');
const mongoose = require("mongoose");
const bodyparsar = require ("body-parser",{UserNewUrlparsar:true});
mongoose.connect("mongodb+srv://nithin:nithin@cluster0.faddelu.mongodb.net/Cricket?retryWrites=true&w=majority");
const port = 40;

var details = new mongoose.Schema({
    name:String,
    age:String,
    city:String,
    number:String
});

var Cdetails = mongoose.model("Cdetails",details);



app.use('/views',express.static('views'))
app.use('/static',express.static('static'))

app.use (express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../CRICKET','/views','home.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'../CRICKET','/views','contact.html'))
})

app.get('/Info',(req,res)=>{
    res.sendFile(path.join(__dirname,'../CRICKET','/views','Info.html'))
})


app.get('/About',(req,res)=>{
    res.sendFile(path.join(__dirname,'../CRICKET','/views','About.html'))
})


app.post('/contact',(req,res)=>{
    var mydata = new Cdetails (req.body);
    mydata.save().then(()=>{
        // res.redirect('/contact')
        res.send("item is saved")
    }).catch(()=>{
        res.status(400).send("Item is not saved")
    });
})


app.listen(port,()=>{
    console.log(`the application is running on port ${port}`);
})
