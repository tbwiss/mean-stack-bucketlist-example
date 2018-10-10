const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const bucketlist = require('./controllers/bucketlist');

const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.database);

const port = 3004;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Invalid page');
});

app.use('/bucketlist', bucketlist);

app.listen(port, () => {
    console.log(`Starting the server at port ${port}.`);
});
