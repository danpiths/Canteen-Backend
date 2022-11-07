// IMPORTS
// nameless
require('dotenv').config();
require('express-async-errors');
// externals modules
const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const { Server } = require('socket.io');
// security measures
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
// internal modules
const connectDB = require('./db/connect');
const ErrorHandlerMiddleware = require('./middleware/error-handler');
const NotFoundMiddleware = require('./middleware/not-found');
// routers
const authRouter = require('./routes/authRoutes');
const cartRouter = require('./routes/cartRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const foodRouter = require('./routes/foodRoutes');
const orderRouter = require('./routes/orderRoutes');
const userRouter = require('./routes/userRoutes');

// CORS Setup
const corsOptions = {
  origin: ['https://canteenwala.netlify.app'],
  credentials: true,
};

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// MIDDLEWARE
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(xss());
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

// ROUTES
app.get('/api/v1', (req, res) => {
  res.status(200).send('<h1>CanteenWala API</h1>');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/users', userRouter);

// GUARD RAILS
app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddleware);

// SERVER START
const port = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket IO Server Setup
const io = new Server(server, {
  cors: corsOptions,
});
io.on('connection', socket => {
  console.log(`user connected: ${socket.id}`);

  socket.on('subscribe', data => {
    socket.join(data);
    console.log(`subscribed to ${data}. user: ${socket.id}`);
  });

  socket.on('changeOrdersServer', data => {
    socket.to('orders').emit('changeOrdersClient', data);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
