var city;
var city_power;
var city_rebels;
var my_power=0;
var enemy_power=0;
var player_num;
var PLAYER_ID=0;
var AI_ID=1;
var flag;
var city_udist;
var c_s=0;
var besiege_pw=0.9;
var e_start=60;
var bgimg=new Image();
var attack_time;
var my_s;
var enemy_s;
var seigen;
var besieged;
var besieged2;
var save_power;
var ai_tmp;
var ai_usd;
var base_list;
function gamedata_init()
{
	city_rebels=new Array(city.length);
	for(i=0;i<city.length;i++)city_rebels[i]=0;
	city_udist=new Array(city.length);
	for(i=0;i<city.length;i++)
	{
		city_udist[i]=new Array(city.length);
		for(j=0;j<city.length;j++)
		{
			var dx=city[i].x-city[j].x;
			var dy=city[i].y-city[j].y;
			city_udist[i][j]=Math.sqrt(dx*dx+dy*dy);
		}
	}
	
	attack_time=new Array(city.length);
	for(i=0;i<city.length;i++)attack_time[i]=0;
	
	city_power=new Array(city.length);
	for(i=0;i<city.length;i++)
	{
		city_power[i]=city[i].size*city[i].size*2000;
		if(flag[i]==PLAYER_ID)my_power+=city_power[i];
		else enemy_power+=city_power[i];
	}
	besieged=new Array(city.length);
	besieged2=new Array(city.length);
	save_power=new Array(city.length);
	for(i=0;i<city.length;i++)save_power[i]=1;
	
	for(i=0;i<city.length;i++)
	{
		if(flag[i]==PLAYER_ID)city_power[i]*=my_s/my_power;
		else city_power[i]*=enemy_s/enemy_power;
		city_power[i]=parseInt(city_power[i]);
	}
	my_power=0;
	enemy_power=0;
	for(i=0;i<city.length;i++)
	{
		if(flag[i]==PLAYER_ID)my_power+=city_power[i];
		else enemy_power+=city_power[i];
	}
	for(i=0;i<city.length;i++)
	{
		if(flag[i]==PLAYER_ID)
		{
			if(my_power<my_s)my_power+=1,city_power[i]+=1;
			if(my_power>my_s)my_power-=1,city_power[i]-=1;
		}
		else
		{
			if(enemy_power<enemy_s)enemy_power+=1,city_power[i]+=1;
			if(enemy_power>enemy_s)enemy_power-=1,city_power[i]-=1;
		}
	}
	
	ai_tmp=new Array(city.length);
	ai_usd=new Array(city.length);
}