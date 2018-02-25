const mongoose = require('mongoose');
//bcrpypt for encrpyption
const bcrypt = require('bcryptjs');
//to connect to database 
const config = require('../config/database');


//Create the Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true //no two users can share the same email address. 
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
//Create variable that can be used outside.  set that to mongoose model and pass in the UserSchema 
const User = module.exports = mongoose.model('User', UserSchema);

//Create two functions.  Get the user by ID and get the user by username.  Of course I need to do module.exports to use it outside. 
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username:username} //findOne function takes in query
    User.findOne(query, callback);
}
//pass in 10 which means Number of rounds to use.  (Default is 10 anyways but I will pass 10)
//reference in case I forget www.npmjs.com/package/bcryptjs
//so it is confusing but this returns the hashed password.  
//https://busy.org/@nafestw/mean-tutorial-part-2-adding-a-user-model was a great tutorial for this.  
module.exports.addUser = function(newUser, callback){ //I did the callback in the route user.js where it gives success or fail and res.sends success or fail.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
//I will use the chrome developer tool postman to see if the database is working.