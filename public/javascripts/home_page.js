// JavaScript Document
//说明：动态添加div时，图片，歌曲名，艺术家id分别为 -- p'i'_xxx, s'i'_xxx, a'i'_xxx
//已用变量：i,m,a,s,p
//百度api：
var song_Name;//歌曲名称
var song_Id;//歌曲id
var song_Lrc_link;//歌曲歌词链接
var airtist_Name;//艺术家名称
var airtist_Id;//艺术家id
var song_pic_Url;//歌曲图片链接
var song_play_Url="";//歌曲播放链接
var airtist_pic_Url;//艺术家图片链接
var search_type="type=1";//音乐类型
var search_info;//查找信息
var searc_machine="baidu";//搜索使用api类型
var more=20;//
var bit;//比特率
var limits=0;//调用api限制次数
//var s_id_list = new Array();//设置一个用于暂时存储当前页面内歌曲id的数组
//var a_id_list = new Array();//设置一个用于暂时存储当前页面内艺术家id的数组
var a_Id_for_change;
var here_id;

var api_type=1;//百度为1，豆瓣为2，qq为3，（默认使用百度音乐api，可播放音乐，其余只有查询功能）

function callback_song_list()//获取歌单百度
{
	jQuery(document).ready(function(){ 
	
		  search_link="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&"+ search_type +"&size="+more+"&offset=0";
	 
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
				 
					 document.getElementById("recommend_list").innerHTML = "";//清空div内容
					 
					 i=0;
					 for (;json.song_list[i];)
					 {
					   song_Id = json.song_list[i].song_id;
					   song_Name = json.song_list[i].title;
					   airtist_Id = json.song_list[i].ting_uid;
					   airtist_Name = json.song_list[i].artist_name;
					   song_pic_Url = json.song_list[i].pic_big;
					   put_recommend_boxs();
					   i++;
					 }
					 s=a=p=100;

				 },
				 error: function(){
					 if(limits<3)
					 {
						 callback_song_list();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail");
						 limits=0;
					 }
				 }
			 });
	});
}

function search_something() //查找信息百度
{
	jQuery(document).ready(function(){ 
	
		search_info = document.getElementById("search_input").value;
		//alert(search_info);
		search_link="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.search.catalogSug&query="+search_info;
		//alert(search_link);
	 
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
				 
					 document.getElementById("recommend_list").innerHTML = "";//清空div内容
					 
					 i=0;
					 j=0;
					 pic_flag=true;//
					 if("undefined" != typeof(json.song))
					 {
						 for (;json.song[i];)
						 {
						   song_Id = json.song[i].songid;
						   song_Name = json.song[i].songname;
						   airtist_Id = i;//需要根据div内容查找具体id
						   airtist_Name = json.song[i].artistname;
						   if(true==pic_flag)//设置标志
						   {
								k=0;
								if("undefined" != typeof(json.album))
								{
									for (;json.album[j];)//遍历专辑查找图片
									{
										if(json.album[j].artistname == json.song[i].artistname)
										{
											if("undefined" != typeof(json.album[j].artistpic)){pic_big=false;}
											song_pic_Url = json.album[j].artistpic;
											k=1;
										}
										j++;
									}
								}
								
								j=0;
								
								if ("undefined" != typeof(json.artist))
								{
									for (;json.artist[j];)//遍历艺术家查找图片
									{
										if(json.artist[j].artistname == json.song[i].artistname)
										{
											if("undefined" != typeof(json.artist[j].artistpic)){pic_big=false;}
											song_pic_Url = json.artist[j].artistpic;
											k=1;
										}
										j++;
									}
								}
								
								if(0==k){song_pic_Url = "/images/default.png";}
								
						   }
	/* 					   if(false ==pic_flag)
						   {
							   song_pic_Url = "test.jpg";
						   } */
						   put_recommend_boxs();
						   document.getElementById(a_Id_for_change).setAttribute('onclick', 'change_airtist_id()');
						   i++;
						 }
					 }
					 s=a=p=100;
					 
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 search_something();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail2");
						 limits=0;
					 }
				 }
			 });
	});
}

