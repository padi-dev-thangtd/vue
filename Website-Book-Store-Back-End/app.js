const express = require('express');
const mongoClient = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup connect mongodb
// mongoClient.connect('mongodb://localhost/book-store-1', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connect mongodb success!'))
//   .catch((err) => console.error(err));

// Connect the database
const connectDB = async () => {
  try {
    await mongoClient.connect(
      // `mongodb+srv://dulich:dulich@cluster0.phz2s.gcp.mongodb.net/dulich?retryWrites=true&w=majority`,
      `mongodb+srv://book:book@cluster0.4mzmf.mongodb.net/book?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

const userRoute = require('./routes/user');
const productRoute = require('./routes/products');
const voucherRoute = require('./routes/vouchers');

//Route
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/vouchers', voucherRoute);

// Catch 404
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

app.use(() => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on ${port}`));
