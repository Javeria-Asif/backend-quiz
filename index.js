const express = require('express');
const mongoose = require('mongoose');
const questionsRouter = require('./routes/Question');
const resultsRouter = require('./routes/Result');
// const session = require('express-session');
// const passport = require('passport');
// const User = require('./models/Users');
// require('./config/passport')(passport);
const cors = require('cors');
const authRouter = require('./routes/Auth');
// app.use('/api/auth', authRouter);
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 3000 });


const app = express();


app.use(cors({
  origin: 'https://localhost:3000'
}));
app.use(express.json());
app.use('/api/questions', questionsRouter);
app.use('/api/results', resultsRouter);
app.use('/api/auth', authRouter);


// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello world' });
});
app.get('/healtz',(req,res)=>res.status(200).send())
// Connect to MongoDB
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect('mongodb+srv://javeriaasif70:Javeria@cluster0.q4axtk1.mongodb.net/quiz', {
       useNewUrlParser: true,
       useUnifiedTopology: true
     })
   .then(() => console.log('MongoDB connected successfully'))
     .catch(err => console.error('MongoDB connection error:', err));
  cachedDb = db;
  return db;
}
app.get('/', async (req, res) => {
  await connectToDatabase();
  res.status(200).json({ message: 'hello world' });
});
// mongoose.connect('mongodb+srv://javeriaasif70:Javeria@cluster0.q4axtk1.mongodb.net/quiz', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));

module.exports = app