//����qq's api


function search_something_3() //������Ϣqq
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
				 
					 document.getElementById("recommend_list").innerHTML = "";//���div����
					 
					 i=0;
					 pic_flag=true;//
					 if("undefined" != typeof(json.data))
					 {
						 for (;json.data.song.list[i];)
						 {
						   str = json.data.song.list[i].f;
						   var strs = new Array();
						   strs = str.split("|"); //�ַ��ָ�;
						   d = strs.length - 5;//�����Ϊ���ֵ�ַ
						   p = strs.length - 3;//������ΪͼƬ��ַ
						   song_Id = strs[d];
						   t = strs[p];
						   a = t.length -1;
						   b = t.length -2;
						   t1 = t.charAt(a);
						   t2 = t.charAt(b);
						   song_Name = json.data.song.list[i].fsong;
						   //airtist_Id = i;//��Ҫ����div���ݲ��Ҿ���id
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

function search_airtist_3()//������������Ϣ�ٶ�
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
						document.getElementById("detail_box").innerHTML='���֣�'+ json.name + '<br>'+'<br>'+
						'������'+ json.country + '<br>'+'<br>'+
						'����������'+ json.songs_total + '<br>'+'<br>'+
						'��˾��'+ json.company;
						if("undefined" != typeof(json.intro) && "" != json.intro)
						{
							document.getElementById("lrc_box").innerHTML = json.intro;
						}
						else
						{
							//document.getElementById("lrc_box").setAttribute("style","textAlign=center");
							document.getElementById("lrc_box").innerHTML = "��Ǹ��δ�ҵ�������Ϣ";
						}
						//document.getElementById("detail_box").append('<p>���֣�'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>ר����'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>����ʱ�䣺'+ json.songinfo.publishtime +'</p>');
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
							 alert("δ�ҵ���Ϣ");
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

function get_song_address_3()//��ȡ�������ص�ַ�ٶ�
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
						alert("�˸������ܲ���");
					}
					
					if("undefined" != typeof(song_play_Url) && "" != song_play_Url)
					{
						document.getElementById('player1').play();//�Զ�����
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

function searc_detail_3()//������ϸ��Ϣ�ٶ�
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
						document.getElementById("detail_box").innerHTML='�������ƣ�'+ json.attrs.title + '<br>'+'<br>'+
						'���֣�'+ json.attrs.singer + '<br>'+'<br>'+
						'ר����'+ json.attrs.tracks + '<br>'+'<br>'+
						'����ʱ�䣺'+ json.attrs.pubdate;
						//document.getElementById("detail_box").append('<p>���֣�'+ json.songinfo.author +'</p>');
						//document.getElementById("detail_box").append('<p>ר����'+ json.songinfo.album_title +'</p>');
						//document.getElementById("detail_box").append('<p>����ʱ�䣺'+ json.songinfo.publishtime +'</p>');
						song_pic_Url = json.image;
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

function show_lrc_3()//���Ҹ�ʰٶ�
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
						 text = "δ�ҵ������Ϣ"
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

function set_airtist_3()//��ѯ������Ϣ��������a_idδ���ã����в�ѯ�ٶ�
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
						document.getElementById("r_button_list").style.visibility="hidden";//�����б�
						document.getElementById("search_result").style.visibility="visible";//��ʾ
						document.getElementById("back_button").innerHTML="�� ��";//��ʾ
						document.getElementById("recommend_list").innerHTML = "";//���div����
						show_info_box();//����div
						insert_lrc();//������ʿ�
						search_airtist();
					 }
					 else
					 {
						 alert("δ�ҵ���Ϣ");
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

function play_music_3()//��������
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
		alert("�˸������ܲ���");
	}
	
	if("undefined" != typeof(song_play_Url) && "" != song_play_Url)
	{
		document.getElementById('player1').play();//�Զ�����
		alert("ok2");
	}
	song_play_Url=""
}

function get_songid_3(songid)//��ȡ����id
{
	song_Id_temp = event.srcElement.id;
	song_Id = song_Id_temp.substring(5);
	song_play_Url = song_Id;
	//alert(song_Id);
}

