// �������ڵ�������api���в�ѯ


function search_button_more()//���more��ѡ���ѯ����
{
	document.getElementById("player1").style.visibility="hidden";//�����б�
	document.getElementById("engine_box").style.visibility="visible";//��ʾ
}
function engine_back()
{
	document.getElementById("engine_box").style.visibility="hidden";//�����б�
	document.getElementById("player1").style.visibility="visible";//��ʾ
}



function chose_api()
{
	var engine_id = event.srcElement.id;
	api_type = engine_id.substring(2);
	//alert(api_type);
	if( "1" ==api_type)
	{
		search_button();//baidu����
	}
	if ( "2" == api_type )
	{
		search_button_2();
	}
	if ( "3" == api_type )
	{
		search_button_3();
	}
	if ( "4" == api_type )
	{
		search_button_4();
	}
	
	engine_back();
}