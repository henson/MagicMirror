// MQTT client that publishes a message to a topic
var Publisher = function(data) {
	var broker = {
		host:"localhost",
		port:9001
	};
	var clientId = "mqtt_test_b112358_pub";
	var userName = "mqtt_test_b112358_pub";

	// Create a client instance
	var client = new Paho.MQTT.Client(broker.host, broker.port, clientId);

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	client.onMessageDelivered = onMessageDelivered;

	var lastWillMessage = new Paho.MQTT.Message("CRASHED - CONNECTION NOT CLOSED CLEANLY");
	lastWillMessage.destinationName="pahodemo/clienterrors/mqtt_test_b112358";
	lastWillMessage.qos = 2;
	lastWillMessage.retained=true;

	var connectOptions = {
		timeout:30,
		willMessage:lastWillMessage,
		cleanSession:true,
		onSuccess:onConnect,
		onFailure:failConnect,
	};	

	// connect the client
	client.connect(connectOptions);
	client.disconnect();


	// called when the client connects
	function onConnect() {
	  // Once a connection has been made, make a subscription and send a message.
	message = new Paho.MQTT.Message(data.message);
	message.qos = data.qos;
	message.retained = data.retained;
	message.destinationName = data.topic;
	client.send(message); 
	}

	// called when the client loses its connection
	function onConnectionLost(responseObject) {
	  if (responseObject.errorCode !== 0) {
		//console.err("onConnectionLost:"+responseObject.errorMessage);
	  }
	}

	// called when a message arrives
	function onMessageArrived(message) {
	}

	function onMessageDelivered(message){
	}

	function failConnect(responseObject){
	}
}