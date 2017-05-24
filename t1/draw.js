var draw_count=0;
function draw(is_started)
{
	if(is_started)
	{
		draw_count++;
	}
	if(is_started)
	{
		do_attack();
		ai_call();
	}
	DrawRect(0,0,Math.max(W,450),H,192,192,192);
	c.drawImage(bgimg,0,0,bgimg.width,bgimg.height,0,0,W,H);
	for(i=0;i<city.length;i++)
	{
		for(var tmp_for_j in city[i].road)
		{
			var j=city[i].road[tmp_for_j];
			if(i<j)
			{
				DrawLine(city[i].x,city[i].y,city[j].x,city[j].y,4,243,152,0);
			}
		}
	}
	for(i=0;i<city.length;i++)
	{
		var city_i_r=Math.max(3,city[i].size);
		DrawCircle(city[i].x,city[i].y,city_i_r-1,255,255,255);
		var tmp1=city_power[i]+city_rebels[i];
		var p1,p2;
		if(flag[i]==PLAYER_ID)p1=city_power[i],p2=city_rebels[i];
		else p1=city_rebels[i],p2=city_power[i];
		if(p1>=p2)
		{
			if(p1>0)DrawCircle(city[i].x,city[i].y,Math.min(15,Math.max(3,Math.pow(p1*5/1000,0.35)))-1,255,0,0);
			if(p2>0)DrawCircle(city[i].x,city[i].y,Math.min(15,Math.max(3,Math.pow(p2*5/1000,0.35)))-1,192,64,64);
		}
		else
		{
			if(p2>0)DrawCircle(city[i].x,city[i].y,Math.min(15,Math.max(3,Math.pow(p2*5/1000,0.35)))-1,128,128,128);
			if(p1>0)DrawCircle(city[i].x,city[i].y,Math.min(15,Math.max(3,Math.pow(p1*5/1000,0.35)))-1,192,64,64);
		}
	}
	for(i=0;i<city.length;i++)
	{
		var city_i_r=Math.max(3,city[i].size);
		DrawCircleLine(city[i].x,city[i].y,city_i_r,0,0,0);
		if(base_list[i]!=-1)DrawCircleLine(city[i].x,city[i].y,city_i_r+1,0,0,0);
	}
	for(i=0;i<attack_list_size;i++)if(attack_power[i]>1)
	{
		var atd_x=city[attack_from[i]].x+(city[attack_to[i]].x-city[attack_from[i]].x)*attack_status[i]/city_udist[attack_from[i]][attack_to[i]];
		var atd_y=city[attack_from[i]].y+(city[attack_to[i]].y-city[attack_from[i]].y)*attack_status[i]/city_udist[attack_from[i]][attack_to[i]];
		if(city_udist[attack_from[i]][attack_to[i]]<attack_status[i])continue;
		if(attack_id[i]==PLAYER_ID)DrawCircle(atd_x,atd_y,Math.min(15,Math.pow(attack_power[i]*5/1000,0.35)),255,0,0);
		else DrawCircle(atd_x,atd_y,Math.min(15,Math.max(1,Math.pow(attack_power[i]*5/1000,0.35))),128,128,128);
	}
	DrawRect(0,H,Math.max(W,450),120,0,0,0);
	DrawRect(20,H+20,Math.max(W,450)-40,80,255,255,255);
	
	c.fillStyle="rgb(0,0,0)";
	c.textAlign="start";
	c.textBaseline="top";
	c.font="bold 20px'MS Gothic'";
	
	my_power=0;
	enemy_power=0;
	var my_city=0,enemy_city=0;
	for(i=0;i<attack_list_size;i++)
	{
		if(attack_id[i]==PLAYER_ID)my_power+=attack_power[i];
		else enemy_power+=attack_power[i];
	}
	for(i=0;i<city.length;i++)
	{
		if(flag[i]==PLAYER_ID)my_power+=city_power[i],enemy_power+=city_rebels[i];
		else my_power+=city_rebels[i],enemy_power+=city_power[i];
		
		if(city_power[i]>city_rebels[i]*1.4)
		{
			if(flag[i]==PLAYER_ID)my_city+=city[i].size;
			else enemy_city+=city[i].size;
		}
	}
	if(ai_call_num>e_start)for(i=0;i<city.length;i++)
	{
		for(cmp=1200000;cmp>=2000;cmp=cmp/2)
		{
			if(city_power[i]>city_rebels[i]*2.5&&my_power<cmp&&flag[i]==PLAYER_ID)
			{
				if(city[i].size<=5)
				{
					if(city_power[i]<=3000)city_power[i]=city_power[i]*1.00002;
					city_power[i]=city_power[i]*(1.0+ 0.000002*city[i].size);
				}
				if(city[i].size>=6)city_power[i]=city_power[i]*(1.0+ 0.000007*city[i].size);
				if(city[i].size>=10)city_power[i]=city_power[i]*(1.0+0.000021*city[i].size);
				if(city[i].size>=12)city_power[i]=city_power[i]*(1.0+0.000035*city[i].size);
			}
		}
		for(cmp=1200000;cmp>=2000;cmp=cmp*0.8)
		{
			if(cmp==1000000)continue;
			if(cmp>600000)cmp=cmp*1.25/2;
			if(cmp<600000)cmp*=1.2;
			if(cmp<200000)cmp*=1.03;
			if(city_power[i]>city_rebels[i]*2.5&&enemy_power<cmp&&flag[i]==AI_ID)
			{
				if(city[i].size<=5)
				{
					if(city_power[i]<=3000)city_power[i]=city_power[i]*1.00002;
					city_power[i]=city_power[i]*(1.0+ 0.000002*city[i].size);
				}
				if(city[i].size>=6)city_power[i]=city_power[i]*(1.0+ 0.000005*city[i].size);
				if(city[i].size>=10)city_power[i]=city_power[i]*(1.0+0.000015*city[i].size);
				if(city[i].size>=12)city_power[i]=city_power[i]*(1.0+0.000025*city[i].size);
			}
		}
	}
	
	if(is_started)
	{
		c.fillText("あなたの得点"+my_city+"　　あなたの戦力: "+parseInt(my_power),20,H+20,400);
		c.fillText("相手の得点"+enemy_city+"　　　相手の戦力: "+parseInt(enemy_power),20,H+45,400);
		var now_time=Date.now();
		var less=seigen-(now_time-started_time);
		if(parseInt(enemy_power)<=0)less=0;
		if(less<=0)
		{
			is_end=1;
			clearInterval(tm);
			console.log("CLEAR!");
			draw(0);
			return;
		}
		var output="残り時間: ";
		output+=(parseInt(less/600000)%10);
		output+=(parseInt(less/60000)%10);
		output+=":";
		output+=(parseInt(less/10000)%6);
		output+=(parseInt(less/1000)%10);
		c.fillText(output,20,H+70,600);
		if(my_power>enemy_power)
		{
			for(i=0;i<city.length;i++)if(city[i].size>1&&flag[i]==AI_ID)city_power[i]*=1.000;
		}
		if(enemy_power<=my_power*0.6&&enemy_power<=2000000)
		{
			for(i=0;i<city.length;i++)if(flag[i]==AI_ID)city_power[i]*=1.0+(0.00002*city[i].size);
		}
	}
	else if(is_end==1)
	{
		c.fillText("お疲れ様でした。",20,H+20,400);
		c.fillText("あなたの得点"+my_city+"　　あなたの戦力: "+parseInt(my_power),20,H+45,400);
		c.fillText("相手の得点"+enemy_city+"　　　相手の戦力: "+parseInt(enemy_power),20,H+70,400);
	}
	else
	{
		c.fillText("スペースキーを押してスタート！",20,H+30,400);
	}
}
