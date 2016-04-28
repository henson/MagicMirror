#!/usr/bin/env python

# MUST BE RUN AS ROOT
# This script pings a website to see if we are connected to the internet
#  and should work regardless of eth0 or wlan0
#   -> if connected, assume that NTP set systime and update RTC
#   -> if not, assume systime is incorrect and update from RTC
#
# It should be noted that if you boot up with internet connected then
#  the os will automagically update systime but NOT the RTC
#  hence this code will update RTC when ethernet connected
#
# NOTE:  fake-hwclock may interfere if left enabled
#           sudo apt-get --purge remove fake-hwclock
#

import subprocess
import os

# Any valid website will work
website_to_ping = "www.baidu.com"

# ping website and get reply
ping = subprocess.Popen(["ping", "-c", "1", website_to_ping], stdout = subprocess.PIPE, stderr = subprocess.PIPE)
out, error = ping.communicate()

# We don't care what the actual reply is, only whether its a valid one or an error
#  hence we check string length to see if it is a null string
#
# We also could have used if/else since there are only two possible conditions
#
if (len(out) <> 0):
  #print out
  print "Network available, copying systime to RTC"
  os.system("hwclock -w")
if (len(error) <> 0):
  #print error
  print "Network NOT available, copying RTC to systime"
  os.system("hwclock -s")