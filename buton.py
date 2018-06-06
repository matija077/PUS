import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BCM)
GPIO.setup(4, GPIO.IN)


while True:
	inputValue=GPIO.input(4)
	if(inputValue==False):
		print("Buton")
	time.sleep(0.3)
