
#-*- coding:utf-8 -*-

from datetime import date
import serial
import requests
import json

#import requests
url = ''

headers={'Content-type':'application/json'}
port = serial.Serial('/dev/ttyACM0',9600)

data = {
    'id' : '',
    'fid' : '',
    'startwith' : '',
    'endwith': '',
    'date' : date.today().isoformat(),
    'energy' : ''
}

r = ''


def cloudSending():
    print("클라우드로 데이터 전송")
    print(json.dumps(data))
    res = requests.post(url,data=json.dumps(data), headers=headers)
#    print(res.status_code)

def init():
        data = {
        'id' : '',
        'fid' : '',
        'startwith' : '',
        'endwith': '',
        'date' : date.today().isoformat(),
        'energy' : ''
    }

def pushing(r):
    if r == 'End':
        cloudSending()
    elif r == 'Exercise':
        init()
    else:
        sp = r.split('-')
        print(sp)
        data[sp[0]] = sp[1]



print("pi start")
while True:
    if port.readable():
        r = port.readline().decode('utf8')
        r = r[:len(r)-1].replace('\r','')
        r = r.replace('\n', '')
        #print(r[:len(r)-1])
        pushing(r)

