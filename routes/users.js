const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
//Now that I created the model I will bring it in here.
const User = require('../models/user');
const bodyParser = require('body-parser')

//Registration 
router.post('/register', (req,res,next) =>{
    //res.send('registration');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password  //I will run this password through bcrypt.hash which will has before db.
    });
    User.addUser(newUser, (err, user) =>{ //I will create this addUser function inside the models user.js
        if(err){
            console.log(err);
            res.json({success:false, msg:'Registration Failed!'})
        }else{
            res.json({success:true, msg:'User is Registered!'})
        }
    });
});
//This will be my authentication route
router.post('/authenticate', function(req,res,next){res.send('authentication');});
//This will be for the profile
router.get('/profile', function(req,res,next){res.send('profile');});



module.exports = router;