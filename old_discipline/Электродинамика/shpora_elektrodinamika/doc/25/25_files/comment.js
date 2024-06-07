var Cackle=Cackle||{};
Cackle.Cookie=Cackle.Cookie||{create:function(b,d,e){var c=b+"="+d;
if(e){var a=new Date();
a.setTime(a.getTime()+(e*24*60*60*1000));
c+=";expires="+a.toGMTString()
}if(window.mcXDCookie){c+=";domain="+this.getXDomain()
}c+=";path=/";
document.cookie=c
},getXDomain:function(){var b=window.location.hostname.split("."),a=b.length;
if(a>1){return"."+b[a-2]+"."+b[a-1]
}else{return""
}},read:function(b){var e=b+"=",a=document.cookie.split(";");
for(var d=0;
d<a.length;
d+=1){var f=a[d];
while(f.charAt(0)===" "){f=f.substring(1,f.length)
}if(f.indexOf(e)===0){return f.substring(e.length,f.length)
}}return null
},erase:function(a){this.create(a,"",-1)
}};var Cackle=Cackle||{};
Cackle.Storage=Cackle.Storage||{storage:null,JSON:{parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()
}||Cackle.mcJQ.parseJSON||Cackle.mcJQ.evalJSON,stringify:function(e){var d=typeof(e);
if(d!="object"||e===null){if(d=="string"){e='"'+e+'"'
}return String(e)
}else{var f,b,c=[],a=(e&&e.constructor==Array);
for(f in e){b=e[f];
d=typeof(b);
if(d=="string"){b='"'+b+'"'
}else{if(d=="object"&&b!==null){b=this.stringify(b)
}}c.push((a?"":'"'+f+'":')+String(b))
}return(a?"[":"{")+String(c)+(a?"]":"}")
}}},init:function(){var a=false;
if("localStorage" in window){try{window.localStorage.setItem("_tmptest","tmpval");
a=true;
window.localStorage.removeItem("_tmptest")
}catch(d){}}if(a){try{if(window.localStorage){this.storage=window.localStorage
}}catch(c){}}else{if("globalStorage" in window){try{if(window.globalStorage){if(window.location.hostname=="localhost"){this.storage=window.globalStorage["localhost.localdomain"]
}else{this.storage=window.globalStorage[window.location.hostname]
}}}catch(b){}}else{if(Cackle.Cookie){this.storage={setItem:function(e,f){Cackle.Cookie.create(e,f,365)
},getItem:function(e){return Cackle.Cookie.read(e)
},removeItem:function(e){Cackle.Cookie.erase(e)
}}
}}}},set:function(a,b){var c=this.JSON.stringify(b);
this.storage.setItem(a,c)
},get:function(a){var c=this.storage.getItem(a);
try{return this.JSON.parse(c)
}catch(b){return c
}},remove:function(a){this.storage.removeItem(a)
}};
Cackle.Storage.init();var Cackle=Cackle||{};
Cackle.Utils=Cackle.Utils||{getJSON:function(a,b){if(b){a=a.replace("callback=?","callback="+this.createAnonymFunc(b))
}this.loadScript(a);
return true
},createAnonymFunc:function(c,b){var a="cackle_"+Math.floor(Math.random()*1000001);
window[a]=function(d){if(!b){window[a]=undefined;
try{delete window[a]
}catch(f){}}c(d)
};
return a
},execFunction:function(a,c){try{window[a](c[0],c[1],c[2],c[3],c[4])
}catch(b){try{a(c[0],c[1],c[2],c[3],c[4])
}catch(b){}}},loadScript:function(b){var a=document.createElement("script");
a.src=b;
a.type="text/javascript";
this.appendResource(a);
return a
},loadStyle:function(a){var b=document.createElement("link");
b.rel="stylesheet";
b.type="text/css";
b.href=a;
this.appendResource(b);
return b
},post:function(b,d){var c=document.createElement("form");
c.action=decodeURIComponent(b.match("^https?://")?b:"http://"+b);
c.method="post";
c.target="_top";
c.style.display="none";
var a=document.createElement("input");
a.type="hidden";
a.name=d.name;
a.value=d.value;
c.appendChild(a);
document.body.appendChild(c);
c.submit()
},appendResource:function(a){(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)
},openPopup:function(b,c,a){var e=(screen.width/2)-(c/2),d=(screen.height/2)-(a/2);
return window.open(b,"","location=1,status=1,resizable=yes, width="+c+", height="+a+", top="+d+", left="+e)
},addParam:function(a,b){if(a.indexOf("?")>-1){return a+"&"+b
}else{return a+"?"+b
}},urlsToHyperlinks:function(d){var c=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,b=/(^|[^\/])(www\.[\S]+(\b|$))/ig,a=d.replace(c,'<a href="$1" target="_blank">$1</a>');
return a.replace(b,'$1<a href="http://$2" target="_blank" rel="nofollow">$2</a>')
},escapeHtml:function(a){return a?document.createElement("div").appendChild(document.createTextNode(a)).parentNode.innerHTML:""
},escapeHtmlWithLinks:function(a){return this.urlsToHyperlinks(this.escapeHtml(a))
},escapeSpecialChars:function(b){var c=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,a={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
c.lastIndex=0;
return c.test(b)?b.replace(c,function(d){var e=a[d];
return typeof e==="str"?e:"\\u"+("0000"+d.charCodeAt(0).toString(16)).slice(-4)
}):b
},textareaAutoResize:function(){var a=Cackle.mcJQ(this);
a.height(0);
if(parseInt(a.height())<this.scrollHeight){a.height(this.scrollHeight+4)
}},getBeforeAnchor:function(a){if(a.indexOf("#")>0){return a.substring(0,a.indexOf("#"))
}else{return a.substring(0,a.length)
}},getAfterAnchor:function(a){return a.substring(a.indexOf("#"),a.length)
},getSearchPath:function(c){var b=document.createElement("a");
b.href=c;
var d=this.getSearchPathFromLocation(b);
if(d.indexOf("/")!=0){return"/"+d
}else{return d
}},getSearchPathFromLocation:function(a){return a.pathname+a.search
},template:function(html,messages,data){var handler=this,lastIf=0,miner=function(code){var c=code.split("."),ref=null;
for(var i=0;
i<c.length;
i++){if(ref){ref=ref[c[i]]
}else{ref=data[c[i]]
}}return ref
};
var result=html.replace(/\$\{([\s\S]+?)\}/g,function(m,code){if(code.indexOf("if ")==0){if(/if [\w]+ ?(==|!=|>|<|>=|<=) ?[\s\S]+/.test(code)){var val=code.replace("if ","").replace(/[\S]+/g,function(c){var n=data[c];
if(n!=undefined){if(typeof n==="string"){return'"'+n+'"'
}else{return n
}}else{return c
}});
if(!eval(val)){lastIf=-1;
return"{{"
}else{return""
}}else{var v=code.split(" ")[1];
if(!miner(v)){lastIf=-1;
return"{{"
}else{return""
}}}else{if(code.indexOf("endif")==0){if(lastIf<0){lastIf=0;
return"}}"
}else{return""
}}else{if(code.indexOf("msg.")==0){var n=code.replace("msg.","");
return messages.msg?messages.msg(n):messages[n]
}else{if(code.indexOf("?html")>-1){return handler.escapeHtml(data[code.replace("?html","")])
}else{if(code.indexOf(".")>-1){var c=code.split("."),ref=null;
for(var i=0;
i<c.length;
i++){if(ref){ref=ref[c[i]]
}else{ref=data[c[i]]
}}return ref
}else{if(data[code]===undefined){return""
}else{return data[code]
}}}}}}});
return result.replace(/\{\{[\s\S]+?\}\}/g,"")
},declineMsg:function(e,c,b,a){var d=e%10;
if((d==1)&&((e==1)||(e>20))){return c
}else{if((d>1)&&(d<5)&&((e>20)||(e<10))){return b
}else{return a
}}},getBrowserLang:function(){return(navigator.language||navigator.systemLanguage||navigator.userLanguage||"en").substr(0,2).toLowerCase()
},hasMoreElement:function(c,a){if(c){var b=typeof a!="undefined"?a:(c.number+1);
if(b<0||b==c.number){return false
}else{return b*c.size<c.totalElements
}}return false
},isInteger:function(a){return a%1===0
},setFixedTop:function(b,d){if(b.length==0||b.hasClass("mc-fixed")){return
}var a=b.height(),c=b.offset().top;
d.scroll(function(){d.scrollTop()>c?b.addClass("mc-fixed").attr("style","position:fixed!important;top:0!important;margin:0!important;"):b.removeClass("mc-fixed").attr("style","")
})
},callbacks:function(a,e,d){if(!a.callback){return
}var c=a.callback[e];
if(c&&c.length>0){for(var b=0;
b<c.length;
b++){c[b](d)
}}},getChannel:function(a){var b;
if(a.channel){b=a.channel
}else{if(a.url){b=this.getSearchPath(a.url)
}else{b=this.getSearchPathFromLocation(window.location)
}}if(a.chanWithoutParams&&b.indexOf("?")>-1){return b.substring(0,b.indexOf("?")||b.length)
}return b
},getUrl:function(a){return a.url||Cackle.Utils.getBeforeAnchor(window.location.href)
},isSafari:function(){return navigator.userAgent.indexOf("Safari")>-1&&navigator.userAgent.indexOf("Chrome")<0
},bootstrapWidget:function(c){var b=this;
for(var a=0;
a<cackle_widget.length;
a++){(function(d){var e=Cackle[d.widget],f=d.id+(d.container||"");
if(!e||!e.getBootstrapUrl){return
}e[f]=e[f]||{};
if(!c&&e[f].isLoaded){return
}e[f].isLoaded=true;
b.getJSON(e.getBootstrapUrl(d),function(g){d.data=(function(h){for(var i in h){return h[i]
}})(g);
d.lang=d.lang||d.data.lang||b.getBrowserLang();
e.lang=d.lang;
e.main(d,Cackle.mcJQ)
})
})(cackle_widget[a])
}}};var Cackle=Cackle||{};
Cackle.Time=Cackle.Time||{getTime:function(b,c,a){if(a=="chat"){return this.getChatTime(b,c||"ru")
}else{if(a){return this.getFormatTime(b,a,c||"ru")
}else{return this.getDefaultTime(b,c||"ru")
}}},getChatTime:function(g,j){var c=new Date().getTime(),b=c-g,f=b/1000,a=f/60,e=a/60,i=e/24;
if(e<24){return this.getFormatTime(g,"HH:mm",j)
}else{if(i<365){return this.getFormatTime(g,"dd.MM HH:mm",j)
}else{return this.getFormatTime(g,"yyyy.MM.dd HH:mm",j)
}}},getDefaultTime:function(g,j){var c=new Date().getTime(),b=c-g,f=b/1000,a=f/60,e=a/60,i=e/24;
if(e<24){return this.getTimeAgo(g,j)
}else{if(i<30){return this.getTimeAgo(g,j)+" "+this.getFormatTime(g,"HH:mm",j)
}else{if(i<365){return this.getFormatTime(g,"dd.MM HH:mm",j)
}else{return this.getFormatTime(g,"yyyy.MM.dd HH:mm",j)
}}}},getTimeAgo:function(c,b){var a=new Date().getTime(),i=a-c,k=i/1000,e=k/60,f=e/60,g=f/24,j=g/365;
b=Cackle.Time.Messages[b]?b:"en";
if(k<45){return Cackle.Time.Messages[b].second
}else{if(k<90){return Cackle.Time.Messages[b].minute
}else{if(e<45){return Cackle.Time.Messages[b].minutes(e)
}else{if(e<90){return Cackle.Time.Messages[b].hour
}else{if(f<24){return Cackle.Time.Messages[b].hours(f)
}else{if(f<48){return Cackle.Time.Messages[b].day
}else{if(g<30){return Cackle.Time.Messages[b].days(g)
}else{if(g<60){return Cackle.Time.Messages[b].month
}else{if(g<365){return Cackle.Time.Messages[b].months(g)
}else{if(j<2){return Cackle.Time.Messages[b].year
}else{return Cackle.Time.Messages[b].years(j)
}}}}}}}}}}},getFormatTime:function(d,c,e){var b=new Date(d),a={SS:b.getMilliseconds(),ss:b.getSeconds(),mm:b.getMinutes(),HH:b.getHours(),hh:((b.getHours()%12)?b.getHours()%12:12)+(b.getHours()>=12?"PM":"AM"),dd:b.getDate(),MM:b.getMonth()+1,yyyy:b.getFullYear(),yy:String(b.getFullYear()).toString().substr(2,2),ago:this.getTimeAgo(d,e)};
return c.replace(/(SS|ss|mm|HH|hh|DD|dd|MM|yyyy|yy|ago)/g,function(f,g){var h=a[g];
return h<10?"0"+h:h
})
},declineNum:function(e,c,b,a){var d=e%10;
if((d==1)&&((e==1)||(e>20))){return e+" "+c
}else{if((d>1)&&(d<5)&&((e>20)||(e<10))){return e+" "+b
}else{return e+" "+a
}}}};
Cackle.Time.Messages={ru:{second:"только что",minute:"минуту назад",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"минута назад","минуты назад","минут назад")
},hour:"час назад",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"час назад","часа назад","часов назад")
},day:"день назад",days:function(a){return Cackle.Time.declineNum(Math.round(a),"день назад","дня назад","дней назад")
},month:"месяц назад",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"месяц назад","месяца назад","месяцев назад")
},year:"год назад",years:function(a){return Cackle.Time.declineNum(Math.round(a),"год назад","года назад","лет назад")
}},en:{second:"just now",minute:"minute ago",minutes:function(a){return Math.round(a)+" minutes ago"
},hour:"an hour ago",hours:function(a){return"about "+Math.round(a)+" hours ago"
},day:"day ago",days:function(a){return Math.round(a)+" days ago"
},month:"a month ago",months:function(a){return Math.round(a/30)+" months ago"
},year:"a year ago",years:function(a){return Math.round(a)+" years ago"
}},uk:{second:"тільки що",minute:"хвилину тому",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"хвилину тому","хвилини тому","хвилин тому")
},hour:"годину тому",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"годину тому","години тому","годин тому")
},day:"день тому",days:function(a){return Cackle.Time.declineNum(Math.round(a),"день тому","дні тому","днів тому")
},month:"місяць тому",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"місяць тому","місяці тому","місяців тому")
},year:"рік тому",years:function(a){return Cackle.Time.declineNum(Math.round(a),"рік тому","роки тому","років тому")
}},ro:{second:"chiar acum",minute:"în urmă minut",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"o minuta in urma","minute in urma","de minute in urma")
},hour:"acum o ora",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"acum o ora","ore in urma","de ore in urma")
},day:"o zi in urma",days:function(a){return Cackle.Time.declineNum(Math.round(a),"o zi in urma","zile in urma","de zile in urma")
},month:"o luna in urma",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"o luna in urma","luni in urma","de luni in urma")
},year:"un an in urma",years:function(a){return Cackle.Time.declineNum(Math.round(a),"un an in urma","ani in urma","de ani in urma")
}},lv:{second:"Mazāk par minūti",minute:"Pirms minūtes",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms minūtes","pirms minūtēm","pirms minūtēm")
},hour:"pirms stundas",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms stundas","pirms stundām","pirms stundām")
},day:"pirms dienas",days:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms dienas","pirms dienām","pirms dienām")
},month:"pirms mēneša",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"pirms mēneša","pirms mēnešiem","pirms mēnešiem")
},year:"pirms gada",years:function(a){return Cackle.Time.declineNum(Math.round(a),"pirms gada","pirms gadiem","pirms gadiem")
}},kk:{second:"бір минуттан аз уақыт бұрын",minute:"бір минут бұрын",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"минут бұрын","минут бұрын","минут бұрын")
},hour:"бір сағат бұрын",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"сағат бұрын","сағат бұрын","сағат бұрын")
},day:"бір күн бұрын",days:function(a){return Cackle.Time.declineNum(Math.round(a),"күн бұрын","күн бұрын","күн бұрын")
},month:"бір ай бұрын",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"ай бұрын","ай бұрын","ай бұрын")
},year:"бір жыл бұрын",years:function(a){return Cackle.Time.declineNum(Math.round(a),"жыл бұрын","жыл бұрын","жыл бұрын")
}},ka:{second:"წამის წინ",minute:"წუთის წინ",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"წუთის წინ","წუთების წინ","წუთების წინ")
},hour:"час назад",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"საათის წინ","საათის წინ","საათის წინ")
},day:"день назад",days:function(a){return Cackle.Time.declineNum(Math.round(a),"დღის წინ","დღეების წინ","დღის წინ")
},month:"месяц назад",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"თვის წინ","თვეების წინ","თვეების წინ")
},year:"год назад",years:function(a){return Cackle.Time.declineNum(Math.round(a),"წლის წინ","წლების წინ","წლების წინ")
}},hy:{second:"մի քնի վայրկյան առաջ",minute:"մեկ րոպե առաջ",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"րոպե առաջ","րոպե առաջ","րոպե առաջ")
},hour:"մեկ ժամ առաջ",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"ժամ առաջ","ժամ առաջ","ժամ առաջ")
},day:"մեկ օր առաջ",days:function(a){return Cackle.Time.declineNum(Math.round(a),"օր առաջ","օր առաջ","օր առաջ")
},month:"մեկ ամիս առաջ",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"ամիս առաջ","ամիս առաջ","ամիս առաջ")
},year:"մեկ տարի առաջ",years:function(a){return Cackle.Time.declineNum(Math.round(a),"տարի առաջ","տարի առաջ","տարի առաջ")
}},fr:{second:"tout à l'heure",minute:"environ une minute",minutes:function(a){return Math.round(a)+" minutes"
},hour:"environ une heure",hours:function(a){return"environ "+Math.round(a)+" heures"
},day:"un jour",days:function(a){return Math.round(a)+" jours"
},month:"environ un mois",months:function(a){return Math.round(a/30)+" mois"
},year:"environ un an",years:function(a){return Math.round(a)+" ans"
}},es:{second:"en este momento",minute:"hace un minuto",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"hace un minuto","minutos atrás","minutos atrás")
},hour:"una hora atrás",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"una hora atrás","horas atrás","horas atrás")
},day:"hace un día",days:function(a){return Cackle.Time.declineNum(Math.round(a),"un día atrás","días atrás","días atrás")
},month:"Hace un mes",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"un mes atrás","meses atrás","meses atrás")
},year:"Hace un año",years:function(a){return Cackle.Time.declineNum(Math.round(a),"hace un año","años atrás","años atrás")
}},el:{second:"λιγότερο από ένα λεπτό",minute:"γύρω στο ένα λεπτό",minutes:function(a){return Math.round(a)+" minutes"
},hour:"γύρω στην μια ώρα",hours:function(a){return"about "+Math.round(a)+" hours"
},day:"μια μέρα",days:function(a){return Math.round(a)+" days"
},month:"γύρω στον ένα μήνα",months:function(a){return Math.round(a/30)+" months"
},year:"γύρω στον ένα χρόνο",years:function(a){return Math.round(a)+" years"
}},de:{second:"soeben",minute:"vor einer Minute",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einer Minute","vor Minuten","vor Minuten")
},hour:"vor einer Stunde",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einer Stunde","vor Stunden","vor Stunden")
},day:"vor einem Tag",days:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einem Tag","vor Tage","vor Tage")
},month:"vor einem Monat",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"vor einem Monat","vor Monate","vor Monate")
},year:"vor einem Jahr",years:function(a){return Cackle.Time.declineNum(Math.round(a),"vor einem Jahr","vor Jahre","vor Jahre")
}},be:{second:"менш за хвіліну таму",minute:"хвіліну таму",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"хвіліна таму","хвіліны таму","хвілін таму")
},hour:"гадзіну таму",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"гадзіну таму","гадзіны таму","гадзін таму")
},day:"дзень таму",days:function(a){return Cackle.Time.declineNum(Math.round(a),"дзень таму","дні таму","дзён таму")
},month:"месяц таму",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"месяц таму","месяца таму","месяцаў таму")
},year:"год таму",years:function(a){return Cackle.Time.declineNum(Math.round(a),"год таму","гады таму","год таму")
}},it:{second:"proprio ora",minute:"un minuto fa",minutes:function(a){return Cackle.Time.declineNum(Math.round(a),"un minuto fa","minuti fa","minuti fa")
},hour:"un ora fa",hours:function(a){return Cackle.Time.declineNum(Math.round(a),"un ora fa","ore fa","ore fa")
},day:"un giorno fa",days:function(a){return Cackle.Time.declineNum(Math.round(a),"un giorni fa","giorni fa","giorni fa")
},month:"un mese fa",months:function(a){return Cackle.Time.declineNum(Math.round(a/30),"un mese fa","mesi fa","mesi fa")
},year:"un anno fa",years:function(a){return Cackle.Time.declineNum(Math.round(a),"un anno fa","anni fa","anni fa")
}}};var Cackle=Cackle||{};
Cackle.Social=Cackle.Social||{Share:{vkontakte:function(b){var a="http://vk.com/share.php?noparse=true&url="+encodeURIComponent(b.url);
if(b.title){a+="&title="+encodeURIComponent(b.title)
}if(b.text){a+="&description="+encodeURIComponent(this.trim(b.text))
}if(b.img){a+="&image="+encodeURIComponent(b.img)
}this.popup(a)
},odnoklassniki:function(b){var a="http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl="+encodeURIComponent(b.url);
if(b.text){a+="&st.comments="+encodeURIComponent(this.trim(b.text))
}this.popup(a)
},mymailru:function(b){var a="http://connect.mail.ru/share?url="+encodeURIComponent(b.url);
if(b.title){a+="&title="+encodeURIComponent(b.title)
}if(b.text){a+="&description="+encodeURIComponent(this.trim(b.text))
}if(b.img){a+="&imageurl="+encodeURIComponent(b.img)
}this.popup(a)
},googleplus:function(b){var a="https://plus.google.com/share?url="+encodeURIComponent(b.url);
this.popup(a)
},facebook:function(b){var a;
if(!b.title&&!b.text&&b.url){a="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(b.url)
}else{a="https://www.facebook.com/dialog/feed?app_id=230560550330921&display=popup";
a+="&redirect_uri="+encodeURIComponent("http://cackle.me/login/success");
a+="&caption="+encodeURIComponent(b.title);
a+="&description="+encodeURIComponent(b.text);
a+="&link="+encodeURIComponent(b.url);
if(b.img){a+="&picture="+encodeURIComponent(b.img)
}}this.popup(a)
},twitter:function(c){var b="http://twitter.com/share?";
if(c.title){var a=c.title.length+c.url.length+10,d;
if(c.text.length+a>140){d=c.text.substring(0,140-a)+"..."
}else{d=c.text
}b+="text="+encodeURIComponent('"'+d+'" - '+c.title);
b+="&url="+encodeURIComponent(c.url);
b+="&counturl="+encodeURIComponent(c.url)
}else{if(c.text.length>140){d=c.text.substring(0,140)+"..."
}else{d=c.text
}b+="text="+encodeURIComponent(d);
b+="&url="+encodeURIComponent(c.url)
}this.popup(b)
},trim:function(b){var a=300;
if(b&&b.length>a){return b.substring(0,a)+"..."
}return b
},popup:function(a){Cackle.Utils.openPopup(a,626,436)
}}};Cackle.Login=Cackle.Login||{providers:{google:{name:"Google",url:"/signin/proxy?openid_identifier=https://www.google.com/accounts/o8/id"},googleplus:{name:"Google+",url:"/signin/proxy?provider=googleplus&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:"/signin/proxy?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:"/signin/proxy?provider=yandex"},vkontakte:{name:"Вконтакте",url:"/signin/proxy?provider=vkontakte&scope=wall,offline,notify"},facebook:{name:"Facebook",url:"/signin/proxy?provider=facebook&scope=email,status_update,offline_access"},twitter:{name:"Twitter",url:"/signin/proxy?provider=twitter"},linkedin:{name:"Linkedin",url:"/signin/proxy?provider=linkedin&scope=r_basicprofile,r_emailaddress"},mymailru:{name:"Мой Мир",url:"/signin/proxy?provider=mymailru&scope=stream"},odnoklassniki:{name:"Одноклассники",url:"/signin/proxy?provider=odnoklassniki&scope=VALUABLE%20ACCESS"},mailru:{name:"Mail.Ru",label:"Введите ваше имя пользователя на Mail.ru",url:"/signin/proxy?openid_identifier=http://{username}.id.mail.ru/&openid_username={username}"},myopenid:{name:"MyOpenID",label:"Введите ваше имя пользователя на MyOpenID",url:"/signin/proxy?openid_identifier=http://{username}.myopenid.com/&openid_username={username}"},livejournal:{name:"Живой Журнал",label:"Введите ваше имя в Живом Журнале",url:"/signin/proxy?openid_identifier=http://{username}.livejournal.com/&openid_username={username}"},wordpress:{name:"Wordpress",label:"Введите ваше имя на Wordpress.com",url:"/signin/proxy?openid_identifier=http://{username}.wordpress.com/&openid_username={username}"},verisign:{name:"Verisign",label:"Ваше имя пользователя на Verisign",url:"/signin/proxy?openid_identifier=http://{username}.pip.verisignlabs.com/&openid_username={username}"},"500px":{name:"500px",url:"/signin/proxy?provider=500px"},dropbox:{name:"Dropbox",url:"/signin/proxy?provider=dropbox"},flickr:{name:"Flickr",url:"/signin/proxy?provider=flickr"},foursquare:{name:"Foursquare",url:"/signin/proxy?provider=foursquare"},instagram:{name:"Instagram",url:"/signin/proxy?provider=instagram&scope=basic"},live:{name:"Windows Live",url:"/signin/proxy?provider=live&scope=wl.basic,wl.emails"},stackoverflow:{name:"Stackoverflow",url:"/signin/proxy?provider=stackoverflow"},yammer:{name:"Yammer",url:"/signin/proxy?provider=yammer"},tumblr:{name:"Tumblr",url:"/signin/proxy?provider=tumblr"},soundcloud:{name:"Soundcloud",url:"/signin/proxy?provider=soundcloud"},cackle:{name:"Cackle",url:"/account/login?returnUrl=/login/success"},anonym:{name:"Anonymously",url:"/widget/{id}/authenticate?anonym=true"},other:{name:"Other",url:"/widget/{id}/authenticate"}},getBootstrapUrl:function(a){return a.host+"/login/"+a.id+"/bootstrap?callback=?"
},main:function(b){Cackle.Login.auth=b.data.auth;
var a=document.getElementById(b.container||"mc-login");
if(a){if(a.hasChildNodes()){this.customRender(b,a)
}else{a.appendChild(this.defaultRender(b))
}}},defaultRender:function(a){var e=document.createElement("div"),d=a.data.providers.split(";");
e.className="mc-auth-providers";
if(a.ssoProvider){e.appendChild(this.renderSSOProvider(a))
}for(var b=0;
b<d.length;
b++){if(d[b]){e.appendChild(this.renderProvider(a,d[b]));
if(d[b]=="other"){break
}else{if(b==a.data.providersCount){e.appendChild(this.renderProvider(a,"other"));
break
}}}}var c=document.createElement("div");
c.className="mcl-content";
c.appendChild(e);
return c
},renderSSOProvider:function(c){var e=this,d=c.ssoProvider,b=document.createElement("span"),a=document.createElement("img");
a.src=d.logo;
b.appendChild(a);
b.className="mc-sso-provider";
b.title=d.name;
if(d.width){b.style.width=d.width+"px";
a.style.width=d.width+"px"
}if(d.height){b.style.height=d.height+"px";
a.style.height=d.height+"px"
}b.onclick=function(){if(c.ssoPreCallback){c.ssoPreCallback()
}e.loginWindow(c,d.url,c.ssoCallback,true)
};
return b
},renderProvider:function(a,d){var c=this,b=document.createElement("span");
b.className="mc-auth-provider mc-auth-"+d;
if(Cackle.Login.auth&&d==Cackle.Login.auth.provider){b.className+=" mc-logged-provider"
}b.title=d;
b.setAttribute("data-provider",d);
b.onclick=function(){c.login(a,this)
};
return b
},customRender:function(b,a){var d=this,e=a.getElementsByTagName("*");
for(var c=0;
c<e.length;
c++){var f=e[c];
if(f.className.indexOf("mc-auth-")>-1){f.onclick=function(){d.login(b,this)
}
}}},isAuthorized:function(){return Cackle.Login.auth&&Cackle.Login.auth.id
},login:function(c,e){var b=e.getAttribute("data-provider"),f=Cackle.Login.providers[b],d=this.getVerifyUrl(c),a=this.loginUrl(c,f,d);
if(!f||f.label){this.authPopup(c,a)
}else{this.loginWindow(c,a)
}return false
},loginUrl:function(b,d,c){var a=Cackle.origin;
if(!d||d.label){a+="/widget/"+b.id+"/authenticate?provider="+name
}else{a+=d.url.replace("{id}",b.id)
}if(b.lang){a=Cackle.Utils.addParam(a,"locale="+b.lang)
}if(c){a=Cackle.Utils.addParam(a,c)
}if(b.ssoProvider){a=Cackle.Utils.addParam(a,this.getSSOUrl(b.ssoProvider))
}return a
},getSSOUrl:function(b){var a="";
a+="ssoName="+b.name;
a+="&ssoUrl="+encodeURIComponent(b.url);
a+="&ssoLogo="+encodeURIComponent(b.logo);
if(b.width&&b.height){a+="&ssoWidth="+encodeURIComponent(b.width);
a+="&ssoHeight="+encodeURIComponent(b.height)
}return a
},getVerifyUrl:function(a){var b="";
if(a.data.verifyEmail){b="verifyUrl=/widget/"+a.id+"/verify"
}return b
},authPopup:function(b,a,d){var c=window.open(a,"","width="+500+",height="+350+",location=1,menubar=0,scrollbars=0,resizable=1,status=0");
this.checkConnection(b,c,100,d)
},loginWindow:function(b,a,d,c){var e=Cackle.Utils.openPopup(a,850,500);
this.checkConnection(b,e,100,null,d,c)
},checkConnection:function(b,g,f,h,e,d){var c=this;
function a(){if(g&&g.closed){var i=Cackle.Cookie.read("mc-sso-auth");
if(i){Cackle.Cookie.create("mc-sso-auth","");
if("success"==i){Cackle.Storage.set("mc-event",e);
window.location.reload()
}}else{if(d){window.location.reload()
}else{c.authorize(b);
if(h){h()
}}}}else{setTimeout(a,f)
}}setTimeout(a,f)
},authorize:function(b){var a=Cackle.origin+"/login/token?callback=?";
Cackle.Utils.getJSON(a,function(c){var d=c.token;
Cackle.Login.auth=d.auth;
if(b&&b.data){if(b.data.redirectUri){Cackle.Utils.post(b.data.redirectUri,{name:"token",value:d.token})
}if(b.data.callback){Cackle.Utils.execFunction(b.data.callback,[d.token,d.auth])
}}})
},logout:function(a){for(var b=0;
b<Cackle.cluster.length;
b++){Cackle.Utils.getJSON(Cackle.protocol+"//"+Cackle.cluster[b]+"/widget/1/ssoOut?callback=?",function(){Cackle.Login.auth={};
if(a){Cackle.Utils.callbacks(a,"logout")
}})
}}};
Cackle.Utils.bootstrapWidget();Cackle.SSO=Cackle.SSO||{SSO_COOKIE:"mc-sso-user",init:function(a,c){if(a.ssoAuth){var b=a.data.auth;
if(a.ssoAuth.indexOf("e30= ")<0){if(this.isAuthNeed(a)){this.auth(a,c)
}}else{if(a.ssoAuth.indexOf("e30= ")==0&&b.id&&b.provider=="sso"){Cackle.Login.logout();
c({})
}}}},isAuthNeed:function(a){var b=a.data.auth,c=a.ssoAuth.split(" ")[0];
return !b||!b.id||(b.provider!="sso"&&a.ssoPrimary)||(b.provider=="sso"&&c!=Cackle.Cookie.read(this.SSO_COOKIE))
},auth:function(b,d){var c=this,a=b.host+"/widget/"+b.id+"/ssoAuth?callback=?&token="+b.ssoAuth;
Cackle.Utils.getJSON(a,function(f){var e=f.widgetUser;
if(e&&e.id){Cackle.Login.auth=e;
c.setSSOUserCookie(b);
if(d){d(e)
}}})
},setSSOUserCookie:function(a){var b=a.ssoAuth.split(" ")[0];
Cackle.Cookie.create(this.SSO_COOKIE,b,365)
}};/*! jQuery v1.8.3 jquery.com | jquery.org/license */
if (!Cackle.mcJQ) {
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);
Cackle.mcJQ = window.jQuery.noConflict(true);
}(function(N,d,p,K,k,H){var b=this;var n=Math.floor(Math.random()*10000);var q=Function.prototype;var Q=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/;var R=/[\-\w]+\/\.\.\//;var F=/([^:])\/\//g;var I="";var o={};var M=N.easyXDM;var U="easyXDM_";var E;var y=false;var i;var h;function C(X,Z){var Y=typeof X[Z];return Y=="function"||(!!(Y=="object"&&X[Z]))||Y=="unknown"}function u(X,Y){return !!(typeof(X[Y])=="object"&&X[Y])}function r(X){return Object.prototype.toString.call(X)==="[object Array]"}function c(){var Z="Shockwave Flash",ad="application/x-shockwave-flash";if(!t(navigator.plugins)&&typeof navigator.plugins[Z]=="object"){var ab=navigator.plugins[Z].description;if(ab&&!t(navigator.mimeTypes)&&navigator.mimeTypes[ad]&&navigator.mimeTypes[ad].enabledPlugin){i=ab.match(/\d+/g)}}if(!i){var Y;try{Y=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");i=Array.prototype.slice.call(Y.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1);Y=null}catch(ac){}}if(!i){return false}var X=parseInt(i[0],10),aa=parseInt(i[1],10);h=X>9&&aa>0;return true}var v,x;if(C(N,"addEventListener")){v=function(Z,X,Y){Z.addEventListener(X,Y,false)};x=function(Z,X,Y){Z.removeEventListener(X,Y,false)}}else{if(C(N,"attachEvent")){v=function(X,Z,Y){X.attachEvent("on"+Z,Y)};x=function(X,Z,Y){X.detachEvent("on"+Z,Y)}}else{throw new Error("Browser not supported")}}var W=false,J=[],L;if("readyState" in d){L=d.readyState;W=L=="complete"||(~navigator.userAgent.indexOf("AppleWebKit/")&&(L=="loaded"||L=="interactive"))}else{W=!!d.body}function s(){if(W){return}W=true;for(var X=0;X<J.length;X++){J[X]()}J.length=0}if(!W){if(C(N,"addEventListener")){v(d,"DOMContentLoaded",s)}else{v(d,"readystatechange",function(){if(d.readyState=="complete"){s()}});if(d.documentElement.doScroll&&N===top){var g=function(){if(W){return}try{d.documentElement.doScroll("left")}catch(X){K(g,1);return}s()};g()}}v(N,"load",s)}function G(Y,X){if(W){Y.call(X);return}J.push(function(){Y.call(X)})}function m(){var Z=parent;if(I!==""){for(var X=0,Y=I.split(".");X<Y.length;X++){Z=Z[Y[X]]}}return Z.easyXDM}function e(X){N.easyXDM=M;I=X;if(I){U="easyXDM_"+I.replace(".","_")+"_"}return o}function z(X){return X.match(Q)[3]}function f(X){return X.match(Q)[4]||""}function j(Z){var X=Z.toLowerCase().match(Q);var aa=X[2],ab=X[3],Y=X[4]||"";if((aa=="http:"&&Y==":80")||(aa=="https:"&&Y==":443")){Y=""}return aa+"//"+ab+Y}function B(X){X=X.replace(F,"$1/");if(!X.match(/^(http||https):\/\//)){var Y=(X.substring(0,1)==="/")?"":p.pathname;if(Y.substring(Y.length-1)!=="/"){Y=Y.substring(0,Y.lastIndexOf("/")+1)}X=p.protocol+"//"+p.host+Y+X}while(R.test(X)){X=X.replace(R,"")}return X}function P(X,aa){var ac="",Z=X.indexOf("#");if(Z!==-1){ac=X.substring(Z);X=X.substring(0,Z)}var ab=[];for(var Y in aa){if(aa.hasOwnProperty(Y)){ab.push(Y+"="+H(aa[Y]))}}return X+(y?"#":(X.indexOf("?")==-1?"?":"&"))+ab.join("&")+ac}var S=(function(X){X=X.substring(1).split("&");var Z={},aa,Y=X.length;while(Y--){aa=X[Y].split("=");Z[aa[0]]=k(aa[1])}return Z}(/xdm_e=/.test(p.search)?p.search:p.hash));function t(X){return typeof X==="undefined"}var O=function(){var Y={};var Z={a:[1,2,3]},X='{"a":[1,2,3]}';if(typeof JSON!="undefined"&&typeof JSON.stringify==="function"&&JSON.stringify(Z).replace((/\s/g),"")===X){return JSON}if(Object.toJSON){if(Object.toJSON(Z).replace((/\s/g),"")===X){Y.stringify=Object.toJSON}}if(typeof String.prototype.evalJSON==="function"){Z=X.evalJSON();if(Z.a&&Z.a.length===3&&Z.a[2]===3){Y.parse=function(aa){return aa.evalJSON()}}}if(Y.stringify&&Y.parse){O=function(){return Y};return Y}return null};function T(X,Y,Z){var ab;for(var aa in Y){if(Y.hasOwnProperty(aa)){if(aa in X){ab=Y[aa];if(typeof ab==="object"){T(X[aa],ab,Z)}else{if(!Z){X[aa]=Y[aa]}}}else{X[aa]=Y[aa]}}}return X}function a(){var Y=d.body.appendChild(d.createElement("form")),X=Y.appendChild(d.createElement("input"));X.name=U+"TEST"+n;E=X!==Y.elements[X.name];d.body.removeChild(Y)}function A(Y){if(t(E)){a()}var ac;if(E){ac=d.createElement('<iframe name="'+Y.props.name+'"/>')}else{ac=d.createElement("IFRAME");ac.name=Y.props.name}ac.id=ac.name=Y.props.name;delete Y.props.name;if(typeof Y.container=="string"){Y.container=d.getElementById(Y.container)}if(!Y.container){T(ac.style,{position:"absolute",top:"-2000px",left:"0px"});Y.container=d.body}var ab=Y.props.src;Y.props.src="javascript:false";T(ac,Y.props);ac.border=ac.frameBorder=0;ac.allowTransparency=true;Y.container.appendChild(ac);if(Y.onLoad){v(ac,"load",Y.onLoad)}if(Y.usePost){var aa=Y.container.appendChild(d.createElement("form")),X;aa.target=ac.name;aa.action=ab;aa.method="POST";if(typeof(Y.usePost)==="object"){for(var Z in Y.usePost){if(Y.usePost.hasOwnProperty(Z)){if(E){X=d.createElement('<input name="'+Z+'"/>')}else{X=d.createElement("INPUT");X.name=Z}X.value=Y.usePost[Z];aa.appendChild(X)}}}aa.submit();aa.parentNode.removeChild(aa)}else{ac.src=ab}Y.props.src=ab;return ac}function V(aa,Z){if(typeof aa=="string"){aa=[aa]}var Y,X=aa.length;while(X--){Y=aa[X];Y=new RegExp(Y.substr(0,1)=="^"?Y:("^"+Y.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"));if(Y.test(Z)){return true}}return false}function l(Z){var ae=Z.protocol,Y;Z.isHost=Z.isHost||t(S.xdm_p);y=Z.hash||false;if(!Z.props){Z.props={}}if(!Z.isHost){Z.channel=S.xdm_c.replace(/["'<>\\]/g,"");Z.secret=S.xdm_s;Z.remote=S.xdm_e.replace(/["'<>\\]/g,"");ae=S.xdm_p;if(Z.acl&&!V(Z.acl,Z.remote)){throw new Error("Access denied for "+Z.remote)}}else{Z.remote=B(Z.remote);Z.channel=Z.channel||"default"+n++;Z.secret=Math.random().toString(16).substring(2);if(t(ae)){if(j(p.href)==j(Z.remote)){ae="4"}else{if(C(N,"postMessage")||C(d,"postMessage")){ae="1"}else{if(Z.swf&&C(N,"ActiveXObject")&&c()){ae="6"}else{if(navigator.product==="Gecko"&&"frameElement" in N&&navigator.userAgent.indexOf("WebKit")==-1){ae="5"}else{if(Z.remoteHelper){ae="2"}else{ae="0"}}}}}}}Z.protocol=ae;switch(ae){case"0":T(Z,{interval:100,delay:2000,useResize:true,useParent:false,usePolling:false},true);if(Z.isHost){if(!Z.local){var ac=p.protocol+"//"+p.host,X=d.body.getElementsByTagName("img"),ad;var aa=X.length;while(aa--){ad=X[aa];if(ad.src.substring(0,ac.length)===ac){Z.local=ad.src;break}}if(!Z.local){Z.local=N}}var ab={xdm_c:Z.channel,xdm_p:0};if(Z.local===N){Z.usePolling=true;Z.useParent=true;Z.local=p.protocol+"//"+p.host+p.pathname+p.search;ab.xdm_e=Z.local;ab.xdm_pa=1}else{ab.xdm_e=B(Z.local)}if(Z.container){Z.useResize=false;ab.xdm_po=1}Z.remote=P(Z.remote,ab)}else{T(Z,{channel:S.xdm_c,remote:S.xdm_e,useParent:!t(S.xdm_pa),usePolling:!t(S.xdm_po),useResize:Z.useParent?false:Z.useResize})}Y=[new o.stack.HashTransport(Z),new o.stack.ReliableBehavior({}),new o.stack.QueueBehavior({encode:true,maxLength:4000-Z.remote.length}),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"1":Y=[new o.stack.PostMessageTransport(Z)];break;case"2":if(Z.isHost){Z.remoteHelper=B(Z.remoteHelper)}Y=[new o.stack.NameTransport(Z),new o.stack.QueueBehavior(),new o.stack.VerifyBehavior({initiate:Z.isHost})];break;case"3":Y=[new o.stack.NixTransport(Z)];break;case"4":Y=[new o.stack.SameOriginTransport(Z)];break;case"5":Y=[new o.stack.FrameElementTransport(Z)];break;case"6":if(!i){c()}Y=[new o.stack.FlashTransport(Z)];break}Y.push(new o.stack.QueueBehavior({lazy:Z.lazy,remove:true}));return Y}function D(aa){var ab,Z={incoming:function(ad,ac){this.up.incoming(ad,ac)},outgoing:function(ac,ad){this.down.outgoing(ac,ad)},callback:function(ac){this.up.callback(ac)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(var Y=0,X=aa.length;Y<X;Y++){ab=aa[Y];T(ab,Z,true);if(Y!==0){ab.down=aa[Y-1]}if(Y!==X-1){ab.up=aa[Y+1]}}return ab}function w(X){X.up.down=X.down;X.down.up=X.up;X.up=X.down=null}T(o,{version:"2.4.19.3",query:S,stack:{},apply:T,getJSONObject:O,whenReady:G,noConflict:e});o.DomHelper={on:v,un:x,requiresJSON:function(X){if(!u(N,"JSON")){d.write('<script type="text/javascript" src="'+X+'"><\/script>')}}};(function(){var X={};o.Fn={set:function(Y,Z){X[Y]=Z},get:function(Z,Y){if(!X.hasOwnProperty(Z)){return}var aa=X[Z];if(Y){delete X[Z]}return aa}}}());o.Socket=function(Y){var X=D(l(Y).concat([{incoming:function(ab,aa){Y.onMessage(ab,aa)},callback:function(aa){if(Y.onReady){Y.onReady(aa)}}}])),Z=j(Y.remote);this.origin=j(Y.remote);this.destroy=function(){X.destroy()};this.postMessage=function(aa){X.outgoing(aa,Z)};X.init()};o.Rpc=function(Z,Y){if(Y.local){for(var ab in Y.local){if(Y.local.hasOwnProperty(ab)){var aa=Y.local[ab];if(typeof aa==="function"){Y.local[ab]={method:aa}}}}}var X=D(l(Z).concat([new o.stack.RpcBehavior(this,Y),{callback:function(ac){if(Z.onReady){Z.onReady(ac)}}}]));this.origin=j(Z.remote);this.destroy=function(){X.destroy()};X.init()};o.stack.SameOriginTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa(ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:p.protocol+"//"+p.host+p.pathname,xdm_c:Y.channel,xdm_p:4}),name:U+Y.channel+"_provider"});ab=A(Y);o.Fn.set(Y.channel,function(ac){aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}})}else{aa=m().Fn.get(Y.channel,true)(function(ac){Z.up.incoming(ac,X)});K(function(){Z.up.callback(true)},0)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.FlashTransport=function(aa){var ac,X,ab,ad,Y,ae;function af(ah,ag){K(function(){ac.up.incoming(ah,ad)},0)}function Z(ah){var ag=aa.swf+"?host="+aa.isHost;var aj="easyXDM_swf_"+Math.floor(Math.random()*10000);o.Fn.set("flash_loaded"+ah.replace(/[\-.]/g,"_"),function(){o.stack.FlashTransport[ah].swf=Y=ae.firstChild;var ak=o.stack.FlashTransport[ah].queue;for(var al=0;al<ak.length;al++){ak[al]()}ak.length=0});if(aa.swfContainer){ae=(typeof aa.swfContainer=="string")?d.getElementById(aa.swfContainer):aa.swfContainer}else{ae=d.createElement("div");T(ae.style,h&&aa.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0});d.body.appendChild(ae)}var ai="callback=flash_loaded"+H(ah.replace(/[\-.]/g,"_"))+"&proto="+b.location.protocol+"&domain="+H(z(b.location.href))+"&port="+H(f(b.location.href))+"&ns="+H(I);ae.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+aj+"' data='"+ag+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+ag+"'></param><param name='flashvars' value='"+ai+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+ai+"' allowScriptAccess='always' wmode='transparent' src='"+ag+"' height='1' width='1'></embed></object>"}return(ac={outgoing:function(ah,ai,ag){Y.postMessage(aa.channel,ah.toString());if(ag){ag()}},destroy:function(){try{Y.destroyChannel(aa.channel)}catch(ag){}Y=null;if(X){X.parentNode.removeChild(X);X=null}},onDOMReady:function(){ad=aa.remote;o.Fn.set("flash_"+aa.channel+"_init",function(){K(function(){ac.up.callback(true)})});o.Fn.set("flash_"+aa.channel+"_onMessage",af);aa.swf=B(aa.swf);var ah=z(aa.swf);var ag=function(){o.stack.FlashTransport[ah].init=true;Y=o.stack.FlashTransport[ah].swf;Y.createChannel(aa.channel,aa.secret,j(aa.remote),aa.isHost);if(aa.isHost){if(h&&aa.swfNoThrottle){T(aa.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"})}T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:6,xdm_s:aa.secret}),name:U+aa.channel+"_provider"});X=A(aa)}};if(o.stack.FlashTransport[ah]&&o.stack.FlashTransport[ah].init){ag()}else{if(!o.stack.FlashTransport[ah]){o.stack.FlashTransport[ah]={queue:[ag]};Z(ah)}else{o.stack.FlashTransport[ah].queue.push(ag)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.PostMessageTransport=function(aa){var ac,ad,Y,Z;function X(ae){if(ae.origin){return j(ae.origin)}if(ae.uri){return j(ae.uri)}if(ae.domain){return p.protocol+"//"+ae.domain}throw"Unable to retrieve the origin of the event"}function ab(af){var ae=X(af);if(ae==Z&&af.data.substring(0,aa.channel.length+1)==aa.channel+" "){ac.up.incoming(af.data.substring(aa.channel.length+1),ae)}}return(ac={outgoing:function(af,ag,ae){Y.postMessage(aa.channel+" "+af,ag||Z);if(ae){ae()}},destroy:function(){x(N,"message",ab);if(ad){Y=null;ad.parentNode.removeChild(ad);ad=null}},onDOMReady:function(){Z=j(aa.remote);if(aa.isHost){var ae=function(af){if(af.data==aa.channel+"-ready"){Y=("postMessage" in ad.contentWindow)?ad.contentWindow:ad.contentWindow.document;x(N,"message",ae);v(N,"message",ab);K(function(){ac.up.callback(true)},0)}};v(N,"message",ae);T(aa.props,{src:P(aa.remote,{xdm_e:j(p.href),xdm_c:aa.channel,xdm_p:1}),name:U+aa.channel+"_provider"});ad=A(aa)}else{v(N,"message",ab);Y=("postMessage" in N.parent)?N.parent:N.parent.document;Y.postMessage(aa.channel+"-ready",Z);K(function(){ac.up.callback(true)},0)}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.FrameElementTransport=function(Y){var Z,ab,aa,X;return(Z={outgoing:function(ad,ae,ac){aa.call(this,ad);if(ac){ac()}},destroy:function(){if(ab){ab.parentNode.removeChild(ab);ab=null}},onDOMReady:function(){X=j(Y.remote);if(Y.isHost){T(Y.props,{src:P(Y.remote,{xdm_e:j(p.href),xdm_c:Y.channel,xdm_p:5}),name:U+Y.channel+"_provider"});ab=A(Y);ab.fn=function(ac){delete ab.fn;aa=ac;K(function(){Z.up.callback(true)},0);return function(ad){Z.up.incoming(ad,X)}}}else{if(d.referrer&&j(d.referrer)!=S.xdm_e){N.top.location=S.xdm_e}aa=N.frameElement.fn(function(ac){Z.up.incoming(ac,X)});Z.up.callback(true)}},init:function(){G(Z.onDOMReady,Z)}})};o.stack.NameTransport=function(ab){var ac;var ae,ai,aa,ag,ah,Y,X;function af(al){var ak=ab.remoteHelper+(ae?"#_3":"#_2")+ab.channel;ai.contentWindow.sendMessage(al,ak)}function ad(){if(ae){if(++ag===2||!ae){ac.up.callback(true)}}else{af("ready");ac.up.callback(true)}}function aj(ak){ac.up.incoming(ak,Y)}function Z(){if(ah){K(function(){ah(true)},0)}}return(ac={outgoing:function(al,am,ak){ah=ak;af(al)},destroy:function(){ai.parentNode.removeChild(ai);ai=null;if(ae){aa.parentNode.removeChild(aa);aa=null}},onDOMReady:function(){ae=ab.isHost;ag=0;Y=j(ab.remote);ab.local=B(ab.local);if(ae){o.Fn.set(ab.channel,function(al){if(ae&&al==="ready"){o.Fn.set(ab.channel,aj);ad()}});X=P(ab.remote,{xdm_e:ab.local,xdm_c:ab.channel,xdm_p:2});T(ab.props,{src:X+"#"+ab.channel,name:U+ab.channel+"_provider"});aa=A(ab)}else{ab.remoteHelper=ab.remote;o.Fn.set(ab.channel,aj)}var ak=function(){var al=ai||this;x(al,"load",ak);o.Fn.set(ab.channel+"_load",Z);(function am(){if(typeof al.contentWindow.sendMessage=="function"){ad()}else{K(am,50)}}())};ai=A({props:{src:ab.local+"#_4"+ab.channel},onLoad:ak})},init:function(){G(ac.onDOMReady,ac)}})};o.stack.HashTransport=function(Z){var ac;var ah=this,af,aa,X,ad,am,ab,al;var ag,Y;function ak(ao){if(!al){return}var an=Z.remote+"#"+(am++)+"_"+ao;((af||!ag)?al.contentWindow:al).location=an}function ae(an){ad=an;ac.up.incoming(ad.substring(ad.indexOf("_")+1),Y)}function aj(){if(!ab){return}var an=ab.location.href,ap="",ao=an.indexOf("#");if(ao!=-1){ap=an.substring(ao)}if(ap&&ap!=ad){ae(ap)}}function ai(){aa=setInterval(aj,X)}return(ac={outgoing:function(an,ao){ak(an)},destroy:function(){N.clearInterval(aa);if(af||!ag){al.parentNode.removeChild(al)}al=null},onDOMReady:function(){af=Z.isHost;X=Z.interval;ad="#"+Z.channel;am=0;ag=Z.useParent;Y=j(Z.remote);if(af){T(Z.props,{src:Z.remote,name:U+Z.channel+"_provider"});if(ag){Z.onLoad=function(){ab=N;ai();ac.up.callback(true)}}else{var ap=0,an=Z.delay/50;(function ao(){if(++ap>an){throw new Error("Unable to reference listenerwindow")}try{ab=al.contentWindow.frames[U+Z.channel+"_consumer"]}catch(aq){}if(ab){ai();ac.up.callback(true)}else{K(ao,50)}}())}al=A(Z)}else{ab=N;ai();if(ag){al=parent;ac.up.callback(true)}else{T(Z,{props:{src:Z.remote+"#"+Z.channel+new Date(),name:U+Z.channel+"_consumer"},onLoad:function(){ac.up.callback(true)}});al=A(Z)}}},init:function(){G(ac.onDOMReady,ac)}})};o.stack.ReliableBehavior=function(Y){var aa,ac;var ab=0,X=0,Z="";return(aa={incoming:function(af,ad){var ae=af.indexOf("_"),ag=af.substring(0,ae).split(",");af=af.substring(ae+1);if(ag[0]==ab){Z="";if(ac){ac(true)}}if(af.length>0){aa.down.outgoing(ag[1]+","+ab+"_"+Z,ad);if(X!=ag[1]){X=ag[1];aa.up.incoming(af,ad)}}},outgoing:function(af,ad,ae){Z=af;ac=ae;aa.down.outgoing(X+","+(++ab)+"_"+af,ad)}})};o.stack.QueueBehavior=function(Z){var ac,ad=[],ag=true,aa="",af,X=0,Y=false,ab=false;function ae(){if(Z.remove&&ad.length===0){w(ac);return}if(ag||ad.length===0||af){return}ag=true;var ah=ad.shift();ac.down.outgoing(ah.data,ah.origin,function(ai){ag=false;if(ah.callback){K(function(){ah.callback(ai)},0)}ae()})}return(ac={init:function(){if(t(Z)){Z={}}if(Z.maxLength){X=Z.maxLength;ab=true}if(Z.lazy){Y=true}else{ac.down.init()}},callback:function(ai){ag=false;var ah=ac.up;ae();ah.callback(ai)},incoming:function(ak,ai){if(ab){var aj=ak.indexOf("_"),ah=parseInt(ak.substring(0,aj),10);aa+=ak.substring(aj+1);if(ah===0){if(Z.encode){aa=k(aa)}ac.up.incoming(aa,ai);aa=""}}else{ac.up.incoming(ak,ai)}},outgoing:function(al,ai,ak){if(Z.encode){al=H(al)}var ah=[],aj;if(ab){while(al.length!==0){aj=al.substring(0,X);al=al.substring(aj.length);ah.push(aj)}while((aj=ah.shift())){ad.push({data:ah.length+"_"+aj,origin:ai,callback:ah.length===0?ak:null})}}else{ad.push({data:al,origin:ai,callback:ak})}if(Y){ac.down.init()}else{ae()}},destroy:function(){af=true;ac.down.destroy()}})};o.stack.VerifyBehavior=function(ab){var ac,aa,Y,Z=false;function X(){aa=Math.random().toString(16).substring(2);ac.down.outgoing(aa)}return(ac={incoming:function(af,ad){var ae=af.indexOf("_");if(ae===-1){if(af===aa){ac.up.callback(true)}else{if(!Y){Y=af;if(!ab.initiate){X()}ac.down.outgoing(af)}}}else{if(af.substring(0,ae)===Y){ac.up.incoming(af.substring(ae+1),ad)}}},outgoing:function(af,ad,ae){ac.down.outgoing(aa+"_"+af,ad,ae)},callback:function(ad){if(ab.initiate){X()}}})};o.stack.RpcBehavior=function(ad,Y){var aa,af=Y.serializer||O();var ae=0,ac={};function X(ag){ag.jsonrpc="2.0";aa.down.outgoing(af.stringify(ag))}function ab(ag,ai){var ah=Array.prototype.slice;return function(){var aj=arguments.length,al,ak={method:ai};if(aj>0&&typeof arguments[aj-1]==="function"){if(aj>1&&typeof arguments[aj-2]==="function"){al={success:arguments[aj-2],error:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-2)}else{al={success:arguments[aj-1]};ak.params=ah.call(arguments,0,aj-1)}ac[""+(++ae)]=al;ak.id=ae}else{ak.params=ah.call(arguments,0)}if(ag.namedParams&&ak.params.length===1){ak.params=ak.params[0]}X(ak)}}function Z(an,am,ai,al){if(!ai){if(am){X({id:am,error:{code:-32601,message:"Procedure not found."}})}return}var ak,ah;if(am){ak=function(ao){ak=q;X({id:am,result:ao})};ah=function(ao,ap){ah=q;var aq={id:am,error:{code:-32099,message:ao}};if(ap){aq.error.data=ap}X(aq)}}else{ak=ah=q}if(!r(al)){al=[al]}try{var ag=ai.method.apply(ai.scope,al.concat([ak,ah]));if(!t(ag)){ak(ag)}}catch(aj){ah(aj.message)}}return(aa={incoming:function(ah,ag){var ai=af.parse(ah);if(ai.method){if(Y.handle){Y.handle(ai,X)}else{Z(ai.method,ai.id,Y.local[ai.method],ai.params)}}else{var aj=ac[ai.id];if(ai.error){if(aj.error){aj.error(ai.error)}}else{if(aj.success){aj.success(ai.result)}}delete ac[ai.id]}},init:function(){if(Y.remote){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)){ad[ag]=ab(Y.remote[ag],ag)}}}aa.down.init()},destroy:function(){for(var ag in Y.remote){if(Y.remote.hasOwnProperty(ag)&&ad.hasOwnProperty(ag)){delete ad[ag]}}aa.down.destroy()}})};b.easyXDM=o})(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent);

var Cackle = Cackle || {};

Cackle.PostMessage = Cackle.PostMessage || {

    xhr: null,

    init: function(host) {
        var $this = this;
        $this.xhr = new easyXDM.Rpc({
            remote: host + '/xdm/index.html',
            onReady: function() {
                var iframe = document.getElementById('easyXDM_' + this.channel + '_provider');
                iframe.setAttribute('style', 'position:absolute!important;top:-2000px!important;left:0!important;');
            }
        },{
            remote: {
                request: {}
            },
            serializer: {
                stringify: function(obj) {
                    var clone = {
                        id: obj.id,
                        jsonrpc: obj.jsonrpc,
                        method: obj.method,
                        params: obj.params[0]
                    };
                    return $this.stringify(clone);
                },
                parse: function(string){
                    return Cackle.mcJQ ? Cackle.mcJQ.parseJSON(string) : JSON.parse(string);
                }
            }
        });
    },

    send: function(url, data, success, failed, complete) {
        this.xhr.request({url: url, method: "POST", headers: {"Accept": "application/json;"}, data: data},
            function(response) {
                success(response);
                complete();
            }, function(response) {
                failed(response);
                complete();
            }
        );
    },

    stringify: function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            if (t == "string"){obj = '"'+obj+'"';}
            return String(obj);
        }
        else {
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string"){v = '"'+v+'"';}else if (t == "object" && v !== null){v = this.stringify(v);}
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
};var Cackle=Cackle||{};
Cackle.Stream=Cackle.Stream||{etag:0,time:null,timeout:2000,start:function(b,c){var a=this;
if(!a[b]){a[b]={}
}a.etag=0;
a.time=null;
a[b].abort=false;
if(a.time===null){a.time=Cackle.Stream.Utils.dateToUTCString(new Date())
}if(this.isWebSocket()){a.wspoll(b,c)
}else{if(window.XDomainRequest){setTimeout(function(){a.poll_IE(a,b,c)
},a.timeout)
}else{this.longpoll(b,c)
}}},longpoll:function(b,d){var a=this;
a[b].xhr=a[b].xhr||new XMLHttpRequest();
var c=a[b].xhr;
if(typeof c.onreadystatechange!="undefined"){c.onreadystatechange=function(){a.onready(a,b,d)
}
}else{c.onload=function(){a.onready(a,b,d)
}
}c.onerror=function(){setTimeout(function(){a.poll(a,b)
},a.timeout)
};
a.poll(a,b)
},onready:function(a,b,d){if(a[b].abort){return
}var c=a[b].xhr;
if(4===c.readyState){if(c.responseText.length>0){a.action(c.responseText,d)
}a.poll(a,b)
}},wspoll:function(d,e){var c=this,b=this.wsurl(d);
this[d].xhr=window.WebSocket?new WebSocket(b):new MozWebSocket(b);
var a=this[d].xhr;
a.onmessage=function(f){if(e){e(JSON.parse(f.data))
}};
a.onclose=function(){c[d].xhr=null;
c.longpoll(d,e)
}
},poll:function(a,b){var c=a[b].xhr;
c.open("GET",a.url(b),true);
c.send()
},poll_IE:function(a,b,d){a[b].xhr=a[b].xhr||new window.XDomainRequest();
var c=a[b].xhr;
c.onprogress=function(){};
c.onload=function(){a.action(c.responseText,d);
a.poll_IE(a,b,d)
};
c.onerror=function(){a.poll_IE(a,b,d)
};
c.open("GET",a.url(b),true);
c.send()
},wsurl:function(a){return this.wsprotocol()+this.host()+"/ws/"+a
},url:function(a){return this.protocol()+this.host()+"/lp/"+a+"?callback=?&tag="+this.etag+"&time="+this.time+"&v="+(new Date()).getTime()
},host:function(){return"://realtime.cackle.me"
},wsprotocol:function(){return this.isSSL()?"wss":"ws"
},protocol:function(){return this.isSSL()?"https":"http"
},isSSL:function(){return Cackle.protocol=="https:"
},isWebSocket:function(){return !Cackle.Utils.isSafari()&&(window.WebSocket||window.MozWebSocket)
},action:function(h,j){var c=h.indexOf("{"),g=h.lastIndexOf("}"),f=JSON.parse("["+h.substring(c,g+1)+"]");
for(var b=0;
b<f.length;
b++){var a=f[b],d=a.msg;
this.etag=a.tag;
this.time=a.time;
if(j){j(d)
}}},stop:function(b,a){if(this[b]&&this[b].xhr){this[b].abort=true;
if(this[b].xhr.close){this[b].xhr.close();
this[b].xhr=null
}else{this[b].xhr.abort()
}if(a){this[b].xhr=null
}}},Utils:{days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],valueToTwoDigits:function(a){return((a<10)?"0":"")+a
},dateToUTCString:function(a){var b=this.valueToTwoDigits(a.getUTCHours())+":"+this.valueToTwoDigits(a.getUTCMinutes())+":"+this.valueToTwoDigits(a.getUTCSeconds());
return this.days[a.getUTCDay()]+", "+this.valueToTwoDigits(a.getUTCDate())+" "+this.months[a.getUTCMonth()]+" "+a.getUTCFullYear()+" "+b+" GMT"
}}};Cackle.Comment=Cackle.Comment||{};
Cackle.Comment.widgetPreLoader=function(a){var b=document.createElement("img");
b.setAttribute("src",Cackle.origin+"/static/img/comment-wait.gif");
document.getElementById(a).appendChild(b)
};
Cackle.Comment.getBootstrapUrl=function(c){var a=function(e){var d=Cackle.Cookie.read("mc-comment-order");
if(d){return d
}else{if(e.sort){return e.sort
}}return"desc"
};
var b=c.host+"/widget/"+c.id+"/bootstrap?callback=?&chan="+encodeURIComponent(Cackle.Utils.getChannel(c))+"&url="+encodeURIComponent(Cackle.Utils.getUrl(c))+"&order="+a(c);
if(c.lang){b+="&locale="+c.lang
}return b
};
Cackle.Comment.main=function(C,y){Cackle.Comment.widgetPreLoader(C.container||"mc-container");
y(document).unbind(".cackle");
var t={google:{name:"Google",url:Cackle.origin+"/signin/proxy?openid_identifier=https://www.google.com/accounts/o8/id"},googleplus:{name:"Google+",url:Cackle.origin+"/signin/proxy?provider=googleplus&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:Cackle.origin+"/signin/proxy?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:Cackle.origin+"/signin/proxy?provider=yandex"},vkontakte:{name:"Вконтакте",url:Cackle.origin+"/signin/proxy?provider=vkontakte&scope=wall,offline,notify"},facebook:{name:"Facebook",url:Cackle.origin+"/signin/proxy?provider=facebook&scope=email,status_update,offline_access"},twitter:{name:"Twitter",url:Cackle.origin+"/signin/proxy?provider=twitter"},linkedin:{name:"Linkedin",url:Cackle.origin+"/signin/proxy?provider=linkedin&scope=r_basicprofile,r_emailaddress"},mymailru:{name:"Мой Мир@Mail.Ru",url:Cackle.origin+"/signin/proxy?provider=mymailru&scope=stream"},odnoklassniki:{name:"Одноклассники",url:Cackle.origin+"/signin/proxy?provider=odnoklassniki&scope=VALUABLE%20ACCESS"},mailru:{name:"Mail.Ru",label:"Введите ваше имя пользователя на Mail.ru",url:Cackle.origin+"/signin/proxy?openid_identifier=http://{username}.id.mail.ru/&openid_username={username}"},myopenid:{name:"MyOpenID",label:"Введите ваше имя пользователя на MyOpenID",url:Cackle.origin+"/signin/proxy?openid_identifier=http://{username}.myopenid.com/&openid_username={username}"},livejournal:{name:"Живой Журнал",label:"Введите ваше имя в Живом Журнале",url:Cackle.origin+"/signin/proxy?openid_identifier=http://{username}.livejournal.com/&openid_username={username}"},wordpress:{name:"Wordpress",label:"Введите ваше имя на Wordpress.com",url:Cackle.origin+"/signin/proxy?openid_identifier=http://{username}.wordpress.com/&openid_username={username}"},verisign:{name:"Verisign",label:"Ваше имя пользователя на Verisign",url:Cackle.origin+"/signin/proxy?openid_identifier=http://{username}.pip.verisignlabs.com/&openid_username={username}"},"500px":{name:"500px",url:Cackle.origin+"/signin/proxy?provider=500px"},dropbox:{name:"dropbox",url:Cackle.origin+"/signin/proxy?provider=dropbox"},flickr:{name:"Flickr",url:Cackle.origin+"/signin/proxy?provider=flickr"},foursquare:{name:"Foursquare",url:Cackle.origin+"/signin/proxy?provider=foursquare"},instagram:{name:"Instagram",url:Cackle.origin+"/signin/proxy?provider=instagram&scope=basic"},live:{name:"Windows Live",url:Cackle.origin+"/signin/proxy?provider=live&scope=wl.basic,wl.emails"},stackoverflow:{name:"Stackoverflow",url:Cackle.origin+"/signin/proxy?provider=stackoverflow"},yammer:{name:"Yammer",url:Cackle.origin+"/signin/proxy?provider=yammer"},tumblr:{name:"Tumblr",url:Cackle.origin+"/signin/proxy?provider=tumblr"},soundcloud:{name:"Soundcloud",url:Cackle.origin+"/signin/proxy?provider=soundcloud"},cackle:{name:"Cackle",url:Cackle.origin+"/account/login?returnUrl=/login/success"},anonym:{name:"Anonymously",url:Cackle.origin+"/widget/"+C.id+"/authenticate?anonym=true"},other:{name:"Other",url:Cackle.origin+"/widget/"+C.id+"/authenticate"}};
var B=null;
var f="";
var v="32";
var l=true;
var L=true;
var o=false;
var p=true;
var u={};
var q="";
var M="";
var r="";
var d="";
var N="";
var x=false;
var D="standard";
var a=null;
var g=null;
var E="";
var w;
var k;
var J=false;
var j=false;
var I=true;
var A=0;
var b=t;
var H={xPostProviders:{vkontakte:true,mymailru:true,facebook:true,twitter:true},content:"",init:function(){this.content=y("<div/>").addClass("mc-content").addClass("mc-cleanslate");
if(mcColor){this.content.addClass("mc-"+mcColor)
}this.loadHtml();
this.$textarea=y(".mc-postbox-container textarea",this.content);
this.$textarea.bind("keyup",Cackle.Utils.textareaAutoResize);
this.$textarea.click(function(){y(this).parents(".mc-widget-container:first").addClass("mc-expanded")
});
y("span.mc-user-logout",this.content).click(function(){Cackle.Login.logout(C);
z.afterLogin({})
})
},loadHtml:function(){var O;
if(C.html&&C.html.widget){O=C.html.widget
}else{O='<style></style><div class="mc-head-container"><ul><li class="active"><a href="#" class="mc-comment-count" data-count="0">${msg.header}</a></li><li class="mc-logo" style="display:inline-block!important"><a href="${host}" title="powered by CACKLE" style="display:inline-block!important"><img src="${host}/static/img/cackle.png" style="display:inline-block!important"></a></li></ul></div><div class="mc-auth-container"><span class="mc-auth-label">${msg.from}</span><div class="mc-auth-providers"></div></div><div class="mc-widget-container mc-close-${close}"><div class="mc-avatar-container"><img class="mc-user-avatar" src="${mcAnonymAvatar}" height="36" width="36"><span class="mc-user-logout">${msg.logout}</span></div><div class="mc-postbox-container"><div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea placeholder="${msg.placeholder}"></textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="${msg.media}"><a href="#" class="mc-attachimage"><i class="mcicon-picture"></i></a><input type="file" tabindex="-1" accept="image/*" style="display:none"></div></div></div></div></div><div class="mc-submit"><span class="mc-social-xpost"><table><tbody><tr><td><input class="mc-social-xpost-checkbox" type="checkbox"/></td><td><label>${msg.socialSubmit}</label></td><td><span class="mc-social-xpost-icon"></span></td></tr></tbody></table></span><button class="mc-button mc-comment-submit">${msg.submit}</button></div></div><div class="mc-alert mc-alert-close mc-discuss-close" style="display:none"><div class="mc-alert-text">${msg.close}</div></div><div class="mc-account-expired" style="display:none"><div class="mc-h4">${msg.expiredHead}</div><div>${msg.expiredBody}</div><a class="mc-button" href="${host}/pricing">${msg.pay}</a></div><div class="mc-comment-container"><div class="mc-nav-content"><ul><li class="mc-comment-sort"><a href="#" class="mc-sort-menu"></a><ul class="mc-controls"><li><a href="#" class="mc-sort-action" data-sort="desc">${msg.orderdesc} </a></li><li><a href="#" class="mc-sort-action" data-sort="asc">${msg.orderasc} </a></li></ul></li><li><a href="${host}/widget/${sitePage}/comments.rss" class="mc-rss" target="_blank"><i class="mcicon-rss"></i> ${msg.rss}</a></li><li class="mc-subscription-email"><input type="text" placeholder="example@mail.com"/><a href="#"><i class="mcicon-ok"></i></a></li><li><a href="#" class="mc-subscription-menu"><i class="mcicon-envelope"></i> ${msg.subscribe}</a></li><li class="mc-share-post"><a href="#" class="mc-share"><i class="mcicon-share"></i> ${msg.share}</a><ul class="mc-controls"><li><ul class="mc-share-menu"><li><span class="mc-twitter"></span></li><li><span class="mc-facebook"></span></li><li><span class="mc-googleplus"></span></li><li><span class="mc-vkontakte"></span></li><li><span class="mc-odnoklassniki"></span></li><li><span class="mc-mymailru"></span></li></ul></li></ul></li></ul></div><div class="mc-theme-${mcTheme}"><ul class="mc-comment-list"><li class="mc-none-comments">${msg.noneComments}</li></ul></div></div><div class="mc-pagination"><button class="mc-button mc-comment-next" data-page="0">${msg.nextComments}</button></div></div>'
}this.content.html(Cackle.Utils.template(O,B,{host:Cackle.origin,close:K.close,sitePage:r,mcAnonymAvatar:q,mcTheme:D,accType:Math.abs(u.accountType)}));
if(M){Cackle.Utils.loadStyle(Cackle.origin+"/uploads/comment/"+C.id+"/style.css?v="+A)
}if(K.close==true){y("div.mc-auth-container",this.content).hide();
y("div.mc-avatar-container",this.content).hide();
y("div.mc-postbox-container",this.content).hide();
y("div.mc-discuss-close",this.content).show()
}y("#"+(C.container||"mc-container")).html(this.content);
this.buildCommentSort();
this.buildSubscription(u.subscribed);
this.buildCopyright();
this.buildAuthProviders();
this.buildLoggedUser(u);
this.initSocialXPost()
},buildCommentSort:function(){var O=y("a.mc-sort-menu",this.content);
O.text(B["order"+F.getCommentOrder()]);
O.append(' <i class="mcicon-caret-down"></i>')
},buildSubscription:function(Q){var P=y("a.mc-subscription-menu",this.content),O=P.parent();
if(Q){O.addClass("mc-subscribed");
P.append('<i class="mcicon-ok"></i>')
}else{O.removeClass("mc-subscribed");
y("i.mcicon-ok",P).remove()
}},buildCopyright:function(){if(x){y(".mc-logo").remove()
}},buildAuthProviders:function(){var O=y("div.mc-auth-providers",this.content);
if(C.ssoProvider){this.buildSSOProvider(O)
}y.each(f.split(";"),function(P,Q){if(b[Q]){O.append('<span class="mc-auth-provider mc-auth-'+Q+'" title="'+b[Q].name+'"/>')
}if(Q=="other"){return false
}})
},buildSSOProvider:function(Q){var P=y('<span class="mc-sso-provider" title="'+C.ssoProvider.name+'"/>'),O=y('<img src="'+C.ssoProvider.logo+'"></img>');
P.append(O);
if(C.ssoProvider.width){P.css("width",C.ssoProvider.width);
O.css("width",C.ssoProvider.width)
}if(C.ssoProvider.height){P.css("height",C.ssoProvider.height);
O.css("height",C.ssoProvider.height)
}P.click(function(){z.loginWindow(C.ssoProvider.url,true)
});
Q.append(P)
},buildLoggedUser:function(P){var O=y(".mc-avatar-container img",this.content);
if(P.id){O.attr("src",this.buildAvatarSrc(P,O.height()));
if(this.xPostProviders[P.provider]){this.showSocialXPost(P.provider)
}else{this.hideSocialXPost()
}this.content.addClass("mc-loggedin");
if(P.moderator){this.content.addClass("mc-admin")
}}else{O.attr("src",this.buildAvatarSrc({avatar:q,id:P.id},O.height()));
this.content.removeClass("mc-loggedin");
this.content.removeClass("mc-admin");
y("span.mc-social-xpost",this.content).hide()
}},buildAvatarSrc:function(O,P){if(O.avatar){return O.avatar
}else{if(L&&O.hash){return this.buildGravatarUrl(O.hash,P||v)
}else{return q
}}},buildAnonymAvatarSrc:function(O,P){if(o&&O.hash){return this.buildGravatarUrl(O.hash,P||v)
}else{return q
}},buildGravatarUrl:function(P,O){return Cackle.protocol+"//gravatar.com/avatar/"+P+"?d="+q+"&r=PG&s="+O
},buildWaitAvatar:function(){y(".mc-avatar-container img",this.content).attr("src",C.host+"/static/img/load-avatar.gif")
},initSocialXPost:function(){var O=this;
y("input.mc-social-xpost-checkbox",this.content).click(function(){var Q=y("span.mc-social-xpost-icon",O.content),P=O.getSocialXPostProvider(Q.attr("class"));
if(y(this).is(":checked")){Cackle.Cookie.create(P,"on",365)
}else{Cackle.Cookie.create(P,"off",365)
}})
},getSocialXPostProvider:function(P){var O="";
y.each(P.split(" "),function(Q,R){if(R!="mc-social-xpost-icon"){O=R;
return
}});
return O
},showSocialXPost:function(S){var O=Cackle.Cookie.read("mc-xpost-"+S),R=y("input.mc-social-xpost-checkbox",this.content),P=y("span.mc-social-xpost-icon",this.content),Q=y("span.mc-social-xpost",this.content);
if((p==false&&O!="on")||O=="off"){R.removeAttr("checked")
}else{R.attr("checked","checked")
}P.attr("class","mc-social-xpost-icon mc-xpost-"+S);
P.attr("title",S);
Q.css("display","inline-block")
},hideSocialXPost:function(){y("span.mc-social-xpost",this.content).css("display","none")
},setCommentCount:function(P){var O=parseInt(P);
if(O>0){var Q=B.commentCount(O),R=y("a.mc-comment-count",this.content);
R.text(Q);
R.attr("data-count",O);
if(C.countContainer){y(C.countContainer).text(O)
}}},addCommentCount:function(Q){var P=y("a.mc-comment-count",this.content),O=parseInt(P.attr("data-count"))+Q;
P.attr("data-count",O);
this.setCommentCount(O);
if(C.countContainer){y(C.countContainer).text(O)
}}};
var n={TEMPL:"",DELETED:'<li id="mc-${id}"><div class="mc-comment-wrapper mc-comment-deleted">${msg}</div></li>',init:function(){if(C.html&&C.html.comments){this.TEMPL=C.html.comments
}else{if(D==="standard"){this.TEMPL='<li id="mc-${id}" data-author-id="${userId}"><div class="mc-comment-wrapper mc-comment-${status}"><div class="mc-comment-head"><table><tbody><tr><td class="mc-comment-avatar-td"><a class="mc-comment-author" href="#"><img class="mc-comment-avatar" src="${avatar}" style="height:${avatarSize}px!important;width:${avatarSize}px!important">${if provider}<span class="mc-comment-provider mc-${provider}"></span>${endif}</a></td><td class="mc-comment-user-td"><a class="mc-comment-username" href="${userWww}" author="${userId}" target="_blank">${userName}</a></td><td class="mc-comment-vote-td"><div class="mc-comment-vote"><table><tbody><tr><td class="mc-comment-rating mc-comment-rating-${ratingColor}" title="${msg.rating}">${rating}</td><td class="mc-comment-like"><a class="mc-comment-thumbsup" href="${likeUrl}" title="${msg.ratingUp}"><span></span></a></td><td class="mc-comment-unlike"><a class="mc-comment-thumbsdown" href="${unlikeUrl}" title="${msg.ratingDown}"><span></span></a></td></tr></tbody></table></div></td></tr></tbody></table></div><div class="mc-comment-body-inner"><div class="mc-comment-body-container"><div class="mc-comment-body">${message}</div></div><a class="mc-comment-seemore" title="${msg.seemore}" style="display:none">${msg.seemore}</a></div><div class="mc-comment-footer"><a class="mc-comment-created" href="${url}" timestamp="${timestamp}">${created}</a><a class="mc-comment-edit" href="#">${msg.edit}</a><a class="mc-comment-remove" href="#">${msg.remove}</a><a class="mc-comment-reply" href="#">${msg.answer}</a></div><div class="mc-comment-moderate"><a href="#"><span class="mcicon-exclamation-sign"></span>${msg.moderate}</a></div></div></li>'
}else{this.TEMPL='<li id="mc-${id}" data-author-id="${userId}"><div class="mc-comment-user"><a class="mc-comment-author" href="#"><img class="mc-comment-avatar" src="${avatar}" style="height:${avatarSize}px!important;width:${avatarSize}px!important"></a></div><div class="mc-comment-wrapper mc-comment-${status}"><div class="mc-comment-head"><a class="mc-comment-username" href="${userWww}" author="${userId}" target="_blank">${userName}</a><span class="mc-comment-bullet">•</span><a class="mc-comment-created" href="${url}" timestamp="${timestamp}">${created}</a></div><div class="mc-comment-body-inner"><div class="mc-comment-body-container"><div class="mc-comment-body">${message}</div></div><a class="mc-comment-seemore" title="${msg.seemore}" style="display:none">${msg.seemore}</a></div><div class="mc-comment-footer"><span class="mc-comment-rating mc-comment-rating-${ratingColor}" title="${msg.rating}">${rating}</span><a class="mc-comment-thumbsup" href="${likeUrl}" title="${msg.ratingUp}"><i class="mcicon-thumbs-up"></i></a> <a class="mc-comment-thumbsdown" href="${unlikeUrl}" title="${msg.ratingDown}"><i class="mcicon-thumbs-down"></i></a><span class="mc-comment-bullet">•</span><a class="mc-comment-reply" href="#">${msg.answer}<span class="mc-comment-bullet">•</span></a><a class="mc-comment-edit" href="#">${msg.edit}<span class="mc-comment-bullet">•</span></a><a class="mc-comment-remove" href="#">${msg.remove}<span class="mc-comment-bullet">•</span></a><a class="mc-comment-share" href="${url}">${msg.share}</a><span class="mc-share-icons"><span class="mc-twitter"></span><span class="mc-facebook"></span><span class="mc-googleplus"></span><span class="mc-vkontakte"></span><span class="mc-odnoklassniki"></span><span class="mc-mymailru"></span></span></div><div class="mc-comment-moderate"><a href="#"><span class="mcicon-exclamation-sign"></span>${msg.moderate}</a></div></div></li>'
}}},getParentContainer:function(T){var O=y("#mc-"+T.parentId,H.content);
if(O.length){return this.getChildContainer(O)
}var P=y("ul.mc-comment-list",H.content);
for(var Q=0;
Q<T.path.length;
Q++){var S=T.path[Q],O=y("#mc-"+S,H.content);
if(O.length){P=this.getChildContainer(O)
}else{var R=this.createRejectedComment(S);
P.append(R);
P=this.getChildContainer(R)
}}return P
},getChildContainer:function(O){var P,Q=y(O.children("ul.mc-comment-child",H.content));
if(Q.length){P=Q
}else{P=y("<ul/>").addClass("mc-comment-child");
O.append(P)
}return P
},createRejectedComment:function(P){var O=Cackle.Utils.template(this.DELETED,B,{id:P,msg:B["comment-deleted"]});
return y(O)
},prepareData:function(S){var Q=S.author,P=S.anonym,U,T,W,R="",V="",X="zero",O=S.rating,Y=y("<div/>");
if(Q){T=Q.id;
W=Q.name;
U=H.buildAvatarSrc(Q);
V=Q.provider!="sso"?Q.provider:"";
if(Q.www){if(J){R="#"
}else{if(j&&Q.extWww){R="#"
}else{if(Q.www.match("^https?://")){R=Q.www
}else{R="http://"+Q.www
}}}}}else{if(P){T=P.id;
W=P.name;
U=H.buildAnonymAvatarSrc(P);
if(P.www){if(J||j){R="#"
}else{if(P.www.match("^https?://")){R=P.www
}else{R="http://"+P.www
}}}}else{T=0;
W="";
U=q
}}if(O>0){O="+"+O;
X="plus"
}else{if(O<0){X="neg"
}}Y.text(S.message);
if(l){html=Y.html();
Y.html(Cackle.Utils.urlsToHyperlinks(html))
}return{avatar:Cackle.Utils.escapeHtml(U),userId:T,userName:Cackle.Utils.escapeHtml(W)||B.guest,userWww:Cackle.Utils.escapeHtml(R)||"#",provider:V,ratingColor:X,rating:O,message:Y.html()}
},buildCommentUrl:function(P){var O=Cackle.Utils.getBeforeAnchor(window.location.href);
return O+"#mc-"+P
},appendComment:function(V,aa){var R=y("#mc-"+V.id,H.content);
if(R.length>0){var U=R.children(".mc-comment-wrapper");
U.attr("class","mc-comment-wrapper mc-comment-"+V.status);
return
}var W=y("li.mc-none-comments",H.content);
if(W.length>0){W.remove()
}if(r==0){r=V.sitePageId
}var O=y("ul.mc-comment-list",H.content);
if(V.parentId>0){O=this.getParentContainer(V)
}var Z=this.prepareData(V),Y=Cackle.Utils.template(this.TEMPL,B,{id:V.id,status:V.status,avatar:Z.avatar,userId:Z.userId,userName:Z.userName,userWww:Z.userWww,avatarSize:v,provider:Z.provider,ratingColor:Z.ratingColor,rating:Z.rating,likeUrl:C.host+"/comment/"+V.id+"/vote/up",unlikeUrl:C.host+"/comment/"+V.id+"/vote/down",message:Z.message,url:this.buildCommentUrl(V.id),created:Cackle.Time.getTime(V.created,C.lang,C.timeFormat),timestamp:V.created}),X=y(Y),T=y("div.mc-comment-body-container",X);
y("a.mc-comment-username",X).on("click.cackle",F.gotoUserWww);
y("a.mc-comment-thumbsup, a.mc-comment-thumbsdown",X).on("click.cackle",F.vote);
y("a.mc-comment-reply",X).on("click.cackle",{handler:F},F.replyShow);
y("a.mc-comment-edit",X).on("click.cackle",{id:V.id},F.editComment);
y("a.mc-comment-remove",X).on("click.cackle",F.removeComment);
y("span.mc-share-icons span",X).on("click.cackle",F.shareComment);
y(".mc-comment-moderate a",X).on("click.cackle",m.click);
var S=null;
if(I&&(V.message||V.media)){S=i.makeContent(V.message+" "+V.media);
T.append(S)
}this.updateUserBtnsState(Z.userId,V.created,X);
if(aa){X.prependTo(O).hide().slideDown(function(){y(this).attr("style","")
})
}else{O.append(X)
}var Q=374;
if(T.height()>1.5*Q||(S&&S.children().children().length>1)){T.css("height","374px");
var P=T.next();
P.click(function(){var ab=T.addClass("mc-height-auto").height();
T.removeClass("mc-height-auto").animate({height:ab},300,function(){T.css("height","auto")
});
P.hide()
});
P.show()
}},updateAppearance:function(){var O=this;
y(".mc-comment-list .mc-comment-wrapper",H.content).each(function(){var T=y("a.mc-comment-created",this),R=parseInt(T.attr("timestamp"));
if(R){var S=T.text(),Q=Cackle.Time.getTime(R,C.lang,C.timeFormat);
if(S!=Q){T.text(Q)
}}var P=parseInt(y("a.mc-comment-username",this).attr("author"));
O.updateUserBtnsState(P,R,this)
})
},updateUserBtnsState:function(P,Q,O){this.updateUserBtnState(a,".mc-comment-edit",P,Q,O);
this.updateUserBtnState(g,".mc-comment-remove",P,Q,O)
},updateUserBtnState:function(R,S,Q,T,O){if(R==null&&u.id===Q){y(S,O).show()
}else{if(R==0||u.id!=Q){y(S,O).hide()
}else{if(R>0&&u.id===Q){var P=new Date().getTime();
if(T+(R*60*1000)<P){y(S,O).hide()
}else{y(S,O).show()
}}else{y(S,O).hide()
}}}},changeMessage:function(P,R){var Q=y("<div/>"),O=y("#mc-"+P+" .mc-comment-body:first",H.content);
Q.text(R);
if(l){html=Q.html();
Q.html(Cackle.Utils.urlsToHyperlinks(html))
}O.html(Q.html());
if(R){O.after(i.makeContent(R))
}},changeRating:function(Q,R){var O=y("#mc-"+Q+" .mc-comment-rating:first",H.content),P="mc-comment-rating-zero";
if(R>0){P="mc-comment-rating-plus";
R="+"+R
}else{if(R<0){P="mc-comment-rating-neg"
}}O.attr("class","mc-comment-rating");
O.addClass(P);
O.text(R)
},changeStatus:function(P,O){var R=y("#mc-"+P,H.content);
if(u.moderator&&O!="deleted"){var Q=R.children(".mc-comment-wrapper");
Q.attr("class","mc-comment-wrapper mc-comment-"+O)
}else{this.removeComment(R)
}H.addCommentCount(-1)
},removeComment:function(O){if(O.children(".mc-comment-child").length>0){this.markAsDeleted(O)
}else{O.remove()
}},markAsDeleted:function(T){var Q=T.attr("id").replace("mc-",""),S=".mc-comment-wrapper",R=this.createRejectedComment(Q),O=R.children(S),P=T.children(S);
y(".mc-comment-user",T).remove();
P.replaceWith(O)
}};
var F={channel:"",url:"",title:"",demoCommentId:100,init:function(){this.initElements();
y(".mc-head-container .active a",H.content).click(function(){return false
});
y("button.mc-comment-submit",H.content).click({handler:this,postbox:y("div.mc-postbox-container",H.content)},this.commentSubmit);
y("a.mc-sort-menu",H.content).click("click.cackle",this.sortMenu);
y("a.mc-sort-action",H.content).click("click.cackle",this.sortAction);
y("a.mc-subscription-menu",H.content).click("click.cackle",this.subscribed);
y(".mc-subscription-email a",H.content).click("click.cackle",this.subscribedEmail);
y("a.mc-rss",H.content).click(this.rss);
y("a.mc-share",H.content).click(this.sharePostMenu);
y(".mc-share-menu span",H.content).click("click.cackle",this.sharePost)
},initElements:function(){this.url=decodeURIComponent(Cackle.Utils.getUrl(C));
this.channel=Cackle.Utils.getChannel(C);
this.title=Cackle.Utils.escapeSpecialChars(y("title").text())
},getCommentOrder:function(){var O=Cackle.Cookie.read("mc-comment-order");
if(O){return O
}else{if(C.sort){return C.sort
}}return"desc"
},commentSubmit:function(Q){var P=Q.data.handler,O=Q.data.postbox;
if(!u.id){z.authPopup(function(){P.submit(O)
},{event:"submit",msg:P.getMsgTextarea(O).val(),parent:P.getParentId(O)})
}else{P.submit(O)
}return false
},recive:function(O){if(r==0){return
}y.getJSON(this.reciveUrl(this.channel),function(P){F.showComments(P.page,O)
})
},showComments:function(P,Q){if(!P){return
}y(P.content,H.content).each(function(){n.appendComment(this)
});
H.setCommentCount(P.totalElements);
F.gotoComment();
var O=(P.number+1)*P.size<P.totalElements;
if(O){c.show()
}else{c.hide()
}if(Q){Q(F)
}},reRecive:function(){y("ul.mc-comment-list",H.content).empty();
c.setPage(0);
this.recive()
},reciveUrl:function(P){var O=u.moderator?"/fullComments":"/comments";
return C.host+"/widget/"+C.id+O+"?sitePage="+r+"&order="+this.getCommentOrder()+"&page="+c.getPage()+"&pagination="+w+"&callback=?"
},gotoComment:function(){var O=window.location.href;
if(O.indexOf("#mc-")>0){document.location.replace(O)
}},getMsgTextarea:function(O){return y(".mc-editor-message textarea",O)
},getParentId:function(O){if(O.hasClass("mc-comment-reply-box")){return O.parents("li:first").attr("id").replace("mc-","")
}return 0
},submit:function(V){var W=this,R=y("button.mc-comment-submit",V),T=this.getParentId(V),U=this.getMsgTextarea(V),X=U.val(),P=y(".mc-media-surface img",V),O=this.submitUrl(X,P,T),Q=y("div.mc-spinner-control",V);
if(!u.id){return
}var S=this.validateCommentMsg(X,P);
if(S){this.validateAlert(V,S);
return false
}Q.show();
R.attr("disabled","disabled");
Cackle.PostMessage.send(O.url,O.data,function(Y){var ab=y.parseJSON(Y.data),aa=ab.commentResponse,ac=aa.comment,Z=aa.error;
Q.hide();
if(ac){U.val("");
y("div.mc-media-preview",V).remove();
if(T>0){V.hide()
}Cackle.Utils.callbacks(C,"submit",aa);
if(ac.status==="pending"){W.validateAlert(V,B.commentPreModer)
}else{n.appendComment(ac,true)
}}else{if(Z){W.validateAlert(V,B[Z])
}}},function(Y){},function(){U.focus();
R.removeAttr("disabled")
})
},justSubmit:function(R,Q){var P=this,O=this.submitUrl(R,null,Q);
Cackle.PostMessage.send(O.url,O.data,function(S){var W=y("div.mc-postbox-container",H.content),V=y.parseJSON(S.data),U=V.commentResponse,X=U.comment,T=U.error;
if(X){if(X.status==="pending"){P.validateAlert(W,B.commentPreModer)
}else{n.appendComment(X,true)
}}else{if(T){P.validateAlert(W,B[T])
}}},function(S){},function(){})
},validateCommentMsg:function(P,O){if(!P){return B.messageBlankError
}else{if(P.length<2){return B.messageSmallError
}else{if((k&&P.length>k)||(!k&&P.length>2000)){return B.messageLimitError
}else{if(O&&O.length>1000){return B.mediaLengthError
}}}}return
},validateAlert:function(P,O){var Q=P.next();
if(Q.hasClass("mc-alert-error")){y(".mc-alert-text",Q).text(O)
}else{Q=y('<div class="mc-alert mc-alert-error"><div class="mc-alert-text">'+O+"</div></div>");
P.after(Q);
setTimeout(function(){Q.fadeOut(400,function(){Q.remove()
})
},3000)
}},demoSubmit:function(V,R,O,Q,S,Y,U,X,W){var P="";
O.each(function(){P+=" "+y(this).attr("href")
});
var T={id:V.demoCommentId,parent:Q,message:S,media:P,rating:0,status:"approved",created:new Date()};
if(u.id){T.author=u
}else{T.anonym={}
}n.appendComment(T,true);
V.demoCommentId=V.demoCommentId+1;
U.hide();
R.val("");
y("#mc-text-container .mc-media",H.content).remove();
if(X){X()
}W()
},submitUrl:function(R,S,Q){var P="";
if(S){S.each(function(){P+=" "+y(this).attr("src")
})
}var O=C.host+"/widget/"+C.id+"/createComment",T={sitePage:r,siteForum:d,chan:this.channel,url:this.url,chanName:Cackle.Utils.getSearchPathFromLocation(window.location),msg:Cackle.Utils.escapeSpecialChars(R),media:P?y.trim(P):P,parentId:0,social:""};
if(!N){T.title=this.title
}if(Q>0){T.parentId=Q
}if(y(".mc-social-xpost .mc-social-xpost-checkbox:checked",H.content).length){T.social="on"
}return{url:O,data:T}
},vote:function(Q,P){var O=P||this;
if(!u.id&&!P){z.authPopup(function(){F.vote(Q,O)
},{event:"vote",href:y(O).attr("href")});
return false
}return F.justVote(y(O).attr("href"))
},justVote:function(O){y.getJSON(O+"?callback=?",function(P){n.changeRating(P.commentSmallDto.id,P.commentSmallDto.rating)
});
return false
},replyShow:function(S){var Q=S.data.handler,O=y(S.target,H.content).parents("li:first .mc-comment-wrapper"),P=y("div.mc-comment-reply-box",O);
if(P.length>0&&!P.is(":hidden")){P.hide()
}else{if(P.length==0){var R;
if(C.html&&C.html.reply){R=C.html.reply
}else{R='<div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea class="mc-answer-textarea" placeholder="${msg.placeholder}"></textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="${msg.media}"><a href="#" class="mc-attachimage"><i class="mcicon-picture"></i></a><input type="file" tabindex="-1" accept="image/*" style="display:none"></div></div></div></div></div><button class="mc-button mc-comment-submit">${msg.submit}</button>'
}P=y("<div/>").addClass("mc-comment-reply-box");
P.html(Cackle.Utils.template(R,B));
y("button.mc-comment-submit",P).click({handler:Q,postbox:P},Q.commentSubmit);
y("a.mc-attachimage",P).click(i.uploadImage);
y('input[type="file"]',P).change({handler:i},i.openFiles);
y("textarea",P).bind("keyup",Cackle.Utils.textareaAutoResize);
y("div.mc-comment-footer",O).after(P)
}P.css("display","inline-block");
y(".mc-editor-message textarea",P).focus()
}return false
},editComment:function(T){var S=T.data.id,Q=y("#mc-"+S,H.content),O=y("div.mc-comment-body:first",Q),R=O.text();
if(y("textarea.mc-answer-textarea",O).length>0){return false
}O.html('<div class="mc-comment-edit-box"><div class="mc-editor"><div class="mc-editor-wrapper"><div class="mc-editor-message"><textarea class="mc-answer-textarea" placeholder="'+B.placeholder+'">'+R+'</textarea><div class="mc-editor-controls"><div class="mc-spinner-control" style="display:none"></div><div class="mc-attachmedia-control" title="'+B.media+'"><a href="#" class="mc-attachimage"><i class="mcicon-picture"></i></a><input type="file" tabindex="-1" accept="image/*" style="display:none"></div></div></div></div></div><button class="mc-button mc-comment-save">'+B.save+'</button><button class="mc-button mc-save-cancel">'+B.cancel+"</button></div>");
y("textarea.mc-answer-textarea",O).focus();
y("a.mc-attachimage",O).click(i.uploadImage);
y('input[type="file"]',O).change({handler:i},i.openFiles);
y("textarea",O).bind("keyup",Cackle.Utils.textareaAutoResize);
var P=y("textarea.mc-answer-textarea",O);
P.height(P.prop("scrollHeight"));
y("button.mc-comment-save",O).click(function(){var W=y("textarea.mc-answer-textarea",O).val(),V=y("div.mc-spinner-control",O);
var U=F.validateCommentMsg(W);
if(U){F.validateAlert(O,U);
return false
}V.show();
Cackle.PostMessage.send(C.host+"/comment/"+S+(T.data.url||"/edit"),{msg:Cackle.Utils.escapeSpecialChars(W)},function(X){var Y=y.parseJSON(X.data);
V.hide();
if(Y&&Y.error){F.validateAlert(O,B[Y.error])
}n.changeMessage(S,W)
},function(){},function(){});
return false
});
y("button.mc-save-cancel",O).click(function(){n.changeMessage(S,R);
return false
});
return false
},removeComment:function(R){var Q=y(R.target,H.content),O=Q.parents("li:first"),P=O.attr("id").replace("mc-","");
if(confirm(B.removeConfirm)){Cackle.PostMessage.send(C.host+"/comment/"+P+"/remove",{msg:"test"},function(S){if(O.has("li").length){n.removeComment(O)
}else{O.remove()
}},function(){},function(){})
}return false
},removeAll:function(O,P){y.getJSON(C.host+"/comment/"+O+"/"+(P?"banRemove":"removeAll")+"?callback=?",function(Q){var R=Q.commentSmallDto.author?Q.commentSmallDto.author.id:Q.commentSmallDto.anonym.id,T=y('li[data-author-id="'+R+'"]',H.content),S=0;
y(T).each(function(){n.removeComment(y(this));
S-=1
});
H.addCommentCount(S)
});
return false
},sortMenu:function(Q){var P=y(this).parent(),R=y("ul.mc-controls",P),O=F.getCommentOrder();
y("a i",R).remove();
y('a[data-sort="'+O+'"]',R).append('<i class="mcicon-ok"></i>');
if(R.is(":visible")){R.hide()
}else{R.show()
}return false
},sortAction:function(R){var Q=y(this),O=Q.attr("data-sort"),P=Q.parents(".mc-comment-sort"),T=y("ul.mc-controls",P),S=y("a.mc-sort-menu",P);
Cackle.Cookie.create("mc-comment-order",O,365);
S.text(Q.text());
S.append('<i class="mcicon-caret-down"></i>');
F.reRecive();
T.hide();
return false
},sharePostMenu:function(){var O=y(this).parent(),P=y("ul.mc-controls",O);
if(P.is(":visible")){P.hide()
}else{P.show()
}return false
},sharePost:function(){var Q=y(this),P=Q.parents(".mc-share-post:first"),R=Q.attr("class").replace("mc-",""),O={};
y("ul.mc-controls",P).hide();
O.url=F.url;
if(R=="twitter"){O.text=y("title").text()
}Cackle.Social.Share[R](O);
return false
},subscribed:function(){var P=y(this).parent();
if(P.hasClass("mc-subscribed")){if(u&&u.email){y.getJSON(F.unsubscribedUrl(u.email));
H.buildSubscription(false)
}else{var O=y(".mc-subscription-email input",H.content).val();
y.getJSON(F.unsubscribedUrl(O));
H.buildSubscription(false)
}}else{if(u&&u.email){y.getJSON(F.subscribedUrl(u.email));
H.buildSubscription(true)
}else{y("li.mc-subscription-email",H.content).show();
P.hide()
}}return false
},subscribedEmail:function(){var P=y(this).parent(),O=y("input",P);
y.getJSON(F.subscribedUrl(O.val()));
y("li.mc-subscription-email",H.content).hide();
y("a.mc-subscription-menu",H.content).parent().show();
H.buildSubscription(true);
return false
},subscribedUrl:function(O){return C.host+"/widget/"+r+"/subscription?callback=?&email="+O+"&site="+C.id+"&title="+encodeURIComponent(F.title)+"&chan="+encodeURIComponent(F.channel)+"&chanName="+Cackle.Utils.getSearchPathFromLocation(window.location)+"&url="+encodeURIComponent(F.url)
},unsubscribedUrl:function(O){return C.host+"/widget/"+r+"/unsubscription?callback=?&email="+O
},rss:function(){var R=y(this),O=R.attr("href");
if(O.indexOf("/widget/0/comments.rss")>-1){var Q=encodeURIComponent(Cackle.Utils.getChannel(C)),P=Cackle.Utils.getSearchPathFromLocation(window.location);
window.location.href=O+"?site="+C.id+"&chan="+Q+"&name="+P;
return false
}return true
},shareComment:function(){var T=y(this),R=T.attr("class").replace("mc-",""),V=T.parents("li"),O=T.parents(".mc-comment-wrapper"),P=y("a.mc-comment-created",O).attr("href"),U=y("a.mc-comment-username",O).text(),W=y("div.mc-comment-body",O).text();
var S,Q=y(".mc-comment-media a:first",O);
if(Q.length>0){S=Q.attr("href")
}else{S=y(".mc-comment-author img",V).attr("src")
}Cackle.Social.Share[R]({url:P,title:U,text:W,img:S})
},gotoUserWww:function(P){var O=y(P.target);
if(O.attr("href")!="#"){return true
}return false
}};
var G={init:function(){var O=this;
if(r>0){Cackle.Stream.start(r,function(P){O.dispatcher(P);
Cackle.Utils.callbacks(C,P.event,P)
})
}},dispatcher:function(O){if(O.event==="status"){if(O.status==="approved"){H.addCommentCount(1);
n.appendComment(O,true)
}else{n.changeStatus(O.id,O.status)
}}else{if(O.event==="vote"){n.changeRating(O.id,O.rating)
}else{if(O.event==="edit"){n.changeMessage(O.id,O.msg)
}else{if(O.status==="approved"||u.moderator){H.addCommentCount(1);
n.appendComment(O,true)
}}}}}};
var z={init:function(){y("span.mc-auth-provider",H.content).click({handler:this,callback:function(){H.$textarea.click();
H.$textarea.focus()
}},this.loginClick)
},loginClick:function(R){var O=R.data.handler,Q=y(R.target),P=O.getAuthProvider(Q.attr("class")),S=b[P];
if(!S||S.label){O.authPopup(R.data.callback,null,P)
}else{O.loginWindow(S.url,false,R.data.callback)
}},getAuthProvider:function(P){var O="";
y.each(P.split(" "),function(Q,R){if(R!="mc-auth-provider"){O=R.replace("mc-auth-","");
return
}});
return O
},loginWindow:function(O,P,R){H.buildWaitAvatar();
if(E){O=Cackle.Utils.addParam(O,E)
}var Q=Cackle.Utils.openPopup(O,850,500);
this.checkConnection(Q,R,null,P)
},authPopup:function(T,R,S){if(C.authPopup){this.overrideAuthPopup(T,R);
return
}var Q=Cackle.origin+"/widget/"+C.id+"/authenticate";
if(E){Q=Cackle.Utils.addParam(Q,E)
}if(C.ssoProvider){var P="";
P+="ssoName="+C.ssoProvider.name;
P+="&ssoUrl="+encodeURIComponent(C.ssoProvider.url);
P+="&ssoLogo="+encodeURIComponent(C.ssoProvider.logo);
if(C.ssoProvider.width&&C.ssoProvider.height){P+="&ssoWidth="+encodeURIComponent(C.ssoProvider.width);
P+="&ssoHeight="+encodeURIComponent(C.ssoProvider.height)
}Q=Cackle.Utils.addParam(Q,P)
}if(C.lang){Q=Cackle.Utils.addParam(Q,"locale="+C.lang)
}if(S){Q=Cackle.Utils.addParam(Q,"provider="+S)
}if(C.guest){if(C.guest.first){Q=Cackle.Utils.addParam(Q,"guestFirst=true")
}if(C.guest.hideEmail){Q=Cackle.Utils.addParam(Q,"guestHideEmail=true")
}}var O=window.open(Q,"","width="+500+",height="+350+",location=1,menubar=0,scrollbars=0,resizable=1,status=0");
this.checkConnection(O,T,R)
},overrideAuthPopup:function(Q,P){var O=this;
C.authPopup(function(R){if(R){C.ssoAuth=R;
Cackle.SSO.auth(C,function(S){O.afterLogin(S);
if(Q){Q()
}})
}else{O.authorizeUser(Q)
}},JSON.stringify(P))
},authorizeUser:function(Q){var P=this,O=Cackle.origin+"/widget/"+C.id+"/authorize?callback=?";
if(r>0){O=Cackle.Utils.addParam(O,"sitePageId="+r)
}y.getJSON(O,function(R){P.afterLogin(R.widgetUser);
if(Q){Q(R.widgetUser)
}})
},checkConnection:function(T,U,Q,P){var S=this,R=100;
function O(){if(!T||T.closed){var V=Cackle.Cookie.read("mc-sso-auth");
if(V){Cackle.Cookie.create("mc-sso-auth","");
if("success"==V){Cackle.Storage.set("mc-event",Q);
window.location.reload()
}}else{if(P){window.location.reload()
}else{S.authorizeUser(U)
}}}else{setTimeout(O,R)
}}setTimeout(O,R)
},afterLogin:function(O){u=O;
if(u&&u.id>0){Cackle.Utils.callbacks(C,"loggedin",u)
}H.buildLoggedUser(u);
H.buildSubscription(u.subscribed);
n.updateAppearance();
if(O.moderator){F.reRecive()
}}};
var c={container:"",init:function(){this.container=y("div.mc-pagination",H.content);
y("button.mc-comment-next",this.container).click({handler:this},this.next)
},setPage:function(O){return y("button.mc-comment-next",this.container).attr("data-page",O)
},getPage:function(){var O=y("button.mc-comment-next",this.container);
if(O.length){return parseInt(O.attr("data-page"))
}else{return 0
}},next:function(P){var O=P.data.handler;
O.showWait();
O.setPage(O.getPage()+1);
F.recive(function(){O.removeWait()
});
return false
},show:function(){y("div.mc-pagination",H.content).css("display","block")
},hide:function(){y("div.mc-pagination",H.content).css("display","none")
},showWait:function(){y("button.mc-comment-next",this.container).append(this.waitImg())
},removeWait:function(){y("img.mc-pagination-wait",this.container).remove()
},waitImg:function(){return'<img class="mc-pagination-wait" src="'+C.host+'/static/img/comment-wait.gif"/>'
}};
var m={messages:{ru:{guest:"Гость",moderate:"Модерировать",approve:"Одобрить",reject:"Отклонить",recovery:"Восстановить",spam:"Это спам",removeByAdmin:"Удалить",removeAll:"Удалить все",removeAllBan:"Удалить все и забанить",editByAdmin:"Редактировать",banUser:"Забанить пользователя",unbanUser:"Разбанить пользователя",banIp:"Забанить IP",unbanIp:"Разбанить IP",confirm:"Вы уверены, что хотите удалить?"},en:{guest:"Guest",moderate:"Moderate",approve:"Approve",reject:"Reject",recovery:"Recovery",spam:"Spam",removeByAdmin:"Delete",removeAll:"Delete all",removeAllBan:"Delete all and ban",editByAdmin:"Edit",banUser:"Ban user",unbanUser:"Unban user",banIp:"Ban IP",unbanIp:"Unban IP",confirm:"Are you sure you want to delete?"},msg:function(O){lang=C.lang=="ru"?"ru":"en";
return this[lang][O]
}},click:function(R){var O=y(R.target),Q=O.parent(),P=O.next(".mc-controls");
if(P.length>0){Q.removeClass("mc-comment-moderate-press");
P.remove()
}else{Q.addClass("mc-comment-moderate-press");
m.show(O)
}return false
},show:function(O){var R=O.closest("li"),Q=R.attr("id").replace("mc-",""),P=y('<ul class="mc-controls"></ul>');
y.getJSON(C.host+"/comment/"+Q+"/isBanned?callback=?",function(S){var T=S.commentPrivateInfo;
m.commentControls(P,Q,T.commentStatus,O[0]);
if(!T.anonymComment){P.append(m.userControl(Q,T,O[0]))
}P.append(m.ipControl(Q,T,O[0]));
O.after(P)
});
return false
},userControl:function(O,T,S){var P=y("<li></li>"),Q=T.author||this.messages.msg("guest");
if(T.email){Q+=" <"+T.email+">"
}var R;
if(T.userBanned){R=this.control(O,"unbanUser",this.messages.msg("unbanUser"),S)
}else{R=this.control(O,"banUser",this.messages.msg("banUser"),S)
}P.append(R);
return P
},ipControl:function(P,S,R){var O=y("<li></li>");
var Q;
if(S.ipBanned){Q=this.control(P,"unbanIp",this.messages.msg("unbanIp"),R)
}else{Q=this.control(P,"banIp",this.messages.msg("banIp"),R)
}O.append(Q);
return O
},commentControls:function(S,Q,V,R){var T=this,O=[];
if(V==="approved"){O.push("reject")
}else{if(V==="pending"){O.push("approve");
O.push("reject")
}else{O.push("recovery")
}}if(V=="spam"){O.push("removeByAdmin")
}else{if(V!="deleted"){O.push("spam");
O.push("removeByAdmin")
}}y.each(O,function(Z,Y){var X=y("<li></li>");
X.append(T.control(Q,Y,T.messages.msg(Y),R));
S.append(X)
});
var P=y("<li></li>");
P.append(T.control(Q,"removeAll",T.messages.msg("removeAll"),R,function(){return T.deleteAll(R,Q)
}));
S.append(P);
var W=y("<li></li>");
W.append(T.control(Q,"removeAllBan",T.messages.msg("removeAllBan"),R,function(){return T.deleteAll(R,Q,true)
}));
S.append(W);
var U=y("<li></li>");
U.append(T.control(Q,"editByAdmin",T.messages.msg("editByAdmin"),R,function(){var X=y(R).next(".mc-controls");
X.remove();
return F.editComment({data:{id:Q,url:"/editByAdmin"}})
}));
S.append(U)
},deleteAll:function(Q,P,R){if(!confirm(this.messages.msg("confirm"))){return false
}var O=y(Q).next(".mc-controls");
O.remove();
return F.removeAll(P,R)
},refresh:function(O,P){if(O.indexOf("remove")>-1&&!confirm(this.messages.msg("confirm"))){return false
}y.getJSON(O,function(R){var Q=y(P).next(".mc-controls");
if(Q.length>0){Q.parent().removeClass("mc-comment-moderate-press");
Q.remove()
}return false
});
return false
},control:function(R,O,Q,T,U){var P=C.host+"/comment/"+R+"/"+O+"?callback=?",S=y("<a></a>",{href:P});
S.text(Q);
S.attr("style","color:black!important");
if(U){S.click(U)
}else{S.click(y.proxy(this.refresh,this,P,T))
}return S
}};
var i={xhr:null,init:function(){y("a.mc-attachimage",H.content).click(this.uploadImage);
y('input[type="file"]',H.content).change({handler:this},this.openFiles)
},uploadImage:function(O){y(this).next().click();
return false
},openFiles:function(R){var O=R.data.handler,Q=y(this),P=Q.parents(".mc-editor:first");
O.uploadFiles(this.files,P);
Q.val(null)
},uploadFiles:function(S,U){y("div.mc-spinner-control",U).show();
var T=new FormData();
for(var Q=0,P;
P=S[Q];
++Q){T.append("file",P)
}var R=this,O=Cackle.protocol+"//media.cackle.me/";
if(!this.xhr){this.xhr=new XMLHttpRequest()
}this.xhr.open("POST",O+"upload2",true);
this.xhr.onload=function(V){if(4===R.xhr.readyState){if(200===R.xhr.status&&R.xhr.responseText.length>0){R.attachImage(O+R.xhr.responseText,U)
}}};
this.xhr.send(T)
},attachImage:function(P,S){if(P){var Q=this.makePreview([P],true),O=S.next();
if(O.hasClass("mc-media-preview")){y("ul",O).append(y("li",Q))
}else{var R=y('<div class="mc-media-preview"/>');
R.append(Q);
S.after(R)
}}y("div.mc-spinner-control",S).hide();
return false
},makeContent:function(Q){var O=this.findLinks(Q);
if(O&&O.length>0){var P=this.makePreview(O);
var R=y("<div/>").addClass("mc-comment-media");
R.append(P);
return R
}},findLinks:function(O){return O.match(/(\b(https?:\/\/(((www\.)?youtube\.com\/watch\?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|((www\.)?youtu\.be\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(vimeo\.com\/(\d)*)|([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]\.(png|jpg|gif))|(docs\.google\.com\/present\/view?[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(www\.slideshare\.net\/slideshow\/embed_code\/(\d)+))))/ig)
},makePreview:function(O,R){var Q=this,P=y("<ul></ul>");
y.each(O,function(){var T=y("<li></li>"),U=this.toString(),V=false,W;
if(U.indexOf("youtube.com")>-1){W=Q.youtubeThumbl(U);
V=true
}else{if(U.indexOf("youtu.be")>-1){W=Q.youtubeShortThumbl(U);
V=true
}else{if(U.indexOf("vimeo.com")>-1){W=Q.vimeoThumbl(U);
V=true
}else{if(U.indexOf("docs.google.com")>-1){W=Q.presentThumbl(U)
}else{if(U.indexOf("slideshare.net")>-1){W=Q.presentThumbl(U)
}else{W=Q.imgThumbl(U)
}}}}}var S;
if(R){S=y('<div class="mc-media-surface" />');
var X=y("<span></span>");
T.append(X);
y(X).click(function(){T.remove()
})
}else{S=y("<a/>",{href:this,target:"_blank"});
S.click({handler:Q},Q.mediaClick);
if(V){S.append(y('<img class="mc-media-play" src="'+C.host+'/widget/img/ytplay.png"></img>'))
}}S.append(W);
T.append(S);
P.append(T)
});
return P
},mediaClick:function(R){var P=R.data.handler,Q=y(this),O=Q.attr("href");
if(/^https?\:\/\/(www\.)?youtu((\.be)|(be\.com))/.test(O)){Q.replaceWith(P.youtubeVideo(O))
}else{if(/^https?\:\/\/(www\.)?vimeo\.com/.test(O)){Q.replaceWith(P.vimeoVideo(O))
}else{return true
}}return false
},youtubeVideo:function(P){if(P.indexOf("youtu.be")>-1){var O=this.youtubeShortRegex(P);
if(O&&O.length>1){return this.youtubeEmbed(P,O[2])
}}else{var O=this.youtubeRegex(P);
if(O&&O.length>0){return this.youtubeEmbed(P,O[1])
}}},youtubeEmbed:function(O,P){return'<object><param name="movie" value="'+O+'"/><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="never"/><embed src="//www.youtube.com/v/'+P+'?f=videos&amp;app=youtube_gdata&amp;autoplay=1&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="never" allowfullscreen="true"/></object>'
},vimeoVideo:function(P){var O=/vimeo\.com\/(\d+)/.exec(P);
if(O&&O.length>0){return this.vimeoEmbed(O[1])
}},vimeoEmbed:function(O){return'<object><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="//vimeo.com/moogaloop.swf?clip_id='+O+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=1" /><embed src="//vimeo.com/moogaloop.swf?clip_id='+O+'&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1&amp;autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always"></embed></object>'
},youtubeThumbl:function(P){var O=this.youtubeRegex(P);
if(O&&O.length>0){return this.youtubeImg(O[1])
}},youtubeShortThumbl:function(P){var O=this.youtubeShortRegex(P);
if(O&&O.length>1){return this.youtubeImg(O[2])
}},youtubeRegex:function(O){return/v=([^\?\&]+)/.exec(O)
},youtubeShortRegex:function(O){return/\/\/([^\/]+)\/([^\/]+)/.exec(O)
},youtubeImg:function(O){return y("<img></img>",{src:"//i.ytimg.com/vi/"+O+"/0.jpg"})
},vimeoThumbl:function(Q){var O=/vimeo\.com\/(\d+)/.exec(Q);
if(O&&O.length>0){var P=y("<img></img>");
y.getJSON("//vimeo.com/api/v2/video/"+O[1]+".json?callback=?",function(R){P.attr("src",R[0].thumbnail_large)
});
return P
}},presentThumbl:function(O){return y("<img></img>",{src:C.host+"/static/img/presen_thumbl.png"})
},imgThumbl:function(O){return y("<img></img>",{src:O})
}};
var K=C.data,h=K.setting,s=h.setting;
u=K.auth;
f=C.providers||s.providers;
v=s.avatarSize||v;
l=s.urlRecogn;
p=s.crossposting;
L=h.gravatarEnable;
o=h.anonymGravatarEnable;
q=h.anonymAvatar||C.host+"/static/img/anonym.png",M=h.style;
x=h.withoutCopyright;
mcExpired=h.expired;
D=C.theme||h.theme;
mcColor=C.color||h.color;
a=h.editComment;
g=h.removeComment;
E=h.verifyEmail?"verifyUrl=/widget/"+C.id+"/verify":"";
w=h.pagination;
k=h.maxCommentLen;
J=h.denyWww;
j=h.denyExtWww;
I=h.media;
A=h.modified;
C.lang=C.lang||h.lang;
r=K.sitePageId;
d=K.siteForumId;
N=K.title;
B=h.messages;
B.header=s.mcHeader||B.header;
if(s.commentsLabel){B.commentCount=function(O){return s.commentsLabel.replace("{num}",O)
}
}else{B.commentCount=B.commentCount
}B.from=s.fromLabel||B.from;
B.placeholder=s.placeholder||B.placeholder;
B.submit=s.submitLabel||B.submit;
B.answer=s.replyLabel||B.answer;
B.nextComments=s.nextLabel||B.nextComments;
t.yandex.name=B.yandex;
t.vkontakte.name=B.vkontakte;
t.mymailru.name=B.mymailru;
t.odnoklassniki.name=B.odnoklassniki;
t.mailru.label=B.mailruLabel;
t.myopenid.label=B.myopenidLabel;
t.livejournal.name=B.livejournal;
t.livejournal.label=B.livejournalLabel;
t.wordpress.label=B.wordpressLabel;
t.verisign.label=B.verisignLabel;
if(mcExpired){var e=y("#"+(C.container||"mc-container"));
if(u&&u.moderator){e.html('<div class="mc-content"><div class="mc-account-expired"><div class="mc-h4">'+B.expiredHead+"</div><div>"+B.expiredBody+'</div><a class="mc-button" href="'+C.host+'/pricing">'+B.pay+"</a></div></div>")
}else{e.html('<div class="mc-content"><div class="mc-alert mc-alert-close mc-discuss-close"><div class="mc-alert-text">'+B.expired+"</div></div></div>")
}return
}H.init();
n.init();
F.init();
F.showComments(K.comments);
G.init();
z.init();
c.init();
i.init();
Cackle.PostMessage.init(C.host);
Cackle.SSO.init(C,function(O){z.afterLogin(O);
var P=Cackle.Storage.get("mc-event");
if(P){Cackle.Storage.remove("mc-event");
if("submit"==P.event&&P.msg){F.justSubmit(P.msg,P.parent)
}else{if("vote"==P.event){F.justVote(P.href)
}}}});
Cackle.CommentBuilder=n;
Cackle.Comment.addEvent=function(O){if(O){var P=y.parseJSON(O);
if("submit"==P.event&&P.msg){F.justSubmit(P.msg,P.parent)
}else{if("vote"==P.event){F.justVote(P.href)
}}}};
Cackle.Utils.callbacks(C,"ready");
Cackle.reinit=function(){if(Cackle.mcXHR){Cackle.mcXHR.abort()
}y(document).unbind(".cackle");
C.channel=window.mcChannel;
Cackle.Utils.bootstrapWidget(true)
}
};
Cackle.Utils.bootstrapWidget();