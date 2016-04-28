var temperature = '0';
var humidity = '0';

var temhum = {
  mqttServer      : config.tem_hum.mqttServer,
  mqttServerPort  : config.tem_hum.mqttServerPort,
  mqttclientName  : config.tem_hum.mqttclientName,
  temperatureTopic: config.tem_hum.temperatureTopic,
};

// Create a client instance
client = new Paho.MQTT.Client(temhum.mqttServer, temhum.mqttServerPort, temhum.mqttclientName);
client.connect({onSuccess:function() {
// Once a connection has been made, make a subscription and send a message.
  client.subscribe(temhum.temperatureTopic);
}});

client.onConnectionLost = function(responseObject) {
  if (responseObject.errorCode !== 0) {
    alert("onConnectionLost:"+responseObject.errorMessage);
  }
};

client.onMessageArrived = function(message) {
  var topic = message.destinationName;
  if (topic == config.tem_hum.temperatureTopic) {
    var DHT_info = message.payloadString;
    var DHT_data = DHT_info.split(',');
    temperature = DHT_data[0];
    localStorage.setItem('temperature',temperature);
    humidity = DHT_data[1];
    localStorage.setItem('humidity',humidity);
  }
};

var tem_hum = {
  temperatureLocation: '.temhum',
  updateInterval: 10000,

}

tem_hum.updateTemHum = function () {
  var thtext2 = '<div>' + temperature + '℃</div><div class="small">室内温度</div>'
  var thtext3 = '<div>' + humidity    + '%</div><div class="small">相对湿度</div>'
  var thtext  = '<div class="temhum_left">'+thtext2+'</div><div class="temhum_right">'+thtext3+'</div>'
  $(this.temperatureLocation).updateWithText(thtext, this.fadeInterval);

}

tem_hum.init = function () {
  temperature = localStorage.getItem('temperature');
  humidity    = localStorage.getItem('humidity');
  	this.updateTemHum();

	this.intervalId = setInterval(function () {
		this.updateTemHum();
	}.bind(this), this.updateInterval)

}
