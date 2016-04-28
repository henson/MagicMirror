// MQTT Client that subscribes to topics
var Subscriber = function() {
	var broker = {
		host:"localhost",
		port:9001
	};

	var clientId = "mqtt_test_b112358_sub";
	var userName = "mqtt_test_b112358_sub";

	// Create a client instance
	SubscriberClient = new Paho.MQTT.Client(broker.host, broker.port, clientId);

	// set callback handlers
	SubscriberClient.onConnectionLost = onConnectionLost;
	SubscriberClient.onMessageArrived = onMessageArrived;
	SubscriberClient.onMessageDelivered = onMessageDelivered;

	var lastWillMessage = new Paho.MQTT.Message("CRASHED - CONNECTION NOT CLOSED CLEANLY");
	lastWillMessage.destinationName="pahodemo/clienterrors/mqtt_test_b112358";
	lastWillMessage.qos = 2;
	lastWillMessage.retained=true;

	var connectOptions = {
		timeout:30,
		willMessage:lastWillMessage,
		cleanSession:false,
		onSuccess:onConnect,
		onFailure:failConnect,
	};	

	// connect the client
	SubscriberClient.connect(connectOptions);


	// called when the client connects
	function onConnect() {
	}

	// called when the client loses its connection
	function onConnectionLost(responseObject) {
	  if (responseObject.errorCode !== 0) {
		console.log("onConnectionLost:"+responseObject.errorMessage);
	  }
	}

	// called when a message arrives
	function onMessageArrived(message) {
	  MessageStore.addMessage(message);
	  MessageStore.emitChange();
	}

	function onMessageDelivered(message){
	}

	function failConnect(responseObject){
	}
}

Subscriber.add = function(topic){
	SubscriberClient.subscribe(topic);
}