function search_airtist()//查找艺术家信息百度
{
	jQuery(document).ready(function(){ 
		
		search_link2="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.artist.getInfo&tinguid=" + airtist_Id;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link2,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
						
					if("undefined" != typeof(json))
					 {
						document.getElementById("detail_box").innerHTML='歌手：'+ json.name + '<br>'+'<br>'+
						'地区：'+ json.country + '<br>'+'<br>'+
						'歌曲总数：'+ json.songs_total + '<br>'+'<br>'+
						'公司：'+ json.company;
						if("undefined" != typeof(json.intro) && "" != json.intro)
						{
							document.getElementById("lrc_box").innerHTML = json.intro;
						}
						else
						{
							//document.getElementById("lrc_box").setAttribute("style","textAlign=center");
							document.getElementById("lrc_box").innerHTML = "抱歉，未找到具体信息";
						}
						//document.getElementById("detail_box").append('<p>歌手：'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>专辑：'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>发行时间：'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.avatar_big;
						document.getElementById("pic_box").setAttribute("src",song_pic_Url);
						
					 }
					 else
					 {
							 if(limits<3)
						 {
							 search_airtist();
							 limits=limits+1;
						 }
						 else
						 {
							 alert("未找到信息");
							 limits=0;
						 }
					 }
						
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 search_airtist();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail3");
						 limits=0;
					 }
					 
				 }
			 });
	});
}

function get_song_address()//获取歌曲下载地址百度
{
	jQuery(document).ready(function(){ 
		
		search_link2="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.downWeb&bit=flc&songid=" + song_Id;
		//alert(song_Id);
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link2,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
				 
					i=0;
					bit=0;
					if("undefined" != typeof(json.bitrate))
					{
						for (;json.bitrate[i];)
						{
						  
							  
							  if( "" !== json.bitrate[i].file_link)
							  {
								  if(json.bitrate[i].file_bitrate >= bit)
								  {
									  song_play_Url = json.bitrate[i].file_link;
									  //alert(song_play_Url);
									  bit = json.bitrate[i].file_bitrate;
									  //alert(bit);
								  }
								  
							  }
						  
						  
						  i++;
						}
					}
					
					if( "" !== song_play_Url)
					{
						document.getElementById("player1").setAttribute("src",song_play_Url);
					}
					else
					{
						alert("此歌曲不能播放");
					}
					
					if("undefined" != typeof(song_play_Url) && "" != song_play_Url)
					{
						document.getElementById('player1').play();//自动播放
					}
					song_play_Url=""
					
				 },
				 error: function(){
					 if(limits<3)
					 {
						 get_song_address();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fai4");
						 limits=0;
					 }
				 }
			 });
	});
}

function searc_detail()//查找详细信息百度
{
	jQuery(document).ready(function(){ 
		
		search_link2="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.downWeb&bit=flc&songid=" + song_Id;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link2,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
					 
					 if("undefined" != typeof(json.songinfo))
					 {
						document.getElementById("detail_box").innerHTML='歌曲名称：'+ json.songinfo.title + '<br>'+'<br>'+
						'歌手：'+ json.songinfo.author + '<br>'+'<br>'+
						'专辑：'+ json.songinfo.album_title + '<br>'+'<br>'+
						'发行时间：'+ json.songinfo.publishtime;
						//document.getElementById("detail_box").append('<p>歌手：'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>专辑：'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>发行时间：'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.songinfo.pic_big;
						document.getElementById("pic_box").setAttribute("src",song_pic_Url);
					 }
					 else
					 {
						 alert("未找到信息");
					 }
					 
				 },
				 error: function(){
					 if(limits<3)
					 {
						 searc_detail();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail5");
						 limits=0;
					 }
				 }
			 });
	});
}

function show_lrc()//查找歌词百度
{
	jQuery(document).ready(function(){ 
		
		search_link3="http://tingapi.ting.baidu.com/v1/restserver/ting?format=xml&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=" + song_Id;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link3,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(xml){
					 
					 if("undefined" != typeof(xml))
					 {
						 //alert("ok1");
						var xmlDom=new ActiveXObject("Microsoft.XMLDOM");
						xmlDom.loadXML(xml);
						var txt = xmlDom.getElementsByTagName("song_lry_response_elt")[0].childNodes[0].nodeValue;
						try{txt = txt+"\r\n"+xmlDom.getElementsByTagName("song_lry_response_elt")[1].childNodes[0].nodeValue;}
						catch(e){alert("sorry");}
						//text = song[0].getElementsByTagName("song_lry_response_elt")[0].childNodes[0].nodeValue;
						//text = json.lrcContent;
					 }
					 else
					 {
						 txt = "未找到歌词信息"
					 }
					 
					 document.getElementById("lrc_box").innerHTML = txt;
					 
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 show_lrc();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail6");
						 limits=0;
					 }
				 }
			 });
	});
}

