//调用qq's api


function search_something_3() //查找信息qq
{
	jQuery(document).ready(function(){ 
	
		search_info = document.getElementById("search_input").value;
		//alert(search_info);
		search_link="http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=30&aggr=1&cr=1&loginUin=0&format=jsonp&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w="+search_info;
		//alert(search_link);
	 
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"callback",
				 success: function(json){
				 
					 document.getElementById("recommend_list").innerHTML = "";//清空div内容
					 
					 i=0;
					 pic_flag=true;//
					 if("undefined" != typeof(json.data))
					 {
						 for (;json.data.song.list[i];)
						 {
						   str = json.data.song.list[i].f;
						   var strs = new Array();
						   strs = str.split("|"); //字符分割;
						   d = strs.length - 5;//第五个为音乐地址
						   p = strs.length - 3;//第三个为图片地址
						   song_Id = strs[d];
						   t = strs[p];
						   a = t.length -1;
						   b = t.length -2;
						   t1 = t.charAt(a);
						   t2 = t.charAt(b);
						   song_Name = json.data.song.list[i].fsong;
						   //airtist_Id = i;//需要根据div内容查找具体id
						   airtist_Name = json.data.song.list[i].fsinger;	   
						   temp_link = "http://imgcache.qq.com/music/photo/mid_album_90/"+ t2 +"/"+ t1 +"/"+strs[p]+".jpg";
						   song_pic_Url = temp_link;
						   song_play_Url = 'http://stream3.qqmusic.qq.com/A000'+strs[d]+'.mp3';
						   put_recommend_boxs_3();
						   i++;
						 }
					 }
					 s=a=p=100;
					 
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 search_something_3();
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

function search_airtist_3()//查找艺术家信息百度
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

function get_song_address_3()//获取歌曲下载地址百度
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

function searc_detail_3()//查找详细信息百度
{
	jQuery(document).ready(function(){ 
		
		search_link2="https://api.douban.com/v2/music/" + song_Id;
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
						document.getElementById("detail_box").innerHTML='歌曲名称：'+ json.attrs.title + '<br>'+'<br>'+
						'歌手：'+ json.attrs.singer + '<br>'+'<br>'+
						'专辑：'+ json.attrs.tracks + '<br>'+'<br>'+
						'发行时间：'+ json.attrs.pubdate;
						//document.getElementById("detail_box").append('<p>歌手：'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>专辑：'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>发行时间：'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.image;
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

function show_lrc_3()//查找歌词百度
{
	jQuery(document).ready(function(){ 
		
		search_link3="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.lry&songid=" + song_Id;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: search_link3,
				 dataType: "jsonp",
				 jsonp: "callback",
				 jsonpCallback:"flightHandler",
				 success: function(json){
					 
					 if("undefined" != typeof(json.lrcContent))
					 {
						text = json.lrcContent;
					 }
					 else
					 {
						 text = "未找到歌词信息"
					 }
					 
					 document.getElementById("lrc_box").innerHTML = text;
					 
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

function set_airtist_3()//查询歌手信息，搜索后a_id未设置，进行查询百度
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

function play_music_3()//播放音乐
{
	song_play_Url_t = event.srcElement.id;
	song_play_Url = song_play_Url_t.substring(5);
	alert(song_play_Url);
	if( "" !== song_play_Url)
	{
		document.getElementById("player1").setAttribute("src",song_play_Url);
		alert("ok1");
	}
	else
	{
		alert("此歌曲不能播放");
	}
	
	if("undefined" != typeof(song_play_Url) && "" != song_play_Url)
	{
		document.getElementById('player1').play();//自动播放
		alert("ok2");
	}
	song_play_Url=""
}

function get_songid_3(songid)//获取歌曲id
{
	song_Id_temp = event.srcElement.id;
	song_Id = song_Id_temp.substring(5);
	song_play_Url = song_Id;
	//alert(song_Id);
}

function get_airtistid_3(songid)//获取艺术家id
{
	airtist_Id_temp = event.srcElement.id;
	airtist_Id = airtist_Id_temp.substring(5);
	//alert(song_Id);
}

function button_list_3()//选择不同类型歌曲
{
	more=20;
	change_button();
	document.getElementById(buttonid).setAttribute('class', 'active_button');
	callback_song_list();
}

function more_song_3()//选择更多歌曲，上线100
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
function put_recommend_boxs_3()//动态添加榜单成员
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
    put_song_2(rbox_id);
    //document.getElementById("r_button_list").style.visibility="hidden";//隐藏
    //document.getElementById("typediv1").style.visibility="visible";//显示
}
var s=100;
var a=100;
var p=100;
function put_song_3(rbox_id)  //动态添加图片,歌曲名，艺术家名
{
	var song_pic = document.createElement("img"); //首先创建一个图片
    var s_pic_id="p"+p+"_"+song_play_Url;
    song_pic.setAttribute("id",s_pic_id); //定义该图片的id
    song_pic.setAttribute("src",song_pic_Url);
    song_pic.setAttribute("onclick","play_music_3()"); //点击函数(跳转)
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
    song_title.setAttribute("onclick","detail_button_3()"); //点击函数(跳转) !!!!!!!!
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
    //airtist_title.setAttribute("onclick","detail_button_3()"); //点击函数(跳转)
    airtist_title.setAttribute('class', 'a_name_style');
    airtist_title.style.marginTop = '0px';
    airtist_title.style.marginLeft = '0px';
    //airtist_title.style.font-size = '12px';
	a=a+1;
    document.getElementById(rbox_id).appendChild(airtist_title);
    document.getElementById(a_id).innerHTML = airtist_Name;
	//alert(airtist_Name);
}

function change_button_3()//点击按钮后改变class，即四个不同类型的音乐，仅限百度
{
	document.getElementById("type=1").setAttribute('class', 'type_button');
	document.getElementById("type=2").setAttribute('class', 'type_button');
	document.getElementById("type=21").setAttribute('class', 'type_button');
	document.getElementById("type=12").setAttribute('class', 'type_button');
	buttonid = event.srcElement.id;
	search_type = buttonid;
	document.getElementById(buttonid).setAttribute('class', 'active_button');
}

function search_button_3()//搜索按钮baidu if 放在第一个里面即可
{
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	search_something_3();
	//set_info();
}

function back_to_3()//返回按钮
{
	if(document.getElementById("back_button").innerHTML=="返 回")
	{
		document.getElementById("r_button_list").style.visibility="visible";//显示列表
		document.getElementById("search_result").style.visibility="hidden";//隐藏
		document.getElementById("back_button").innerHTML="更 多";//隐藏
		more=20;
		callback_song_list();
	}
	else
	{
		more_song();
	}
}

function detail_button_3()//点击歌曲名称获取详细信息
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

function detail_button_artist_3()//点击艺术家名称获取详细信息
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

function show_info_box_3()//创建信息框
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

function insert_lrc_3()//插入歌词框
{
	var lrc_box = document.createElement("textarea"); //首先创建textare
    lrc_box.setAttribute("id","lrc_box"); //定义该图片的id
    lrc_box.setAttribute("readonly","readonly");
    //pic_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("lrc_list_box").appendChild(lrc_box);
	document.getElementById("lrc_box").readonly = "readonly";
}

function change_airtist_id_3()//改变id
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