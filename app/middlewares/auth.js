
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const id = req.body.id;
  if (authHeader && id) {
    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    if (auth[1] == id) {
      console.log('Atentificació correcta');
      next();
      return;
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic');
  console.log('Autentificació incorrecta');
  return res.status(401).send("Unauthorized");
}

module.exports = auth;