from datetime import datetime
import json
import sys
import Adafruit_DHT

while True:
	humidity, temperature = Adafruit_DHT.read_retry(11,4)
	print 'Temp:{0:0.1f} C Humidity {1:0.1f}%'.format(temperature, humidity)
	time = str(datetime.now())
	temperature = time + ":" + str(temperature)
	with open('data.txt', 'w') as outfile:
		json.dump(temperature, outfile)
	#print type(temperature)

