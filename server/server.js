require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DB_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL, {

        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology : true,
        useFindAndModify : true

}).then(() => console.log('Connected to database successfully'))
  .catch(() => console.log('Error while connecting to database'));


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/posts', require('./routes/posts'));



app.listen(PORT, () => console.log(`server started and listening on ${PORT}`));