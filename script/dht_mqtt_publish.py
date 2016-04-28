# -*- coding: utf-8 -*-
#!/usr/bin/env python
# Import package
import paho.mqtt.client as mqtt
import time
import sys
import Adafruit_DHT as dht

# Define Variables
MQTT_HOST = "localhost"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 45
MQTT_TOPIC = "/DHT"

def dht_info():
        while True:
                humidity, temperature = dht.read_retry(dht.AM2302, 24)
                if humidity is not None and temperature is not None:
                    # print("室内温度={0:0.1f}℃ ，相对湿度={1:0.1f}%".format(temperature, humidity))
                    return("{0:0.1f},{1:0.1f}".format(temperature, humidity))
                else:
                    return("0,0")
                    sys.exit(1)

# Define on_publish event function
def on_publish(client, userdata, mid):
	print "Message Published..."

while True:
        try:
                msg = dht_info()
                mqttc = mqtt.Client()
                mqttc.on_publish = on_publish
                mqttc.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)		
                # Publish message to MQTT Broker	
                mqttc.publish(MQTT_TOPIC,msg)
                # Disconnect from MQTT_Broker
                mqttc.disconnect()

                time.sleep(30)
        except (KeyboardInterrupt, SystemExit):
                # print("exit")
                sys.exit(1)
