var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

//Begin a stream for each status with the world giveaway
var stream = T.stream('statuses/filter', { track: 'giveaway rt suivre, giveaway rt follow'})

function retweet(tweet_id){
  T.post('statuses/retweet/:id', { id: tweet_id }, function (err, data, response) {
    //Something to do after retweet
    console.log('Retweet n°' + tweet_id);
  })
}

function fav(tweet_id){
  T.post('favorites/create', { id: tweet_id }, function (err, data, response){
    //In the like
    console.log('Like n°' + tweet_id);
  })
}

function like(user_id){
  T.post('friendships/create', { id: user_id }, function (err, data, response){
    console.log('User n°' + user_id);
  })
}

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
  //retweet like tweet and like every person on mention
  if(tweet.retweeted == false){
    retweet(tweet.id_str);
  }
  if(tweet.favorited == false){
    fav(tweet.id_str);
    like(tweet.user.id_str);
  }
//Check all mentions and like
  tweet.entities.user_mentions.forEach(function(element){
    like(element.id_str);
  })

})

stream.on('limit', function (limitMessage) {
  console.log(limitMessage);
})

stream.on('error', function (event) {
  stream.stop;
  console.log("Limit Rate, 15 min of waiting...");
  setTimeOut(stream.start, 900000);
})
