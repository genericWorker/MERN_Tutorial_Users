const express=require("express");
const app= express();
const mongoose = require("mongoose"); 

const UserModel = require('./models/Users');
const bodyParser = require('body-parser');  

const cors = require("cors");

app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:true})) 
mongoose.connect("mongodb+srv://genericworker:adminuser@cluster0.ggu9k.mongodb.net/merntutorial?retryWrites=true&w=majority")  
.then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
}); 


app.get("/getUsers", (req,res) => {
    UserModel.find({}, (err, result) => {
    if (err) {
        res.json(err);
    }
    else {
        res.json(result);
    }
  });
});  

app.post("/createUser", async (req, res)  => {
    const user = req.body;
    const newUser = new UserModel(user);
    await  newUser.save(); 
    return res.json(newUser); 
}); 

app.listen(3001, () => {
    console.log("Server running port 3001."); 
}); 