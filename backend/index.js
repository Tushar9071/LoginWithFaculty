require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3090;
const LoginSchema = require('./module/LoginSchema');
const connectionString = process.env.DB_connectionString;
const jwt = require('jsonwebtoken');
const Faculty = require('./module/Faculty');
const key = "Tushar"
mongoose.connect(connectionString).then(()=>{
    console.log('Connected to MongoDB');
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //register api
    app.post('/api/signup/data' , async(req,res)=>{
        const data = req.body;
        const user = new LoginSchema({
            username: data.username,
            email: data.email,
            password: data.password,
            token:''
        });
        const username = await LoginSchema.findOne({username:data.username});
        const email = await LoginSchema.findOne({email:data.email});
        const massage={
            username:false,
            email:false,
        }
        if(username != null){
            massage.username = true;
        }
        if(email != null){
            massage.email = true;
        }

        if(massage.username == false && massage.email==false){
            const ans = await user.save();
            res.json(massage);
        }
        else{
            res.json(massage);
        }
    })


    //login api
    app.post('/api/login/data' , async(req,res)=>{
        const data = req.body;
        console.log(data);
        const user = new LoginSchema({
            username: data.username,
            password: data.password,
        });
        let mdData = await LoginSchema.findOne({username:data.username});
        if(mdData == null){
            mdData = await LoginSchema.findOne({email:data.username});
        }
        const massage={
            username:false,
            password:false,
            jwt:''
        }
        if(mdData == null){
            massage.username = true ;
            massage.password = true ;
            res.json(massage);
        }else{
            if(mdData.password!= data.password){
                massage.password = true ;
                res.json(massage);
                //send message to client
            }else{
                var token = jwt.sign({
                    username:data.username,
                    password:data.password

                },key);
                mdData.token = token;
                await mdData.save();
                massage.jwt = token ;
                res.json(massage);
            }
        }
    })

    app.post('/api/login/cookieVerification',async (req,res)=>{
        var token = req.body;
        var ans={};
        try{
             ans = jwt.verify(token.token,key);
        }catch(e){
            console.log('token error');
        }
        if(ans == null){
            res.json({"password":true})
        }else{
            let mdData = await LoginSchema.findOne({username:ans.username});
        const massage={
            password:false
        }
        if(mdData != null){
            if(ans.password != mdData.password){
                massage.password = true ;
            }
            res.json(massage);
        }else{
            res.json({"password":true})
        
        }
        }
        // console.log(ans);
        
    })

    app.get('/faculty', async (req, res) => {
        const faculty = await Faculty.find();
        res.send(faculty);
        console.log(faculty);
    });

    app.get('/faculty/:id', async (req, res) => {
        const facultys = await Faculty.findOne({id:req.params.id});
        await res.json(facultys);
        console.log(facultys);
    });

    app.post('/faculty', async (req, res) => {
        const faculty = new Faculty({...req.body});
        await faculty.save();
        res.send(faculty);
    });

    app.delete('/faculty/:id',async (req,res)=>{
        const ans = await Faculty.deleteOne({id:req.params.id})
        console.log(ans);
        res.json(ans);
    });

    app.patch('/faculty',async (req,res)=>{
        const faculty = await Faculty.findByIdAndUpdate({id:req.params.id},req.body)
        console.log(faculty)
        res.send(faculty)
    })


    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });
})

//chatpage server