function set_airtist()//查询歌手信息，搜索后a_id未设置，进行查询百度
{
	jQuery(document).ready(function(){ 
		
		search_link3="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.search.catalogSug&query=" + search_info;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link3,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
					 
					 if("undefined" != typeof(json.artist))
					 {
						 //alert("ok1");
						i=0;
						for(;json.artist[i];)
						{
							//alert("ok2");
							if(search_info==json.artist[i].artistname)
							{
								airtist_Id = json.artist[i].artistid;
								document.getElementById(here_id).setAttribute('id', airtist_Id);
								alert(airtist_Id);
							}
							i=i+1;
						}
					 }
					 //alert("ok3");
					 if(here_id!= airtist_Id )
					 {
						document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
						document.getElementById("search_result").style.visibility="visible";//显示
						document.getElementById("back_button").innerHTML="返 回";//显示
						document.getElementById("recommend_list").innerHTML = "";//清空div内容
						show_info_box();//创建div
						insert_lrc();//创建歌词框
						search_airtist();
					 }
					 else
					 {
						 alert("未找到信息");
					 }
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 set_airtist();
						 limits=limits+1;
					 }
					 else
					 {
						 alert("fail7");
						 limits=0;
					 }
				 }
			 });
	});
}

function play_music()//播放音乐
{
	get_songid();//首先获取歌曲id
	//alert(song_Id);
	get_song_address();//调用函数查找歌曲地址
}

function get_songid(songid)//获取歌曲id
{
	song_Id_temp = event.srcElement.id;
	song_Id = song_Id_temp.substring(5);
	//alert(song_Id);
}

function get_airtistid(songid)//获取艺术家id
{
	airtist_Id_temp = event.srcElement.id;
	airtist_Id = airtist_Id_temp.substring(5);
	//alert(song_Id);
}

function button_list()//选择不同类型歌曲
{
	more=20;
	change_button();
	document.getElementById(buttonid).setAttribute('class', 'active_button');
	callback_song_list();
}

function more_song()//选择更多歌曲，上线100
{
	if(more<100)
	{
		more=more+20;
		callback_song_list();
	}
	else
	{
		alert("最大搜索结果");
	}
}

var m=0;
function put_recommend_boxs()  //动态添加榜单成员
{
	song_Name = song_Name;
    var rbox = document.createElement("div"); //首先创建一个div
    var rbox_id='r_box'+m;
    rbox.setAttribute("id",rbox_id); //定义该div的id
    //rbox.setAttribute("onclick","have_try()"); //点击函数(跳转)
    rbox.setAttribute('class', 'recommend_box');
    rbox.style.cssFloat="left";
    m=m+1;
    document.getElementById('recommend_list').appendChild(rbox);
    put_song(rbox_id);
    //document.getElementById("r_button_list").style.visibility="hidden";//隐藏
    //document.getElementById("typediv1").style.visibility="visible";//显示
}

var s=100;
var a=100;
var p=100;
function put_song(rbox_id)  //动态添加图片,歌曲名，艺术家名
{
	var song_pic = document.createElement("img"); //首先创建一个图片
    var s_pic_id="p"+p+"_"+song_Id;
    song_pic.setAttribute("id",s_pic_id); //定义该图片的id
    song_pic.setAttribute("src",song_pic_Url);
    song_pic.setAttribute("onclick","play_music()"); //点击函数(跳转)
    song_pic.setAttribute('class', 'pic_style');
    song_pic.style.marginTop = '20px';
    song_pic.style.marginLeft = '0px';
	p=p+1;
    document.getElementById(rbox_id).appendChild(song_pic);
    //document.getElementById(ujuser_id).innerHTML=n;
	   
	   
    var song_title = document.createElement("button"); //首先创建一个div
    var s_id="s"+s+"_"+song_Id;
    song_title.setAttribute("id",s_id); //定义该div的id
    //song_title.setAttribute("src",song_pic_Url);
    song_title.setAttribute("onclick","detail_button()"); //点击函数(跳转)
    song_title.setAttribute('class', 's_name_style');
    song_title.style.marginTop = '20px';
    song_title.style.marginLeft = '0px';
	s=s+1;
    document.getElementById(rbox_id).appendChild(song_title);
    document.getElementById(s_id).innerHTML= song_Name;
	//alert(song_Name);
	
	
    var airtist_title = document.createElement("button"); //首先创建一个div
    var a_id="a"+a+"_"+airtist_Id;
	a_Id_for_change = a_id;
    airtist_title.setAttribute("id",a_id); //定义该div的id
    //airtist_title.setAttribute("src","test.jpg")
    airtist_title.setAttribute("onclick","detail_button_artist()"); //点击函数(跳转)
    airtist_title.setAttribute('class', 'a_name_style');
    airtist_title.style.marginTop = '0px';
    airtist_title.style.marginLeft = '0px';
    //airtist_title.style.font-size = '12px';
	a=a+1;
    document.getElementById(rbox_id).appendChild(airtist_title);
    document.getElementById(a_id).innerHTML = airtist_Name;
	//alert(airtist_Name);
}

