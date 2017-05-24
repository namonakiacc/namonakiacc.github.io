window.onkeydown=function(event)
{
	if(event.keyCode == 27)
	{
		if (window.confirm("スタート画面にに戻ってよろしいですか？"))
			window.location.reload();
	}
	else if(event.keyCode==32)
	{
		if(is_started==0)
		{
			is_started=1;
			started_time=Date.now();
			tm=setInterval("draw(1)",40);
		}
	}
}
var mouseevent_pos=-1;
var click_count=0;
var click_time=-1;
window.onmousedown=function(event)
{
	if(is_started==0)return;
	var onmouse_tmp=document.getElementById("game");
	var onmouse_x=event.pageX-onmouse_tmp.offsetLeft;
	var onmouse_y=event.pageY-onmouse_tmp.offsetTop;
	var onmouse_handled=0;
	var now_time=performance.now();
	if(click_time!=-1)console.log(now_time-click_time);
	if(click_time!=-1&&now_time-click_time>=500)
	{
		click_count=0;
	}
	click_time=now_time;
	for(i=0;i<city.length;i++)
	{
		if(dist(onmouse_x,onmouse_y,city[i].x,city[i].y)<=city[i].size+7)
		{
			if(mouseevent_pos==i)click_count++;
			else mouseevent_pos=i,click_count=1;
			onmouse_handled=1;
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
	for(i=0;i<city.length;i++)
	{
		if(dist(onmouse_x,onmouse_y,city[i].x,city[i].y)<=city[i].size+7)
		{
			if(i==mouseevent_pos)hozon_mouseup=1;
			if(mouseevent_pos>=0)
			{
				var cp_attack;
				if(flag[mouseevent_pos]==PLAYER_ID)cp_attack=city_power[mouseevent_pos];
				else cp_attack=city_rebels[mouseevent_pos];
				if(cp_attack<2000)return;
				var start_attack_tmp=0;
				var validj=-1;
				for(tmp_for_j in city[i].road)
				{
					var j=city[i].road[tmp_for_j];
					if(j==mouseevent_pos)validj=j,start_attack_tmp=1;
				}
				if(start_attack_tmp>0)
				{
					j=validj;
					if(flag[i]==flag[j])
					{
						if(click_count>=2&&save_power[mouseevent_pos]==1)start_attack(mouseevent_pos,i,PLAYER_ID,cp_attack);
						else if(click_count>=1)start_attack(mouseevent_pos,i,PLAYER_ID,city_power[mouseevent_pos]/2);
						else start_attack(mouseevent_pos,i,PLAYER_ID,2000);
					}
					else
					{
						if(click_count>=2&&save_power[mouseevent_pos]==1)start_attack(mouseevent_pos,i,PLAYER_ID,cp_attack);
						else if(click_count>=1)start_attack(mouseevent_pos,i,PLAYER_ID,city_power[mouseevent_pos]/2);
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