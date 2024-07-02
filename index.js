const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/dbConnection/DbConn');
const articlesRouter = require('./src/router/articles');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', articlesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