function change_button()//点击按钮后改变class，即四个不同类型的音乐，仅限百度
{
	document.getElementById("type=1").setAttribute('class', 'type_button');
	document.getElementById("type=2").setAttribute('class', 'type_button');
	document.getElementById("type=21").setAttribute('class', 'type_button');
	document.getElementById("type=12").setAttribute('class', 'type_button');
	buttonid = event.srcElement.id;
	search_type = buttonid;
	document.getElementById(buttonid).setAttribute('class', 'active_button');
}

function search_button()//搜索按钮baidu
{
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	search_something();
	//set_info();
}

function back_to()//返回按钮
{
	if(document.getElementById("back_button").innerHTML=="返 回")
	{
		document.getElementById("r_button_list").style.visibility="visible";//显示列表
		document.getElementById("search_result").style.visibility="hidden";//隐藏
		document.getElementById("back_button").innerHTML="更 多";//隐藏
		more=20;
		s=a=p=100;
		callback_song_list();
	}
	else
	{
		more_song();
	}
}

function detail_button()//点击歌曲名称获取详细信息
{
	get_songid();
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	document.getElementById("recommend_list").innerHTML = "";//清空div内容
	show_info_box();//创建div
	searc_detail();//查找信息并更新
	insert_lrc();//创建歌词框
	show_lrc();//查找歌词并更新
}

function put_return_button()//返回到艺术家信息
{
	//var return_list_button = document.createElement("button");
	//return_list_button.setAttribute("id","return_list_button");
	//return_list_button.setAttribute("class","button_back");
	//return_list_button.("onclick","");
	//document.getElementById("recommend_list").appendChild(return_list_button);
	//document.getElementById("return_list_button").innerHTML = "back";
}

function return_list_button()//返回到艺术家信息
{
	//document.getElementById("recommend_list").innerHTML = "";//清空div内容
	//show_info_box();//创建div
}

function detail_button_artist()//点击艺术家名称获取详细信息
{
	get_airtistid();
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	document.getElementById("recommend_list").innerHTML = "";//清空div内容
	show_info_box();//创建div
	insert_lrc();//创建歌词框
	search_airtist();
}

function show_info_box()//创建信息框
{
	var info_box = document.createElement("div"); //首先创建div
    info_box.setAttribute("id","info_box"); //定义该图片的id
    info_box.setAttribute("src",song_pic_Url);
    //info_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("recommend_list").appendChild(info_box);
	
	var pic_box = document.createElement("img"); //首先创建一个图片
    pic_box.setAttribute("id","pic_box"); //定义该图片的id
    //pic_box.setAttribute("src",song_pic_Url);
    pic_box.setAttribute("onclick","get_song_address()"); //点击函数(跳转)
    document.getElementById("info_box").appendChild(pic_box);
	
	var detail_box = document.createElement("div"); //首先创建一个图片
    detail_box.setAttribute("id","detail_box"); //定义该图片的id
    //pic_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("info_box").appendChild(detail_box);
	
	var lrc_list_box = document.createElement("div"); //首先创建一个图片
    lrc_list_box.setAttribute("id","lrc_list_box"); //定义该图片的id
    //pic_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("info_box").appendChild(lrc_list_box);
}

function insert_lrc()//插入歌词框
{
	var lrc_box = document.createElement("textarea"); //首先创建textare
    lrc_box.setAttribute("id","lrc_box"); //定义该图片的id
    lrc_box.setAttribute("readonly","readonly");
    //pic_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("lrc_list_box").appendChild(lrc_box);
	document.getElementById("lrc_box").readonly = "readonly";
}

function change_airtist_id()//改变id
{
	here_id = event.srcElement.id;
	search_info=document.getElementById(here_id).innerHTML;
	set_airtist();
	alert();
}

function have_try()
{
	here_id_temp = event.srcElement.id;
	here_id=here_id_temp.substring(5);
	alert(here_id);
}