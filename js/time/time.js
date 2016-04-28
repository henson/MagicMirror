var   CalendarData=new Array(20);
var   madd=new Array(12);
var   TheDate=new Date();
var   tgString="甲乙丙丁戊己庚辛壬癸";
var   dzString="子丑寅卯辰巳午未申酉戌亥";
var   numString="一二三四五六七八九十";
var   monString="正二三四五六七八九十冬腊";
var   weekString="日一二三四五六";
var   sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var   cYear;
var   cMonth;
var   cDay;
var   cHour;
var   cDateString;
var   DateString;
var   Browser=navigator.appName;

    function   init()
    {
        CalendarData[0]=0x41A95;
        CalendarData[1]=0xD4A;
        CalendarData[2]=0xDA5;
        CalendarData[3]=0x20B55;
        CalendarData[4]=0x56A;
        CalendarData[5]=0x7155B;
        CalendarData[6]=0x25D;
        CalendarData[7]=0x92D;
        CalendarData[8]=0x5192B;
        CalendarData[9]=0xA95;
        CalendarData[10]=0xB4A;
        CalendarData[11]=0x416AA;
        CalendarData[12]=0xAD5;
        CalendarData[13]=0x90AB5;
        CalendarData[14]=0x4BA;
        CalendarData[15]=0xA5B;
        CalendarData[16]=0x60A57;
        CalendarData[17]=0x52B;
        CalendarData[18]=0xA93;
        CalendarData[19]=0x40E95;
        madd[0]=0;
        madd[1]=31;
        madd[2]=59;
        madd[3]=90;
        madd[4]=120;
        madd[5]=151;
        madd[6]=181;
        madd[7]=212;
        madd[8]=243;
        madd[9]=273;
        madd[10]=304;
        madd[11]=334;
    }

    function   GetBit(m,n)
    {
        return   (m>>n)&1;
    }

    function   e2c()
    {
        var   totalmnk;
        var   isEnd=false;
        var   tmp=TheDate.getYear();
        if   (tmp<1900)     tmp+=1900;
        total=(tmp-2001)*365
                +Math.floor((tmp-2001)/4)
                +madd[TheDate.getMonth()]
                +TheDate.getDate()
                -23;
        if   (TheDate.getYear()%4==0&&TheDate.getMonth()>1)
            total++;
        for(m=0;;m++)
        {
            k=(CalendarData[m]<0xfff)?11:12;
            for(n=k;n>=0;n--)
            {
                if(total<=29+GetBit(CalendarData[m],n))
                {
                    isEnd=true;
                    break;
                }
                total=total-29-GetBit(CalendarData[m],n);
            }
            if(isEnd)break;
        }
        cYear=2001   +   m;
        cMonth=k-n+1;
        cDay=total;
        if(k==12)
        {
            if(cMonth==Math.floor(CalendarData[m]/0x10000)+1)
                cMonth=1-cMonth;
            if(cMonth>Math.floor(CalendarData[m]/0x10000)+1)
                cMonth--;
        }
        cHour=Math.floor((TheDate.getHours()+3)/2);
    }

    function   GetcDateString()
    {   var   tmp="";
        tmp+=tgString.charAt((cYear-4)%10);       //年干
        tmp+=dzString.charAt((cYear-4)%12);       //年支
        //tmp+="(";
        tmp+=sx.charAt((cYear-4)%12);
		tmp+="年";
        //tmp+=")年";
        if(cMonth<1)
        {
            tmp+="闰";
            tmp+=monString.charAt(-cMonth-1);
        }
        else
            tmp+=monString.charAt(cMonth-1);
        tmp+="月";
        tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"卅"));
        if(cDay%10!=0||cDay==10)
            tmp+=numString.charAt((cDay-1)%10);
        cDateString=tmp;
        return   tmp;
    }

init();
e2c();
GetcDateString();

var time = {
	timeFormat: config.time.timeFormat || 24,
	dateLocation: '.date',
	timeLocation: '.time',
	updateInterval: 1000,
	intervalId: null
};

/**
 * Updates the time that is shown on the screen
 */
time.updateTime = function () {

	if (config.lang=='zh-cn'){
		var _now = moment(),
		_date = _now.format('LLdddd');
		}else{
		var _now = moment(),
		_date = _now.format('dddd, LL');}

	$(this.dateLocation).html(_date+"</br>农历"+cDateString);
	$(this.timeLocation).html(_now.format(this._timeFormat+':mm[<span class="sec">]ss[</span>]'));

}

time.init = function () {

	if (parseInt(time.timeFormat) === 12) {
		time._timeFormat = 'hh'
	} else {
		time._timeFormat = 'HH';
	}

	this.intervalId = setInterval(function () {
		this.updateTime();
	}.bind(this), 1000);

}