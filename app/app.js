require('dotenv').config();

const express = require('express');
const app = express();

const rutesPlayer = require('./routes/player.router');
const rutesAuth = require('./routes/auth.router');

app.use(express.json());
app.use('/login', rutesAuth.router);
app.use('/players', rutesPlayer.router);


const port = parseInt(process.env.PORT, 10) || 3000;
const base_url = 'http://localhost';
app.listen(port, () => {
  console.log(`App escoltant a ${base_url}:${port}`);
});

