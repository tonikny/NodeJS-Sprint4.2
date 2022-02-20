
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader('WWW-Authenticate','Basic');
    console.log('Autentificació incorrecta');
    return res.status(401).send("Unauthorized");
  }
  console.log('Atentificació correcta');
  //console.log(req.headers);
  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  res.setHeader('WWW-Authenticate','Basic');
  //console.log(auth);
  next();
}

module.exports = auth;