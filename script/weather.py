# -*- coding: utf-8 -*-
import sys, urllib, urllib2, json
url = 'https://api.heweather.com/x3/weather?cityid=CN101240101&key=b510b5ef572b40d5b60831f87afac101'
req = urllib2.Request(url)
resp = urllib2.urlopen(req)
content = resp.read()
if(content):
	print(content)