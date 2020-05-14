// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const session = require('express-session');

const mongoose = require('mongoose');

const config = require('./DB.js');

const categoryRoute = require('./Route/category.router');
const loginRoute    = require('./Route/login.router');
const managerRoute = require('./Route/manager.router');
const productRoute = require("./Route/product.router");
const authRoute = require('./Route/auth.router');
const orderRoute = require("./Route/order.router");
const usersRoute = require('./Route/users.router');
//const usersLoginRoute = require("./Route/userLogin.route");
const loginAuthRoute = require("./Route/userLoginAuth.route");
//const regUser = require("./Route/userReg.router");


mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/category', categoryRoute);
app.use('/login', loginRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use('/managers', managerRoute);
app.use('/auth', authRoute);
app.use('/users', usersRoute);
//app.use('/userlogin',usersLoginRoute);
app.use('/loginAuth', loginAuthRoute);
//app.use("/regUser", regUser);

app.use(session({
  secret: 'kjcxlchiy48236',
  resave: false,
  saveUninitialized: false
}));



app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});