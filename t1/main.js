var is_started=0;
var tm;
var is_end=0;
var keyevents=new Array();
var started_time;

var attack_count=0;
var attack_list_size=0;
var attack_from=new Array();
var attack_to=new Array();
var attack_id=new Array();
var attack_power=new Array();
var attack_status=new Array();

function start_attack(from,to,id,power)
{
	if(id==AI_ID&&flag[from]==flag[to]&&flag[from]==AI_ID&&city_power[to]+power>Math.max(0.3*enemy_power,600000))return;
	if(id==AI_ID&&base_list[to]==PLAYER_ID)return;
	if(id==PLAYER_ID&&base_list[to]==AI_ID)return;
	var sa_power;
	if(flag[from]==id)sa_power=city_power[from];
	else sa_power=city_rebels[from];
	power=parseInt((power+999)/1000)*1000;
	if(id==PLAYER_ID&&power>sa_power-2.0)power=sa_power-2.0;
	if(id==AI_ID&&power>sa_power-2000)power=sa_power-2000;
	if(id==AI_ID&&sa_power-power<2000*city[from].size*city[from].size)return;
	if(power<0)return;
	
	if(flag[from]==id)city_power[from]-=power;
	else city_rebels[from]-=power;
	attack_from.push(from);
	attack_to.push(to);
	attack_id.push(id);
	attack_power.push(power);
	attack_status.push(0);
	attack_list_size++;
}
var ai_call_num=0;
function ai_call()
{
	ai_call_num++;
	if(ai_call_num<=e_start)return;
	for(__=0;__<2;__++)
	{
	
	for(i=0;i<city.length;i++)ai_tmp[i]=10000;
	for(i=0;i<city.length;i++)if(flag[i]==AI_ID)
	{
		if(city_rebels[i]>city_power[i]*0.5)continue;
		if(city_power[i]<1000*city[i].size*city[i].size)continue;
		ai_usd[i]=0;
		for(var tmp_for_j in city[i].road)
		{
			var j=city[i].road[tmp_for_j];
			if(base_list[j]==PLAYER_ID)continue;
			if(flag[j]==PLAYER_ID)
			{
				if(attack_time[j]<ai_call_num-3&&city_rebels[j]<city_power[j]*0.6/*&&(city_power[j]<20000||city_power[j]-city_rebels[j]<city_power[j]*0.9)*/)
				{
					if(besieged[j]==0&&city_power[j]>city_power[i]*2.0*save_power[i])continue;
					if(besieged[j]>0&&city_power[j]*save_power[j]>besieged[j]*1.0)continue;
					attack_time[j]=ai_call_num;
					if(city_power[j]*save_power[j]<city_power[i]+city_rebels[j])
						start_attack(i,j,1,Math.max(4000,Math.min(city_power[i]/2,city_power[j]*1.2)));
					ai_usd[i]=1;
					ai_tmp[i]=1;
				}
				else if(city_rebels[j]<city_power[j]*0.6)ai_tmp[i]=320;
				
				
				ai_tmp[i]-=(city[i].size)*0.001;
			}
			else if(city_power[j]==0)
			{
				start_attack(i,j,1,2000);
				ai_usd[i]=1;
			}
			else if(city_rebels[i]>0)ai_usd[i]=1;
		}
	}	
	for(_=0;_<city.length;_++)for(k=0;k<city.length;k++)for(var tmp_for_j in city[k].road)
	{
		var j=city[k].road[tmp_for_j];
		if(base_list[j]==PLAYER_ID||base_list[k]==PLAYER_ID)continue;
		ai_tmp[j]=Math.min(ai_tmp[j],ai_tmp[k]+1);
	}
	for(i=0;i<city.length;i++)if(flag[i]==AI_ID)
	{
		if(city_power[i]<1000*city[i].size*city[i].size)continue;
		if(ai_usd[i]==0)
		{
			var ccc=0;
			for(var tmp_for_j in city[i].road)
			{
				var j=city[i].road[tmp_for_j];
				if(base_list[j]==PLAYER_ID)continue;
				if(ai_tmp[i]>ai_tmp[j])ccc++;
			}
			for(var tmp_for_j in city[i].road)
			{
				var j=city[i].road[tmp_for_j];
				if(base_list[j]==PLAYER_ID)continue;
				if(ai_tmp[i]>ai_tmp[j])
				{
					if(ccc==1)
					{
						if(flag[j]==PLAYER_ID&&save_power[j]>2&&save_power[j]*city_power[j]>besieged2[j])continue;
						start_attack(i,j,AI_ID,Math.max(3000,city_power[i]*0.1));
					}
					else ccc--;
				}
			}
		}
	}
	for(i=0;i<city.length;i++)if(flag[i]==PLAYER_ID&&city_rebels[i]>1&&city_rebels[i]<city_power[i]*0.5&&i<49)
	{
		var sp=0,se=0;
		for(var tmp_for_j in city[i].road)
		{
			var j=city[i].road[tmp_for_j];
			if(base_list[j]==PLAYER_ID)continue;
			if(flag[j]==PLAYER_ID)sp+=city_power[j],se+=city_rebels[j];
			else sp+=city_rebels[j],se+=city_power[j];
		}
		sp+=city_power[j];
		se+=city_rebels[j];
		if(se<sp*0.5)
		{
			var nxt=-1;
			for(var tmp_for_j in city[i].road)
			{
				var j=city[i].road[tmp_for_j];
				if(base_list[j]==PLAYER_ID)continue;
				if((nxt==-1||ai_tmp[nxt]<ai_tmp[j])&&flag[j]==AI_ID)nxt=j;
			}
			if(nxt==-1)continue;
			start_attack(i,nxt,AI_ID,city_rebels[i]);
		}
	}
	
	
	}
}
function do_attack()
{
	attack_count++;
	var do_attack_ptr=0;
	if(attack_count%5!=0)return;
	for(i=0;i<attack_list_size;i++)
	{
		if(attack_power[i]==0)
		{
			attack_from.splice(i,1);
			attack_to.splice(i,1);
			attack_id.splice(i,1);
			attack_power.splice(i,1);
			attack_status.splice(i,1);
			attack_list_size--;
			i--;
			continue;		
		}
		attack_status[i]+=25;
		var f=attack_from[i],t=attack_to[i];
		if(attack_power[i]>0.0001&&city_udist[f][t]<=attack_status[i])
		{
			if(attack_id[i]==flag[t])
			{
				city_power[t]+=attack_power[i];
				attack_power[i]=0;
			}
			else
			{
				city_rebels[t]+=attack_power[i];
				attack_power[i]=0;
			}
		}
	}
	if(attack_count%5==0)do_rebels();
}
function do_rebels()
{
	for(i=0;i<city.length;i++)
	{
		besieged2[i]=besieged[i];
		besieged[i]=0;
		
		var rebels_tmp=0;
		var ssmm=0;
		var safe_area=0;
		for(tmp_for_j in city[i].road)
		{
			var j=city[i].road[tmp_for_j];
			if(flag[i]==flag[j])rebels_tmp=1;
			else ssmm+=city_power[j];
			if(flag[i]!=flag[j])safe_area=1;
		}
		if(rebels_tmp==0&&ai_call_num>e_start&&city_power[i]>0)
		{
			var del=parseInt(city_power[i]*(0.98+(0.00125*city[i].size)));
			if(del==0)del=1;
			del=city_power[i]-del;
			if(save_power[i]>1)del/=save_power[i];
			city_power[i]-=del;
			del*=besiege_pw;
			var cnt=0;
			for(tmp_for_j in city[i].road)cnt++;
			for(tmp_for_j in city[i].road)
			{
				var j=city[i].road[tmp_for_j];
				city_power[j]+=del/cnt;
			}
			besieged[i]=ssmm;
		}
		if(safe_area==0&&ai_call_num>e_start&&city_rebels[i]>0)
		{
			var del=parseInt(city_rebels[i]*(0.98+(0.00125*city[i].size)));
			if(del==0)del=1;
			del=city_rebels[i]-del;
			city_rebels[i]-=del;
			del*=0.3;
			
			var cnt=0;
			for(tmp_for_j in city[i].road)cnt++;
			for(tmp_for_j in city[i].road)
			{
				var j=city[i].road[tmp_for_j];
				city_power[j]+=del/cnt;
			}
		}
		
		if(city_rebels[i])
		{
			var tmp1=Math.max(0,parseInt(city_power[i]/40*Math.random()))*save_power[i]*Math.random();
			var tmp2=Math.max(0,parseInt(city_rebels[i]/40*Math.random()));
			city_rebels[i]-=tmp1;
			city_power[i]-=tmp2;
			if(city_rebels[i]<500)city_rebels[i]=0;
			if(city_rebels[i]<0)city_rebels[i]=0;
			if(city_power[i]<0)city_power[i]=0;
			if(city_power[i]<city_rebels[i]*0.5)
			{
				var ttt=city_power[i];
				city_power[i]=city_rebels[i];
				city_rebels[i]=ttt;
				flag[i]=1-flag[i];
			}
			city_rebels[i]+=tmp2*0.3;
			city_power[i]+=tmp1*0.3/save_power[i];
			if(city_rebels[i]<500)city_rebels[i]=0;
			if(city_rebels[i]<0)city_rebels[i]=0;
			if(city_power[i]<0)city_power[i]=0;
			if(city_rebels[i]==0)city_power[i]=Math.max(city_power[i],500);
		}
	}
}