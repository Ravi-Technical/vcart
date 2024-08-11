const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongose = require('mongoose');
const productRoutes = require('./router/productRouter');
const categoryRoutes = require('./router/categoryRouter')
const brandRoutes = require('./router/brandRouter');
const sellerRegister = require('./router/sellerRouter');
const chartRegister = require('./router/chartRouter');
const cartRouter = require('./router/cartRouter');
const userRegister = require('./router/userRouter'); 
const orderRouter = require('./router/orderRouter');
const userWishlist = require('./router/wishlistRouter');


//******************* Database Connection  ***********************//
mongose.connect('mongodb+srv://ravis3682:pJtJmW7rUvnyqi9m@e-comm.3w1he4l.mongodb.net/e-shop?retryWrites=true&w=majority').then(()=>{
  console.log("Database Connection is ready");
})
.catch((err)=>{
console.log(err);
})



/*************** Cors **************/
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;
const PORT = process.env.PORT;

/*************** Middleware **************/
app.use(bodyParser.json());
app.use(cors("*"));
app.options('*', cors())

/***********
 * API URL:http://localhost:3000/api/v1/{dynamic_name}
************/

app.use('/image', express.static('public/images'));

app.use(`${api}/product`, productRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/brand`, brandRoutes);
app.use(`${api}/seller`, sellerRegister);
app.use(`${api}/chart`, chartRegister);
app.use(`${api}/user`, userRegister);
app.use(`${api}`, cartRouter);
app.use(`${api}`, orderRouter);
app.use(`${api}/user`, userWishlist);


//******************* Declare Host Name  ***********************//
app.listen(PORT, ()=>{ // http://localhost:3000/
    console.log("server is wokring");
})