function get_airtistid_3(songid)//��ȡ������id
{
	airtist_Id_temp = event.srcElement.id;
	airtist_Id = airtist_Id_temp.substring(5);
	//alert(song_Id);
}

function button_list_3()//ѡ��ͬ���͸���
{
	more=20;
	change_button();
	document.getElementById(buttonid).setAttribute('class', 'active_button');
	callback_song_list();
}

function more_song_3()//ѡ��������������100
{
	if(more<100)
	{
		more=more+20;
		callback_song_list();
	}
	else
	{
		alert("����������");
	}
}

var m=0;
function put_recommend_boxs_3()//��̬��Ӱ񵥳�Ա
{
	song_Name = song_Name;
    var rbox = document.createElement("div"); //���ȴ���һ��div
    var rbox_id='r_box'+m;
    rbox.setAttribute("id",rbox_id); //�����div��id
    //rbox.setAttribute("onclick","have_try()"); //�������(��ת)
    rbox.setAttribute('class', 'recommend_box');
    rbox.style.cssFloat="left";
    m=m+1;
    document.getElementById('recommend_list').appendChild(rbox);
    put_song_2(rbox_id);
    //document.getElementById("r_button_list").style.visibility="hidden";//����
    //document.getElementById("typediv1").style.visibility="visible";//��ʾ
}
var s=100;
var a=100;
var p=100;
function put_song_3(rbox_id)  //��̬���ͼƬ,����������������
{
	var song_pic = document.createElement("img"); //���ȴ���һ��ͼƬ
    var s_pic_id="p"+p+"_"+song_play_Url;
    song_pic.setAttribute("id",s_pic_id); //�����ͼƬ��id
    song_pic.setAttribute("src",song_pic_Url);
    song_pic.setAttribute("onclick","play_music_3()"); //�������(��ת)
    song_pic.setAttribute('class', 'pic_style');
    song_pic.style.marginTop = '20px';
    song_pic.style.marginLeft = '0px';
	p=p+1;
    document.getElementById(rbox_id).appendChild(song_pic);
    //document.getElementById(ujuser_id).innerHTML=n;
	   
	   
    var song_title = document.createElement("button"); //���ȴ���һ��div
    var s_id="s"+s+"_"+song_Id;
    song_title.setAttribute("id",s_id); //�����div��id
    //song_title.setAttribute("src",song_pic_Url);
    song_title.setAttribute("onclick","detail_button_3()"); //�������(��ת) !!!!!!!!
    song_title.setAttribute('class', 's_name_style');
    song_title.style.marginTop = '20px';
    song_title.style.marginLeft = '0px';
	s=s+1;
    document.getElementById(rbox_id).appendChild(song_title);
    document.getElementById(s_id).innerHTML= song_Name;
	//alert(song_Name);
	
	
    var airtist_title = document.createElement("button"); //���ȴ���һ��div
    var a_id="a"+a+"_"+airtist_Id;
	a_Id_for_change = a_id;
    airtist_title.setAttribute("id",a_id); //�����div��id
    //airtist_title.setAttribute("src","test.jpg")
    //airtist_title.setAttribute("onclick","detail_button_3()"); //�������(��ת)
    airtist_title.setAttribute('class', 'a_name_style');
    airtist_title.style.marginTop = '0px';
    airtist_title.style.marginLeft = '0px';
    //airtist_title.style.font-size = '12px';
	a=a+1;
    document.getElementById(rbox_id).appendChild(airtist_title);
    document.getElementById(a_id).innerHTML = airtist_Name;
	//alert(airtist_Name);
}

function change_button_3()//�����ť��ı�class�����ĸ���ͬ���͵����֣����ްٶ�
{
	document.getElementById("type=1").setAttribute('class', 'type_button');
	document.getElementById("type=2").setAttribute('class', 'type_button');
	document.getElementById("type=21").setAttribute('class', 'type_button');
	document.getElementById("type=12").setAttribute('class', 'type_button');
	buttonid = event.srcElement.id;
	search_type = buttonid;
	document.getElementById(buttonid).setAttribute('class', 'active_button');
}

