const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user'); //bring in model
const config = require('../config/database'); //database config

module.exports = function(passport){
    let opts = {}; //options is an object literal containing options to control how token is extracted.
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')  //jwt changing up their documentation, went through this 6 months ago as well 
    opts.secretOrKey = config.secret; //string containing the secret or pem encoded public key verifying the tokens signiture
    passport.use(new JwtStrategy(opts, (jwt_payload,done)=>{
        console.log(jwt_payload);  
        User.getUserById(jwt_payload.data._id, (err, user)=>{  //jwt_payload._id is wrong because you have to gointo _doc to obtain the id
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null,false);
            }
        });
    }));
}

//cristina swanson should call by thurday!

/*
Explenation of configuration which reads the JWT from the http Auth header with the scheme 'bearer'

This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure 
RESTful endpoints without sessions, which seems quite nice.

So the jwt strategy is constructed like this
new JwtStrategy(options, verify)
options - is an object literal containing options to control how the token is extracted from the request or verified
secretOrKey - secret storingu. database no naka ni haitteru  'NintamaRantarou'
JWT from request = Function that accepts a request as the only parameter and returns the JWT(Json Web Token) or null

verify is a function that takes in parameters jwt_payload, and done
- jwt_payload is an object literal containing the decoded JWT payload
- done is a passport error first callback accepting arguments done(error, user,info)

*/