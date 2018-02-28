const express = require('express');
//path is part of the cores module
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
//database is in database.js this connects to  database:'mongodb://localhost:27817/authapp'
const config = require('./config/database')

/*I want to call the connect function for mongoose so I can connect to database.  I should put inside 
the connect function the location of the database, so I will create a config file and put the database in that.  
Now I am referencing the key database in the config file.  mongoose.connect(config.database);
*/
//Something to let us know that we are connected.
//remember to use sudo mongod --nevermind i made it so i dont have to use sudo anymore yay 
mongoose.connect(config.database);  //omg i commented this out by accident, what a nightmare goodnight

mongoose.connection.on('connected',function(){console.log('yay i am connected to database'+config.database)});

//This will give me an error when database fails
mongoose.connection.on('error',function(error){console.log('You have an error'+error)});

//So I am initializig the app variable with express.
const app = express();

//I need to make reference to the user routes file where I will have all the user routes.  I think I should put in authenticate, profile, and some other stuff I will see as I go.  
const users = require('./routes/users');

const port = 3000;

//Cors allows me to make request to the api from a different domain name.  By default, they would be blocked when making certian requests.  Making it possible to use it from any domain name. But of course I will use Authgaurd so that users can only access certain endpoints if he has the correct token. This is easier than using express cors.  use is to bind middlewear to the application. 
app.use(cors());

/*I need a place to set the client side files and thats going to be the entire angular app once Im done with it. Join the current directory to the public folder.  So if I put an index.html into public, and goto port 3000, I should be able to see whats on the html instead of "Sending Response" which is what I have in the callback of the http method get below..

Online Description of this
If you're using Express to deliver some type of application the chances are you'll want to send static files to a browser. When we say "static files" we're talking about HTML, client-side JavaScript, CSS files and images. That type of thing.

The path module exposes a join method that allows us to chain together variables to create a file path. The join method is used instead of specifying a full file path, as this avoids issues of operating systems working differently with forward slashes and backslashes.

So we'll pass path.join into the express.static method.

And then we'll path the folder information into path.join. The first parameter to use is a native Node variable __dirname which contains the file path of the current folder. The second parameter will be the name of the folder containing the static resources, in our case public.
*/
app.use(express.static(path.join(__dirname, 'public')))

//cannot get/ This will end up going to the front end index file, but I will just add this to see if it's working.  
app.get('/', function(req,res){res.send('Sending Response')})

//anything with this endpoint will go to the users file. I am saying I want to goto /users for my user routes. const users = require('./routes/users');  ok just found out after an hour of trying to find errors, this app.use bodyparser.jason has to above defining the users file.  thanks stackoverlow, and no errors.....now postman post on register url is working
app.use(bodyParser.json());

//Need to be able to authenticate and create a token
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users)

//this will listen to the port I will pass in.  This starts up the server.  
app.listen(port, function(){console.log('Server started on port '+port)})

//Body-Parser - takes incoming request bodies, when I submit form I can grab data. So I will add bodyparser middlewear here. So something I need for the forms.



// create application/x-www-form-urlencoded parser



