window.onkeydown = function(event)
{
	if (event.keyCode == 27)
	{
		if (window.confirm("スタート画面にに戻ってよろしいですか？"))
			window.location.reload();
	}
	else if (event.keyCode==32)
	{
		if(is_started==0)
		{
			is_started=1;
			started_time=Date.now();
			tm = setInterval("draw(1)",40);
		}
	}
	/*
	 * 37 <-
	 * 38 ^
	 * 39 ->
	 * 40 v
	 */
}
var mouseevent_pos=-1;
var click_count=0;
window.onmousedown=function(event)
{
	if(is_started==0)return;
	var onmouse_tmp=document.getElementById("game");
	var onmouse_x=event.pageX-onmouse_tmp.offsetLeft;
	var onmouse_y=event.pageY-onmouse_tmp.offsetTop;
	var onmouse_handled=0;
	for(i=0;i<city_num;i++)
	{
		if((onmouse_x-city_x[i])*(onmouse_x-city_x[i])+(onmouse_y-city_y[i])*(onmouse_y-city_y[i])<=(city_size[i]+7)*(city_size[i]+7))
		{
			if(mouseevent_pos==i)click_count++;
			else mouseevent_pos=i,click_count=1;
//	console.log("flag "+i+"- "+flag[i]+" "+city_power[i]+" "+city_rebels[i]);
		onmouse_handled=1;
		}
	}
	if(onmouse_handled==0)
	{
		for(i=0;i<city_num;i++)for(var tmp_for_j in G[i])
		{
			var j=G[i][tmp_for_j];
			if(onriver[i][j]&&Math.sqrt((city_x[i]-onmouse_x)*(city_x[i]-onmouse_x)+(city_y[i]-onmouse_y)*(city_y[i]-onmouse_y))+Math.sqrt((city_x[j]-onmouse_x)*(city_x[j]-onmouse_x)+(city_y[j]-onmouse_y)*(city_y[j]-onmouse_y))-city_udist[i][j]<=10)
			{
				G[i].splice(tmp_for_j,1);
				for(var tmp_for_i in G[j])
				{
					var i2=G[j][tmp_for_i];
					if(i2==i)G[j].splice(tmp_for_i,1);
				}
				break;
			}
		}
	}
}
window.onmouseup=function(event)
{
	if(is_started==0)return;
	var onmouse_tmp=document.getElementById("game");
	var onmouse_x=event.pageX-onmouse_tmp.offsetLeft;
	var onmouse_y=event.pageY-onmouse_tmp.offsetTop;
	var hozon_mouseup=0;
	for(i=0;i<city_num;i++)
	{
		if((onmouse_x-city_x[i])*(onmouse_x-city_x[i])+(onmouse_y-city_y[i])*(onmouse_y-city_y[i])<=(city_size[i]+7)*(city_size[i]+7))
		{
			if(i==mouseevent_pos)hozon_mouseup=1;
			if(mouseevent_pos>=0)
			{
				var cp_attack;
				if(flag[mouseevent_pos]==PLAYER_ID)cp_attack=city_power[mouseevent_pos];
				else cp_attack=city_rebels[mouseevent_pos];
				//	console.log(" cp "+cp_attack);
				if(cp_attack<2000)return;
				var start_attack_tmp=0;
				var validj=-1;
				for(tmp_for_j in G[i])
				{
					var j=G[i][tmp_for_j];
					if(j==mouseevent_pos)validj=j,start_attack_tmp=1;
				}
				if(start_attack_tmp>0)
				{
					j=validj;
					console.log(click_count);
					if(flag[i]==flag[j])
					{
						if(click_count>=3&&save_power[mouseevent_pos]==1)start_attack(mouseevent_pos,i,PLAYER_ID,cp_attack);
						else if(click_count>=2)start_attack(mouseevent_pos,i,PLAYER_ID,city_power[mouseevent_pos]/2);
						else start_attack(mouseevent_pos,i,PLAYER_ID,2000);
					}
					else
					{
						if(click_count>=3&&save_power[mouseevent_pos]==1)start_attack(mouseevent_pos,i,PLAYER_ID,cp_attack);
						else if(click_count>=2)start_attack(mouseevent_pos,i,PLAYER_ID,city_power[mouseevent_pos]/2);
						else start_attack(mouseevent_pos,i,PLAYER_ID,2000);
					}
				}
			}
		}
	}
	if(hozon_mouseup==0)
	{
		click_count=0;
		mouseevent_pos=-1;
	}
}