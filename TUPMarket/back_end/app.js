const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const db = require('./dbConfig');

//Routes (Add new routes here)
const usersRoute = require('./routers/users');
const productsRoute = require('./routers/products');
const reviewsRoute = require('./routers/reviews');
const ordersRoute = require('./routers/orders');
const order_itemsRoute = require('./routers/order_items');
const categoriesRoute = require('./routers/categories');
const cartRoute = require('./routers/cart');
const cart_itemsRoute = require('./routers/cart_items');



const api = process.env.API_URL;

//routers (lagi dapat nasa pinakababa)
app.use(`${api}/users`, usersRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/reviews`, reviewsRoute);
app.use(`${api}/orders_items`, order_itemsRoute);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/cart_items`, cart_itemsRoute);
app.use(`${api}/cart`, cartRoute);


//middleware methods
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

app.listen(3000, ()=>{
    console.log('server is now running http://localhost:3000');
})