const linkCheck = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const allowedCors = [
  'https://mesto.gorod.nomoredomains.work/',
  'http://mesto.gorod.nomoredomains.work/',
  'localhost:3001',
];

module.exports = { linkCheck, allowedCors };
