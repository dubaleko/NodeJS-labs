const publish_client = require('redis').createClient(6379);
publish_client.publish('channel-01', 'from publish_client message 1');
publish_client.publish('channel-01', 'from publish_client message 2');