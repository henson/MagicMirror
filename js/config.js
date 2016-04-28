var config = {
    lang: 'zh-cn',
    time: {
        timeFormat: 24
    },
    weather: {
        params: {
            cityid: 'CN101240101',
            key: 'b510b5ef572b40d5b60831f87afac101'
        }
    },
    tem_hum: {
        mqttServer:"localhost",
	mqttServerPort:9001,
	mqttclientName:"magic_mirror_tem_hum",
	temperatureTopic:"/DHT"
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: "https://p04-calendarws.icloud.com/ca/subscribe/1/xsnGWRhKpdsetOOuMVsj-Y9bNbZMz7NhFf7TC88ObsdSiN5nheXud4szxoLCON1O"
    },
    news: {
        feed: 'http://www.ftchinese.com/rss/news'
    }
}
