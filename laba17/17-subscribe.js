const subscribe_client = require('redis').createClient(6379);
subscribe_client.on("message", function (channel, message) {
    console.log("channel: " + channel + ', message: ' + message);
});
subscribe_client.subscribe('channel-01');
setTimeout(() => { client.unsubscribe();}, 60000);