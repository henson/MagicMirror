var config = {
    lang: "zh-cn",
    time: {
        timeFormat: 24
    },
    weather: {
        params: {
            cityid: "",
            key: ""
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
        url: ""
    },
    news: {
        feed: 'http://www.ftchinese.com/rss/news'
    }
}
