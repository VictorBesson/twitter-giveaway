var Twit = require('twit');

var config = require('./config.js');

var T = new Twit(config);

//Begin a stream for each status with the world giveaway
var stream = T.stream('statuses/filter', { track: 'giveaway rt suivre, giveaway rt follow', language: 'fr'})
var count =0;

function retweet(tweet_id){
  T.post('statuses/retweet/:id', { id: tweet_id }, function (err, data, response) {
    //Something to do after retweet
    if(!err){
      console.log('Retweet n°' + tweet_id);
    }else {
      console.log(err.message);
    }
  })
}

function fav(tweet_id){
  T.post('favorites/create', { id: tweet_id }, function (err, data, response){
    //In the like
    if(!err){
      console.log('Like n°' + tweet_id);
    }else{
      console.log(err.message);
    }

  })
}

function like(user_id){
  T.post('friendships/create', { id: user_id }, function (err, data, response){
    if(!err){
      console.log('Follow n°' + user_id);
    }else{
      console.log(err.message);
    }
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
  if(!tweet.retweeted){
    //retweet like tweet and like every person on mention

    fav(tweet.id_str);
    retweet(tweet.id_str);
    like(tweet.user.id_str);
    count++;
    //Check all mentions and like
    tweet.entities.user_mentions.forEach(function(element){
        like(element.id_str);
    })
  }




})

stream.on('limit', function (limitMessage) {
  console.log(limitMessage);
})

stream.on('error', function (event) {
  stream.stop();
  console.log("Limit Rate, 15 min of waiting...");
  console.log("Number of retweet : " + count);
  setTimeOut(stream.start(), 900000);
})
