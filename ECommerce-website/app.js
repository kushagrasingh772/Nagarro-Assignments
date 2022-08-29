const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homeProducts = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes'); 

const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');
const app = express();

const PublishableKey = 'pk_test_51LaF5WSAeBTv5HPlXFw5Vwh7OT4vwreYu2P9bUgNJnHv0hXBEa5KNLzhLEmRTw45scOi8BVWzc0cBtNXUhpYqcVW00qAHeQIbV';
const SecretKey = 'sk_test_51LaF5WSAeBTv5HPl0RQ5Nwi7Blj77vFlVUSdUwRSWMyeFAoFeGEKw5RhQ9aMnLJdCLxEafkvtCIcijhKtVLNvobt00Misv845m';
const stripe = require('stripe')(SecretKey);

dotenv.config({ path: './config.env' });
// mongoose.connect('mongodb+srv://Ayush:<password>@cluster0.n0lfmeb.mongodb.net/?retryWrites=true&w=majority')
// .then(()=>{
//     console.log("DB connected");
// })
// .catch((err)=>{
//     console.log(err);
// })

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Data Base Error...");
    console.log(err);
  });

app.set('view engine','ejs');
app.set('views' ,path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(flash());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


// ________Payment__________________________________________________________

app.post('/payment/:amount', function(req, res){
    const amount = req.params.amount;
 
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Ayush Jain',
        
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: amount,    
            description: 'Cart  Product',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        // res.send(err)    // If some error occurs
    });
})

// _________________________________________________________________________________________________________


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

app.use(passport.session()); // make use of session login/logout)
app.use(passport.initialize()); // initialsie pass
// authenticating the user
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(authRoutes);
app.use(adminRoutes);
app.use(homeProducts);
app.use(userRoutes);

// app.get('/*',(req,res)=>{
//     res.render('notfound');
// });

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Server connected to ${PORT} `);
});