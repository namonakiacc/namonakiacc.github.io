function readFragment()
{
	var fragment=location.hash.substring(1).split('&');
	var rf_bit=0;
	var rf_N=0;
	var rf_xs;
	var rf_ys;
	var rf_sz;
	var rf_r1;
	var rf_r2;
	for(var i=0;fragment[i];i++)
	{
		var fp=fragment[i].split('=');
		if(fp[0]=="W")
		{
			W=parseInt(fp[1]);
			if((0<W)==false)return false;
			rf_bit|=1;
		}
		else if(fp[0]=="H")
		{
			H=parseInt(fp[1]);
			if((0<H)==false)return false;
			rf_bit|=2;
		}
		else if(fp[0]=="mp")
		{
			my_s=parseInt(fp[1]);
			if((0<my_s)==false)return false;
			rf_bit|=4;
		}
		else if(fp[0]=="ep")
		{
			enemy_s=parseInt(fp[1]);
			if((0<my_s)==false)return false;
			rf_bit|=8;
		}
		else if(fp[0]=="tl")
		{
			seigen=parseInt(fp[1]);
			if((0<seigen)==false)return false;
			rf_bit|=16;
		}
		else if(fp[0]=="N")
		{
			rf_N=parseInt(fp[1]);
			if((0<rf_N)==false)return false;
			rf_bit|=32;
		}
		else if(fp[0]=="x")
		{
			fpb=fp[1].split(',');
			rf_xs=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				rf_xs[j]=fpb_t;
			}
			rf_bit|=64;
		}
		else if(fp[0]=="y")
		{
			fpb=fp[1].split(',');
			rf_ys=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				rf_ys[j]=fpb_t;
			}
			rf_bit|=128;
		}
		else if(fp[0]=="img")
		{
			bgimg=new Image();
			bgimg.src=decodeURIComponent(fp[1]);
			rf_bit|=256;
		}
		else if(fp[0]=="f")
		{
			flag=new Array(fp[1].length);
			for(j=0;j<flag.length;j++)
			{
				if(fp[1][j]=="A")flag[j]=AI_ID;
				else flag[j]=PLAYER_ID;
			}
			rf_bit|=512;
		}
		else if(fp[0]=="b")
		{
			base_list=new Array(fp[1].length);
			for(j=0;j<flag.length;j++)
			{
				if(fp[1][j]=="A")base_list[j]=AI_ID;
				else if(fp[1][j]=="P")base_list[j]=PLAYER_ID;
				else base_list[j]=-1;
			}
			rf_bit|=1024;
		}
		else if(fp[0]=="sz")
		{
			fpb=fp[1].split(',');
			rf_sz=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<fpb_t&&fpb_t<=12)==false)return false;
				rf_sz[j]=fpb_t;
			}
			rf_bit|=2048;
		}
		else if(fp[0]=="r"&&fp[1]!="")
		{
			fpb=fp[1].split(',');
			if(fpb.length%2==1)return false;
			rf_r1=new Array(fpb.length/2);
			rf_r2=new Array(fpb.length/2);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				if(j%2==0)rf_r1[j/2]=fpb_t;
				else rf_r2[parseInt(j/2)]=fpb_t;
			}
			rf_bit|=4096;
		}
		else if(fp[0]=="r")
		{
			rf_r1=new Array();rf_r2=new Array();
			rf_bit|=4096;
		}
	}
	if(rf_bit!=8191)return false;
	if(rf_N!=rf_xs.length)return false;
	if(rf_N!=rf_ys.length)return false;
	if(rf_N!=rf_sz.length)return false;
	if(rf_N!=base_list.length)return false;
	if(rf_N!=flag.length)return false;
	for(i=0;i<rf_r1.length;i++)
	{
		if(rf_r1[i]>=rf_N)return false;
		if(rf_r2[i]>=rf_N)return false;
	}
	var rf_G=new Array(rf_N);
	for(i=0;i<rf_N;i++)rf_G[i]=new Array();
	for(i=0;i<rf_r1.length;i++)
	{
		var rf_nf=false;
		for(j=0;j<rf_G[rf_r1[i]].length;j++)
		{
			if(rf_G[rf_r1[i]][j]==rf_r2[i])rf_nf=true;
		}
		if(rf_nf)continue;
		rf_G[rf_r1[i]].push(rf_r2[i]);
		rf_G[rf_r2[i]].push(rf_r1[i]);
	}
	
	city=new Array(rf_N);
	for(i=0;i<rf_N;i++)city[i]=new City(rf_xs[i],rf_ys[i],rf_sz[i],rf_G[i]);
	document.getElementById("editlink").href="./edit/index.html"+location.hash;
	return true;
}