const jwt = require('jsonwebtoken');

const methods = {};

methods.auth = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEYS);
  return token;
};

methods.isLogin = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEYS, (err, decoded) => {
    // console.log(decoded);
    if (decoded) {
      next();
    } else {
      res.json({ msg: 'Anda harus login dulu', success: false, error: err });
    }
  });
};

methods.decode = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEYS);
  } catch (err) {
    return err;
  }
};

module.exports = methods;
