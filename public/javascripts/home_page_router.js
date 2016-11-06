// 这里用于调用其它api进行查询


function search_button_more()//点击more，选择查询引擎
{
	document.getElementById("player1").style.visibility="hidden";//隐藏列表
	document.getElementById("engine_box").style.visibility="visible";//显示
}
function engine_back()
{
	document.getElementById("engine_box").style.visibility="hidden";//隐藏列表
	document.getElementById("player1").style.visibility="visible";//显示
}



function chose_api()
{
	var engine_id = event.srcElement.id;
	api_type = engine_id.substring(2);
	//alert(api_type);
	if( "1" ==api_type)
	{
		search_button();//baidu查找
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