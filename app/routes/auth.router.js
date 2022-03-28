const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/', authController.login);

// catch 404 and forward to error handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesn\'t exist'
  })
});

module.exports = { router }
