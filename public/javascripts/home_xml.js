//此js文件用于向服务器端请求数据，使用jquery，ajax（post，get），通过js获取后台数据并静态刷新网页内容

function searc_detail()
{
	jQuery(document).ready(function(){ 
		
		search_link2="http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.song.downWeb&bit=flc&songid=" + song_Id;
	    $.ajax({
				 type: "get",
				 async: false,
				 url: 'http://127.0.0.1:3000/',
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