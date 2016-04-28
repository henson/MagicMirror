var SubscriberClient = '';

var sub = new Subscriber();

var theTopicInput = new TopicInput();

var theMessageBox = new MessageBox();

var thePublishBox = new PublishBox();

React.render(
	theTopicInput,
	document.getElementById('topic')
);

React.render(
	theMessageBox,
	document.getElementById('message')
);

React.render(
	thePublishBox,
	document.getElementById('publish')
);