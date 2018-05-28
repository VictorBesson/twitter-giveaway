var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

//Begin a stream for each status with the world giveaway
var stream = T.stream('statuses/filter', { track: 'giveaway rt suivre, giveaway rt follow', language: 'fr' })

function retweet(tweet_id){
  T.post('statuses/retweet/:id', { id: tweet_id }, function (err, data, response) {
    //Something to do after retweet
    console.log('Retweet n°' + tweet_id);
  })
}

function fav(tweet_id){
  T.post('favorites/create/:id', { id: tweet_id }, function (err, data, response){
    //In the like
    console.log('Like n°' + tweet_id);
  })
}

function like(user_id){
  T.post('friendships/create', { id: user_id }, function (err, data, response){
    console.log(user_id);
  })
}

//On each tweet in realtime, begin this function
stream.on('tweet', function (tweet) {
  if(tweet.hasOwnProperty('retweeted_status') == false && tweet.is_quote_status == false){
    //retweet like tweet and like every person on mention
    retweet(tweet.id_str);
    fav(tweet.id_str);
    like(tweet.user.id_str)
    for(let user in tweet.entities.user_mention){
      like(user.id_str);
    }

}

})
