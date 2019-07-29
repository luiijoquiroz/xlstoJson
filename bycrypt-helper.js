/*
* Password encryption helper mrthod
*/

'use strict';

const bcrypt = require('bcrypt-nodejs');

const generate = function generateHash (str) {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(8), null);
};

const validate =  function isValidateHash (str, hash) {
  console.log('bcrypt: ', bcrypt.compareSync(str, hash));
  return bcrypt.compareSync(str, hash);
};

module.exports = {
  generate,
  validate
}
