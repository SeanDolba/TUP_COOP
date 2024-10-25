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
console.log(`Connected route: ${api}/users`);

app.use(`${api}/products`, productsRoute);
console.log(`Connected route: ${api}/products`);

app.use(`${api}/reviews`, reviewsRoute);
console.log(`Connected route: ${api}/reviews`);

app.use(`${api}/order_items`, order_itemsRoute);
console.log(`Connected route: ${api}/order_items`);

app.use(`${api}/orders`, ordersRoute);
console.log(`Connected route: ${api}/orders`);

app.use(`${api}/categories`, categoriesRoute);
console.log(`Connected route: ${api}/categories`);

app.use(`${api}/cart_items`, cart_itemsRoute);
console.log(`Connected route: ${api}/cart_items`);

app.use(`${api}/cart`, cartRoute);
console.log(`Connected route: ${api}/cart`);


//middleware methods
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

app.listen(3000, ()=>{
    console.log('server is now running http://localhost:3000');
})