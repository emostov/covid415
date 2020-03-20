
module.exports = process.env.NODE_ENV === 'production'
  ? (require('./keys_prod_front.js')) : (require('./keys_dev_front.js'));