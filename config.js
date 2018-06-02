
//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */

module.exports = db.connect({
  consumer_key: process.env.DB_CONSUMER_KEY,
  consumer_secret: process.env.DB_COMSUMER_SECRET,
  access_token: process.env.DB_ACCESS_TOKEN,
  access_token_secret: process.env.DB_ACCESS_TOKEN_SECRET
})
