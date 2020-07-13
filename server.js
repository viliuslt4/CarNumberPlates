const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const plates = require('./server/platesController');
const port = 4600;

app.use(express.static(path.join(__dirname, 'dist/CarNumberPlates')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/plates', plates);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
});

app.listen(port, ()=>console.log(`App is running on http://localhost:${port}/`));