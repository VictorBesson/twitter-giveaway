# Twitter-giveaway
==================

**WARNING : this bot is no longer accepted by twitter, use it as you own risk.**

Small twitter bot for giveaway, with node.js
It retweet, like and follow all mention in tweet with a certain track

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
You need to install [node.js](https://nodejs.org/en/)

### Installing

* Create an app on [twitter](https://apps.twitter.com/) (you need to be logged)

* Create a .env file in the root of the project with that template, the `keys` and `tokens` is available on the app page.
```
DB_CONSUMER_KEY=*
DB_COMSUMER_SECRET=*
DB_ACCESS_TOKEN=*
DB_ACCESS_TOKEN_SECRET=*
DB_LANG=*
DB_TRACK=*
```

DB_LANG is the lang of the tweet you want to get, with that [code](https://dev.twitter.com/web/overview/languages).
DB_TRACK is the track of the tweet you want to get, in quote "". You can seperate different track with a coma.


* start the script with :
```
npm start
```

## Deployment

I recommand using [pm2](http://pm2.keymetrics.io/) for a live system

## Built With

* [node.js](https://nodejs.org/en/)
* [dotenv](https://maven.apache.org/) - Environnement variable withe .env file
* [twit](https://www.npmjs.com/package/twit) - For the REST and streaming API

## Authors

* **[Victor Besson](https://github.com/VictorBesson)**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Know isssue

* Too many follow if we pick the en language
* Twitter limit 5000 follow for an user, need to unfollow after that limit
