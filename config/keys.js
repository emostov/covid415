
module.exports = process.env.NODE_ENV === 'production'
  ? (require('./keys_prod.js')) : (require('./keys_dev.js'));
