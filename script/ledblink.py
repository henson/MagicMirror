# -*- coding: utf-8 -*-
#!/usr/bin/env python

import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(40,GPIO.OUT)

P = GPIO.PWM(40,60)#频率设置为60Hz
P.start(0)#0是占空比
while True:
  try:
    #GPIO.output(40,True)
    #time.sleep(1)
    #GPIO.output(40,False)
    #time.sleep(1)
    for dc in range(0,101,1):
	P.ChangeDutyCycle(dc)#更改占空比
	time.sleep(0.01)
    for dc in range(100,-1,-1):
	P.ChangeDutyCycle(dc)
	time.sleep(0.01)
  except (KeyboardInterrupt, SystemExit):
    GPIO.close()
    sys.exit(1)
