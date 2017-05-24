function readFragment()
{
	var fragment=location.hash.substring(1).split('&');
	var rf_bit=0;
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
			mp=parseInt(fp[1]);
			if((0<mp)==false)return false;
			rf_bit|=4;
		}
		else if(fp[0]=="ep")
		{
			ep=parseInt(fp[1]);
			if((0<ep)==false)return false;
			rf_bit|=8;
		}
		else if(fp[0]=="tl")
		{
			tl=parseInt(parseInt(fp[1])/1000);
			if((0<tl)==false)return false;
			rf_bit|=16;
		}
		else if(fp[0]=="N")
		{
			N=parseInt(fp[1]);
			if((0<N)==false)return false;
			rf_bit|=32;
		}
		else if(fp[0]=="x")
		{
			fpb=fp[1].split(',');
			xs=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				xs[j]=fpb_t;
			}
			rf_bit|=64;
		}
		else if(fp[0]=="y")
		{
			fpb=fp[1].split(',');
			ys=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				ys[j]=fpb_t;
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
			f="";
			for(j=0;j<fp[1].length;j++)
			{
				if(fp[1][j]=="A")f+="A";
				else f+="P";
			}
			rf_bit|=512;
		}
		else if(fp[0]=="b")
		{
			b="";
			for(j=0;j<fp[1].length;j++)
			{
				if(fp[1][j]=="A")b+="A";
				else if(fp[1][j]=="P")b+="P";
				else b+="K";
			}
			rf_bit|=1024;
		}
		else if(fp[0]=="sz")
		{
			fpb=fp[1].split(',');
			sz=new Array(fpb.length);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<fpb_t&&fpb_t<=12)==false)return false;
				sz[j]=fpb_t;
			}
			rf_bit|=2048;
		}
		else if(fp[0]=="r"&&fp[1]!="")
		{
			fpb=fp[1].split(',');
			if(fpb.length%2==1)return false;
			r1=new Array(fpb.length/2);
			r2=new Array(fpb.length/2);
			for(j=0;j<fpb.length;j++)
			{
				var fpb_t=parseInt(fpb[j]);
				if((0<=fpb_t)==false)return false;
				if(j%2==0)r1[j/2]=fpb_t;
				else r2[parseInt(j/2)]=fpb_t;
			}
			rf_bit|=4096;
		}
		else if(fp[0]=="r")
		{
			r1=new Array();r2=new Array();
			rf_bit|=4096;
		}
	}
	if(rf_bit!=8191)return false;
	if(N!=xs.length)return false;
	if(N!=ys.length)return false;
	if(N!=sz.length)return false;
	if(N!=b.length)return false;
	if(N!=f.length)return false;
	for(i=0;i<r1.length;i++)
	{
		if(r1[i]>=N)return false;
		if(r2[i]>=N)return false;
	}
	for(i=0;i<xs.length;i++)
	{
		if(xs[i]<=0)return false;
		if(xs[i]>=W)return false;
		if(ys[i]<=0)return false;
		if(ys[i]>=H)return false;
	}
	document.edit.W.value=W.toString();
	document.edit.H.value=H.toString();
	document.edit.img.value=bgimg.src;
	document.edit.mp.value=mp.toString();
	document.edit.ep.value=ep.toString();
	document.edit.tl.value=tl.toString();
	change_data();
	return true;
}