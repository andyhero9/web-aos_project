//��js�ļ���������������������ݣ�ʹ��jquery��ajax��post��get����ͨ��js��ȡ��̨���ݲ���̬ˢ����ҳ����

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
						document.getElementById("detail_box").innerHTML='�������ƣ�'+ json.songinfo.title + '<br>'+'<br>'+
						'���֣�'+ json.songinfo.author + '<br>'+'<br>'+
						'ר����'+ json.songinfo.album_title + '<br>'+'<br>'+
						'����ʱ�䣺'+ json.songinfo.publishtime;
						//document.getElementById("detail_box").append('<p>���֣�'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>ר����'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>����ʱ�䣺'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.songinfo.pic_big;
						document.getElementById("pic_box").setAttribute("src",song_pic_Url);
					 }
					 else
					 {
						 alert("δ�ҵ���Ϣ");
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