var Cackle=Cackle||{};
Cackle.protocol=("https:"==window.location.protocol)?"https:":"http:";
Cackle.host=Cackle.host||"cackle.me";
Cackle.origin=Cackle.protocol+"//"+Cackle.host;
Cackle.cluster=[Cackle.host,"a."+Cackle.host,"b."+Cackle.host];
var env="prod";
Cackle.Library=Cackle.Library||{appendToRoot:function(a){(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)
},loadJs:function(c,b,d){var a=document.createElement("script");
a.type="text/javascript";
a.src=c;
a.async=b;
if(d){if(typeof a.onload!="undefined"){a.onload=d
}else{if(typeof a.onreadystatechange!="undefined"){a.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){d()
}}
}else{a.onreadystatechange=a.onload=function(){var e=a.readyState;
if(!e||/loaded|complete/.test(e)){d()
}}
}}}this.appendToRoot(a)
},loadCss:function(a){var b=document.createElement("link");
b.rel="stylesheet";
b.type="text/css";
b.href=a;
this.appendToRoot(b)
},endsWith:function(b,a){return b.indexOf(a,this.length-a.length)!==-1
},load:function(d,f,a){a=a?("?v="+a):"";
var b=d+"/widget/";
for(var c=0;
c<f.length;
c++){var e=f[c];
if(this.endsWith(e,".js")){Cackle.Library.loadJs(b+"js/"+e+a,false)
}else{Cackle.Library.loadCss(b+"css/"+e+a)
}}},Login:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["login.js","login-min.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","cookie.js","storage.js","login.js","login-min.css"])
}}},Comment:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment.js","comment-min.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","time.js","cookie.js","social.js","storage.js","login.js","sso.js","jquery.js","stream.js","easyXDM.min.js","comment.js","comment-min.css"])
}}},Comment2:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment2.js","comment2.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","time.js","cookie.js","social.js","storage.js","login2.js","sso.js","jquery.js","doT.min.js","stream.js","easyXDM.min.js","comment2.js","login2.css","comment2.css"])
}}},CommentDiscuss:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment-discuss.js","comment-discuss.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","jquery.js","doT.min.js","comment-discuss.js","fontawesome.css","comment-discuss.css"])
}}},CommentAdmin:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment-adm.js","comment-adm.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","time.js","cookie.js","media.js","notify.js","jquery.js","ua-parser.min.js","chosen.jquery.min.js","stream.js","easyXDM.min.js","doT.min.js","comment-adm.js","chosen.css","comment-adm.css"])
}}},CommentCount:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment-count.js"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","comment-count.js"])
}}},CommentRecent:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["comment-recent.js","comment-recent.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","time.js","comment-recent.js","comment-recent.css"])
}}},Chat:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["chat.js","chat.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","cookie.js","time.js","storage.js","login.js","jquery.js","baron.js","stream.js","chat.js","login-min.css","chat.css"])
}}},ChatAdmin:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["chat-adm.js","chat-adm.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","cookie.js","time.js","storage.js","login.js","jquery.js","ua-parser.min.js","stream.js","chat-adm.js","cleanslate.css","chat-adm.css"])
}}},Review:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["review.js","review.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","cookie.js","storage.js","time.js","social.js","login.js","sso.js","jquery.js","doT.min.js","easyXDM.min.js","jquery.autosize.min.js","review.js","login-min.css","review.css"])
}}},ReviewAdmin:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["review-adm.js","review-adm.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","time.js","cookie.js","media.js","notify.js","jquery.js","ua-parser.min.js","chosen.jquery.min.js","stream.js","easyXDM.min.js","doT.min.js","review-adm.js","chosen.css","review-adm.css"])
}}},Poll:{isLoaded:false,load:function(a){this.isLoaded=true;
if(env=="prod"){Cackle.Library.load(a,["poll.js","poll.css"],"cbd25fb12d70")
}else{Cackle.Library.load(a,["utils.js","cookie.js","storage.js","login.js","jquery.js","media.js","poll-adm.js","poll.js","poll.css"])
}}}};
Cackle.initHosts=function(){var b=Cackle.getHost();
for(var a=0;
a<cackle_widget.length;
a++){var c=cackle_widget[a].widget;
if(c.indexOf("Chat")>-1){b=Cackle.host
}if(!cackle_widget[a].host||cackle_widget[a].host.indexOf("http")<0){cackle_widget[a].host=Cackle.protocol+"//"+(cackle_widget[a].host||b)
}}};
Cackle.getHost=function(){if(env=="prod"){function a(c,b){return Math.floor(Math.random()*(b-c+1))+c
}return Cackle.cluster[a(0,Cackle.cluster.length-1)]
}else{return Cackle.host
}};
Cackle.bootstrap=function(c){Cackle.initHosts();
for(var a=0;
a<cackle_widget.length;
a++){var b=cackle_widget[a].widget;
if(!Cackle.Library[b].isLoaded){Cackle.Library[b].load(cackle_widget[a].host)
}else{if(c){if(Cackle.mcXHR){Cackle.mcXHR.abort()
}Cackle.Utils.bootstrapWidget(c)
}}}};
Cackle.bootstrap();