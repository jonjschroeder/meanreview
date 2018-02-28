const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
//Now that I created the model I will bring it in here.
const User = require('../models/user');//i dont think this and the one below is needed.  
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
    User.addUser(newUser, function(err, user){ //I will create this addUser function inside the models user.js
        if(err){
            console.log(err);
            res.json({success:false, msg:'Registration Failed!'})
        }else{
            res.json({success:true, msg:'User is Registered!'})
        }
    });
});
//This will be my authentication route
router.post('/authenticate', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'user not found'})
        }
        User.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn:600000
                });
                res.json({
                    sucess:true,
                    token:'JWT'+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            }else{
                return res.json({success:false, msg:'wrong pass'});
            }
        });
     });
});
// It failed at the line.
// const token = jwt.sign(user, config.secret, {
// Which I assume is mongoosejs object, which contains many methods and is not "serializable". 

router.get('/profile', function(req,res,next){res.send('profile');});



module.exports = router;