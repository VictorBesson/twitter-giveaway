require('dotenv').load();

var Twit = require('twit');

var config = {
  consumer_key: process.env.DB_CONSUMER_KEY,
  consumer_secret: process.env.DB_COMSUMER_SECRET,
  access_token: process.env.DB_ACCESS_TOKEN,
  access_token_secret: process.env.DB_ACCESS_TOKEN_SECRET
}

var T = new Twit(config);

//Begin a stream for each status with the world giveaway
var stream = T.stream('statuses/filter', { track: process.env.DB_TRACK, language: process.env.DB_LANG})

//On each tweet in realtime, begin this function
stream.on('tweet', function (tweet) {
  if(tweet.is_quote_status){
    //if it's a quote, get the original tweet
    tweet = tweet.quoted_status;
  }
  if(tweet.hasOwnProperty('retweeted_status')){
    //or it's a retweet
    tweet = tweet.retweeted_status;
  }
  if(tweet.retweet_count > 5){
    retweetAndFav(tweet);
  }

})

stream.on('limit', function (limitMessage) {
  console.log(limitMessage);
})

stream.on('error', function (event) {
  console.log(event);
})
stream.on('connected', function (response) {
  console.log('Stream connected');
})
stream.on('connect', function (request) {
  console.log('Connection...');
})
stream.on('reconnect', function (request, response, connectInterval) {
  console.log('Reconnection on ' + connectInterval);
})

function retweetAndFav(tweet){
  T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    //If retweet is fine go for fav and like
    if(!err){
      console.log('Retweet n°' + tweet.id_str);
      like(tweet.user.id_str);
      T.post('favorites/create', { id: tweet.id_str }, function (err, data, response){
        //In the like
        if(!err){
          console.log('Like n°' + tweet.id_str);
        }else{
          console.log(err.message);
        }

      })
      //Check all mentions and like it
      tweet.entities.user_mentions.forEach(function(element){
          like(element.id_str);
      })

    }else {
      //console.log(err.message);
    }
  })
}
function like(user_id){
  T.post('friendships/create', { id: user_id }, function (err, data, response){
    if(!err){
      console.log('Follow n°' + user_id);
    }else{
      //console.log(err.message);
    }
  })
}
