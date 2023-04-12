const express = require("express");
const app = express();
const cors=require("cors");
const axios = require("axios")
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
  
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const Schema = mongoose.Schema;
const note = new Schema({
  title: String,
  content: String
});
const login = new Schema({
  username: String,
  email: String,
  password: String
});

const usernote = new Schema({
  user: String,
  contents: [{
    title: String,
    content: String
}]
})

const Note = mongoose.model('note', note)
const Login = mongoose.model('login', login)
const Usernote = mongoose.model('usernote', usernote)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions)) // Use this after the variable declaration
const PORT = process.env.PORT || 8080;

app.post("/addnote/:val", async (req, res) => {

  console.log("usename")
  let username = req.params.val
  const filter = { user: username };
  const update = { $push: { contents: {title: req.body.title, content: req.body.content}  } };
  
  await Usernote.countDocuments(filter); // 0
  
  const doc = await Usernote.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true // Make this update into an upsert
  });

});


app.post("/delete/:val", async(req, res)=>{
  let username = req.params.val
  const filter = { user: username };
  const update = { $pull: { contents: {_id: req.body.uid}  } };
  
  await Usernote.countDocuments(filter); // 0

  const doc = await Usernote.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log(doc)
  // userAccounts.update( 
  //   { userId: usr.userId },
  //   {
  //       $pull: {
  //         contents: { _id : connId }
  //       }
  //   },
  //   { safe: true },
  // );
})


app.post("/registration", async(req, res) => {
  Login.findOne({username: req.body.username}, {email: req.body.email})
 .then((docs)=>{
     if(!docs)
     {
      const vals = new Login({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      vals.save()
      
      .then(function (models) {
        console.log("successfully saved")
        console.log(models);
      })
      .catch(function (err) {
        console.log(err);
      });
     }
     else{
      console.log("already registered")
     }
 })
 .catch((err)=>{
     console.log(err);
 });

})
app.get("/profiles/:val", async(req, res) => {
  console.log("req.params")
  const docs = await Note.find()
  res.json(docs)
})

app.get("/users/:val", async(req, res) => {
  Usernote.findOne({user: req.params.val })
 .then((docs)=>{
  console.log(docs.contents)
     res.json(docs.contents)
 })
 .catch((err)=>{
 });
})

app.get("/users", async(req, res) => {
  res.json(await Login.find())
})


app.listen(PORT, console.log(`Server started on port ${PORT}`));
