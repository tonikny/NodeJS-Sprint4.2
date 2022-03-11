const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecretToken = process.env.JWT_SECRET_TOKEN;
const username = process.env.ADMIN_NAME;
const password = process.env.ADMIN_PASS;

module.exports = {

  login: async (req, res, next) => {
    if (req.body 
      && req.body.username && req.body.username == username
      && req.body.password && await bcrypt.compare(req.body.password, password)) {

      let jwtToken = jwt.sign(
        {
          username: req.body.username,
        },
        jwtSecretToken,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
      })
    } else {
      return res.status(401).json({
        message: 'Authentication failed',
      })
    }
  }

}
