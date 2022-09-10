require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'suaSenhaSecreta';

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (id) => {
  const token = jwt.sign({ data: id }, JWT_SECRET, JWT_CONFIG);
  return token;
};

module.exports = createToken;
