const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const db = require('./dbConfig');
const cors = require('cors');
const path = require('path');
const authRoute = require('./routers/auth');

// paymentsRoute.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

app.use('/auth', authRoute);
app.use(cors());
app.options('*', cors());


const PORT = process.env.PORT || 3000;

// PayMongo Secret Key
const PAYMONGO_SECRET_KEY = process.env.REACT_APP_PAYMONGO_KEY_SECRET;

router.post('/create-source', async (req, res) => {
  const { amount, type, currency, redirectUrl } = req.body;

  try {
    const response = await axios.post(
      'https://api.paymongo.com/v1/sources',
      {
        data: {
          attributes: {
            amount,
            currency,
            type,
            redirect: {
              success: redirectUrl.success,
              failed: redirectUrl.failed,
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment source', error: error.message });
  }
});

module.exports = router;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root URL to /Home
app.get('/', (req, res) => {
    res.redirect('/Home');
});

// Serve home.html when visiting /Home
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve shop.html when visiting /Shop
app.get('/Shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});

// Serve blog.html when visiting /Blog
app.get('/Blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});