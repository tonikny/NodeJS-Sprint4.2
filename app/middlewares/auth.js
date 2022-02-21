
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let id = undefined;
  if (req.headers.authorization) {
    if (req.params && req.params.id) {
      id = req.params.id;
    } else if (req.body && req.body.id) {
      id = req.body.id;
    }
    const authHeader = req.headers.authorization;
    if (id) {
      const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      if (auth[1] == id) {
        console.log('Autentificació correcta');
        next();
        return;
      }
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic');
  console.log('Autentificació incorrecta');
  return res.status(401).send("Unauthorized");
}

module.exports = auth;