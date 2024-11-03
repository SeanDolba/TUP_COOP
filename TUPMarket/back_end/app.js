const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./dbConfig');

// Load environment variables
dotenv.config();

// Import routes
const authRoute = require('./routers/auth');
const usersRoute = require('./routers/users');
const productsRoute = require('./routers/products');
const reviewsRoute = require('./routers/reviews');
const ordersRoute = require('./routers/orders');
const order_itemsRoute = require('./routers/order_items');
const categoriesRoute = require('./routers/categories');
const cartRoute = require('./routers/cart');
const cart_itemsRoute = require('./routers/cart_items');
const paymentsRoute = require('./routers/paymentsRoute');

// Middleware
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root URL to /Home
app.get('/', (req, res) => {
    res.redirect('/Home');
});

// Serve HTML pages for specific routes
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/Shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});

app.get('/Blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// API Routes
const api = process.env.API_URL || '/api';

app.use(`${api}/auth`, authRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/reviews`, reviewsRoute);
app.use(`${api}/order_items`, order_itemsRoute);
app.use(`${api}/orders`, ordersRoute);
app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/cart_items`, cart_itemsRoute);
app.use(`${api}/cart`, cartRoute);
app.use(`${api}/payments`, paymentsRoute);

// Server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
