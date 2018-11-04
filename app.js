const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load user model

require('./models/User');

//Passport cnfig

require('./config/passport')(passport);

//Load routes
const index = require('./routes/index');

const auth = require('./routes/auth');

const stories = require('./routes/stories');

// Load keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect

mongoose.connect(keys.mongoURI, {
    //useMongoClient:true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();

// Handlebars 
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


const port = process.env.PORT || 5000;


// Set global var
app.use((req,res,next) => {
    res.locals.user = req.user || null;
    next();
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Use routes

app.use('/',index);

app.use('/auth',auth);

app.use('/stories',stories);

app.listen(port, () => {
    console.log(`server started on ${port}`)
});