function search_button_3()//������ťbaidu if ���ڵ�һ�����漴��
{
	document.getElementById("r_button_list").style.visibility="hidden";//�����б�
	document.getElementById("search_result").style.visibility="visible";//��ʾ
	document.getElementById("back_button").innerHTML="�� ��";//��ʾ
	search_something_3();
	//set_info();
}

function back_to_3()//���ذ�ť
{
	if(document.getElementById("back_button").innerHTML=="�� ��")
	{
		document.getElementById("r_button_list").style.visibility="visible";//��ʾ�б�
		document.getElementById("search_result").style.visibility="hidden";//����
		document.getElementById("back_button").innerHTML="�� ��";//����
		more=20;
		callback_song_list();
	}
	else
	{
		more_song();
	}
}

function detail_button_3()//����������ƻ�ȡ��ϸ��Ϣ
{
	get_songid();
	document.getElementById("r_button_list").style.visibility="hidden";//�����б�
	document.getElementById("search_result").style.visibility="visible";//��ʾ
	document.getElementById("back_button").innerHTML="�� ��";//��ʾ
	document.getElementById("recommend_list").innerHTML = "";//���div����
	show_info_box();//����div
	searc_detail();//������Ϣ������
	insert_lrc();//������ʿ�
	show_lrc();//���Ҹ�ʲ�����
}

function put_return_button()//���ص���������Ϣ
{
	//var return_list_button = document.createElement("button");
	//return_list_button.setAttribute("id","return_list_button");
	//return_list_button.setAttribute("class","button_back");
	//return_list_button.("onclick","");
	//document.getElementById("recommend_list").appendChild(return_list_button);
	//document.getElementById("return_list_button").innerHTML = "back";
}

function return_list_button()//���ص���������Ϣ
{
	//document.getElementById("recommend_list").innerHTML = "";//���div����
	//show_info_box();//����div
}

function detail_button_artist_3()//������������ƻ�ȡ��ϸ��Ϣ
{
	get_airtistid();
	document.getElementById("r_button_list").style.visibility="hidden";//�����б�
	document.getElementById("search_result").style.visibility="visible";//��ʾ
	document.getElementById("back_button").innerHTML="�� ��";//��ʾ
	document.getElementById("recommend_list").innerHTML = "";//���div����
	show_info_box();//����div
	insert_lrc();//������ʿ�
	search_airtist();
}

function show_info_box_3()//������Ϣ��
{
	var info_box = document.createElement("div"); //���ȴ���div
    info_box.setAttribute("id","info_box"); //�����ͼƬ��id
    info_box.setAttribute("src",song_pic_Url);
    //info_box.setAttribute("onclick","play_music()"); //�������(��ת)
    document.getElementById("recommend_list").appendChild(info_box);
	
	var pic_box = document.createElement("img"); //���ȴ���һ��ͼƬ
    pic_box.setAttribute("id","pic_box"); //�����ͼƬ��id
    //pic_box.setAttribute("src",song_pic_Url);
    pic_box.setAttribute("onclick","get_song_address()"); //�������(��ת)
    document.getElementById("info_box").appendChild(pic_box);
	
	var detail_box = document.createElement("div"); //���ȴ���һ��ͼƬ
    detail_box.setAttribute("id","detail_box"); //�����ͼƬ��id
    //pic_box.setAttribute("onclick","play_music()"); //�������(��ת)
    document.getElementById("info_box").appendChild(detail_box);
	
	var lrc_list_box = document.createElement("div"); //���ȴ���һ��ͼƬ
    lrc_list_box.setAttribute("id","lrc_list_box"); //�����ͼƬ��id
    //pic_box.setAttribute("onclick","play_music()"); //�������(��ת)
    document.getElementById("info_box").appendChild(lrc_list_box);
}

function insert_lrc_3()//�����ʿ�
{
	var lrc_box = document.createElement("textarea"); //���ȴ���textare
    lrc_box.setAttribute("id","lrc_box"); //�����ͼƬ��id
    lrc_box.setAttribute("readonly","readonly");
    //pic_box.setAttribute("onclick","play_music()"); //�������(��ת)
    document.getElementById("lrc_list_box").appendChild(lrc_box);
	document.getElementById("lrc_box").readonly = "readonly";
}

function change_airtist_id_3()//�ı�id
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