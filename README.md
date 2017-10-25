# Twitter Bot

## Running the Bot
* Install Meteor.
* `npm install`
* Copy `settings.example.json` to `settings.private.json` and enter your twitter API details. `settings.private.json` is in the `.gitignore` list.
* Copy `server/twitter.example.js` to `server/twitter.js` and fill it in with the statuses you wish to like and respond to.
* Run `meteor --settings settings.private.json`.

The bot will now start running and auto liking and responding to relevant users.

We use this with a secondary Twitter account so we don't get blocked. If Twitter does ever lock your account, it's not difficult to unlock it.

Server side only app. View the console to see what's happening.

## Notes
Responding too aggressively to users can get your bot blocked. Because of this we removed the feature to respond to all tweets in the stream.
