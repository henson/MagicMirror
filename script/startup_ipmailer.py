# -*- coding: utf-8 -*-

import subprocess
import smtplib
import socket
from email.mime.text import MIMEText
import datetime
to = 'henson_lu@126.com'
email_user = 'henson_lu@qq.com'
email_password = 'heng1980'
smtpserver = smtplib.SMTP('smtp.qq.com',587)
smtpserver.ehlo()
smtpserver.starttls()
smtpserver.ehlo
smtpserver.login(email_user, email_password)
today = datetime.date.today()
arg='ip route list'
p=subprocess.Popen(arg,shell=True,stdout=subprocess.PIPE)
data = p.communicate()
split_data = data[0].split()
ipaddr = split_data[split_data.index('src')+1]
my_ip = 'Your ip is %s' % ipaddr
msg = MIMEText(my_ip)
msg['Subject'] = 'IP For RaspberryPi on %s' % today.strftime('%b %d %Y')
msg['From'] = email_user
msg['To'] = to
smtpserver.sendmail(email_user, [to], msg.as_string())
smtpserver.quit()

# Involve this script in /etc/rc.local
# e.g. python /home/pi/ipmailer/startup_ipmailer.py