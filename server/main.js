import { Meteor } from 'meteor/meteor';
import Twit from 'twit';
import _ from 'lodash';
import {
  statuses,
  respondList,
  responseMessages,
} from './twitter';

Meteor.startup(() => {
  // code to run on server at startup
  if (!Meteor.settings.twitter) {
    console.error('Please run the app with a settings.json file. Run meteor --settings settings.private.json with the twitter keys set.');

    return;
  }

  const T = new Twit(Meteor.settings.twitter);

  const stream = T.stream('statuses/filter',  { track: statuses });

  stream.on('tweet', tweet => {
    console.log('===== STREAM TWEET');
    console.log(tweet.user.screen_name);
    console.log(tweet.text);

    likeTweet(tweet.id_str);

    if (_.includes(respondList, tweet.user.screen_name))
      respondToTweet(tweet.id_str, tweet.user.screen_name);
  });

  const likeTweet = (tweetId) => {
    T.post('favorites/create', { id: tweetId }, (err, data, response) => {
      if (err)
        console.log(`Error liking tweet: ${tweetId}. ${err.message}`);
      else
        console.log('Liked: ', tweetId);
    });
  };

  const responseMessagesLength = responseMessages.length;

  const respondToTweet = (tweetId, handle) => {
    console.log(`===== RESPONDED TO TWEET ${tweetId}`);

    const responseMessage = responseMessages[Math.floor(Math.random() * responseMessagesLength)];

    const status = _.isFunction(responseMessage) ?
      responseMessage(handle) :
      responseMessage;

    console.log('status', status);

    T.post('statuses/update', {
      status,
      in_reply_to_status_id: tweetId,
    }, function(err, data, response) {
      // console.log(data);
    });
  };
});

// T.get('search/tweets', { q: '#fpl since:2011-07-16', count: 500 }, (err, data, response) => {
//   if (err) {
//     console.log('Error searching for tweets.');
//     console.log(err);
//   }
//
//   // console.log(data);
//
//   const { statuses } = data;
//
//   statuses.forEach(tweet => {
//     // console.log(tweet.text);
//     // console.log(tweet.id_str);
//     // // console.log(tweet.user);
//     // console.log(tweet.user.id_str);
//
//     likeTweet(tweet.id_str);
//   });
// });
