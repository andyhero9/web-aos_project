//调用豆瓣api


function search_something_2() //查找信息豆瓣
{
	jQuery(document).ready(function(){ 
	
		search_info = document.getElementById("search_input").value;
		//alert(search_info);
		search_link="https://api.douban.com/v2/music/search?q="+search_info;
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
					 pic_flag=true;//
					 if("undefined" != typeof(json.musics))
					 {
						 for (;json.musics[i];)
						 {
						   song_Id = json.musics[i].id;
						   song_Name = json.musics[i].attrs.title;
						   //airtist_Id = i;//需要根据div内容查找具体id
						   if("undefined" != typeof(json.musics[i].attrs.version) && ""!= typeof(json.musics[i].attrs.version))
							{
							   airtist_Name = json.musics[i].attrs.version;
							}
						   else
						   {
							   airtist_Name = "default";
						   }//
						   song_pic_Url = json.musics[i].image;
						   put_recommend_boxs_2();
						   i++;
						 }
					 }
					 s=a=p=100;
					 
				 },
				 error: function(){
					 
					 if(limits<3)
					 {
						 search_something_2();
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



function searc_detail_2()//查找详细信息豆瓣
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
					 
					 if("undefined" != typeof(json.attrs))
					 {
						document.getElementById("detail_box").innerHTML='名称：'+ json.attrs.title + '<br>'+'<br>'+
						'歌手：'+ json.attrs.singer + '<br>'+'<br>'+
						'发行时间：'+ json.attrs.pubdate;
						//document.getElementById("detail_box").append('<p>歌手：'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>专辑：'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>发行时间：'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.image;
						document.getElementById("pic_box").setAttribute("src",song_pic_Url);
						document.getElementById("lrc_list_box").innerHTML = "信息："+ '<br>'+'<br>'+json.summary + '<br>'+'<br>'+
						'专辑列表：'+ '<br>' + '<br>' + json.attrs.tracks;
						
					 }
					 else
					 {
						 alert("未找到信息");
					 }
					 
				 },
				 error: function(){
					 if(limits<3)
					 {
						 searc_detail_2();
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


function get_songid_2(songid)//获取歌曲id
{
	song_Id_temp = event.srcElement.id;
	song_Id = song_Id_temp.substring(5);
	//alert(song_Id);
}

var m=0;
function put_recommend_boxs_2()//动态添加榜单成员
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
function put_song_2(rbox_id)  //动态添加图片,歌曲名，艺术家名
{
	var song_pic = document.createElement("img"); //首先创建一个图片
    var s_pic_id="p"+p+"_"+song_Id;
    song_pic.setAttribute("id",s_pic_id); //定义该图片的id
    song_pic.setAttribute("src",song_pic_Url);
    //song_pic.setAttribute("onclick","play_music()"); //点击函数(跳转)
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
    song_title.setAttribute("onclick","detail_button_2()"); //点击函数(跳转) !!!!!!!!
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
    //airtist_title.setAttribute("onclick","detail_button_2()"); //点击函数(跳转)
    airtist_title.setAttribute('class', 'a_name_style');
    airtist_title.style.marginTop = '0px';
    airtist_title.style.marginLeft = '0px';
    //airtist_title.style.font-size = '12px';
	a=a+1;
    document.getElementById(rbox_id).appendChild(airtist_title);
    document.getElementById(a_id).innerHTML = airtist_Name;
	//alert(airtist_Name);
}

function search_button_2()//搜索按钮baidu if 放在第一个里面即可
{
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	search_something_2();
	//set_info();
}

function detail_button_2()//点击歌曲名称获取详细信息
{
	get_songid_2();
	document.getElementById("r_button_list").style.visibility="hidden";//隐藏列表
	document.getElementById("search_result").style.visibility="visible";//显示
	document.getElementById("back_button").innerHTML="返 回";//显示
	document.getElementById("recommend_list").innerHTML = "";//清空div内容
	show_info_box_2();//创建div
	insert_lrc_2();//创建歌词框
	searc_detail_2();//查找信息并更新
}

function show_info_box_2()//创建信息框
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
	lrc_list_box.style.paddingTop = '45px';
	lrc_list_box.style.paddingRight = '45px';
	lrc_list_box.style.color= '#666';
    document.getElementById("info_box").appendChild(lrc_list_box);
	//document.getElementById("lrc_list_box").style.padding.top = 10px;
	//document.getElementById(testbt).style.color = #00f;
}

function insert_lrc_2()//插入歌词框
{
	var lrc_box = document.createElement("textarea"); //首先创建textare
    lrc_box.setAttribute("id","lrc_box"); //定义该图片的id
    lrc_box.setAttribute("readonly","readonly");
    //pic_box.setAttribute("onclick","play_music()"); //点击函数(跳转)
    document.getElementById("lrc_list_box").appendChild(lrc_box);
	document.getElementById("lrc_box").readonly = "readonly";
}

function have_try()
{
	here_id_temp = event.srcElement.id;
	here_id=here_id_temp.substring(5);
	alert(here_id);
}