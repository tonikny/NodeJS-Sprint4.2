require('dotenv').config();

const express = require('express');
const app = express();

const rutes = require('./routes/player.router');
app.use('/', rutes.router);


const port = parseInt(process.env.PORT, 10) || 3000;
const base_url = 'http://localhost';
app.listen(port, () => {
  console.log(`App escoltant a ${base_url}:${port}`);
});

