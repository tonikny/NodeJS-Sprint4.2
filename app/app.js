require('dotenv').config();

const express = require('express');
const app = express();

const rutesPlayer = require('./routes/player.router');
const rutesAuth = require('./routes/auth.router');

app.use(express.json());
app.use('/login', rutesAuth.router);
app.use('/players', rutesPlayer.router);

// catch 404 and forward to error handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesn\'t exist'
  })
});

const port = parseInt(process.env.PORT, 10) || 3000;
const base_url = 'http://localhost';
app.listen(port, () => {
  console.log(`App escoltant a ${base_url}:${port}`);
});

