var selected=-1;
function dist(dist_x1,dist_y1,dist_x2,dist_y2){return Math.sqrt((dist_x1-dist_x2)*(dist_x1-dist_x2)+(dist_y1-dist_y2)*(dist_y1-dist_y2));}
function rec_in(ri_x1,ri_y1,ri_x2,ri_y2,ri_px,ri_py){return ri_x1<=ri_px&&ri_px<=ri_x2&&ri_y1<=ri_py&&ri_py<=ri_y2;}
var f_lock=0;
var flk_t=-1;
var f_mode=0;
var f_tmp_v=-1;
window.onmousedown=function(event)
{
	if(draw_start)
	{
	
	var onmouse_tmp=document.getElementById("cvs");
	var onmouse_x=event.pageX-onmouse_tmp.offsetLeft;
	var onmouse_y=event.pageY-onmouse_tmp.offsetTop;
	if(f_mode==0&&selected==-1&&0<=onmouse_x&&onmouse_x<=W&&0<=onmouse_y&&onmouse_y<=H)
	{
		var hozon_mouseup=0;
		for(i=0;i<xs.length;i++)
		{
			if(dist(onmouse_x,onmouse_y,xs[i],ys[i])<=sz[i]+7)
			{
				selected=i;
			}
		}
	}
	if(f_mode==0&&selected==-1)
	{
		if(rec_in(W+20,90,W+120,110,onmouse_x,onmouse_y))
		{
			xs.push(20);
			ys.push(20);
			sz.push(6);
			N+=1;
			f+="P";
			b+="K";
			selected=N-1;
		}
		if(rec_in(W+20,120,W+120,140,onmouse_x,onmouse_y))
		{
			make();
		}
	}
	else if(f_mode==0&&selected!=-1)
	{
		var f_lock_las=f_lock;
		if(rec_in(W+118,92,W+118+44,92+24,onmouse_x,onmouse_y))f=f.substr(0,selected)+"P"+f.substr(selected+1);
		if(rec_in(W+168,92,W+168+44,92+24,onmouse_x,onmouse_y))f=f.substr(0,selected)+"A"+f.substr(selected+1);
		if(rec_in(W+120,130,W+140,150,onmouse_x,onmouse_y)&&sz[selected]>1)sz[selected]-=1,f_lock|=16;
		if(rec_in(W+180,130,W+200,150,onmouse_x,onmouse_y)&&sz[selected]<12)sz[selected]+=1,f_lock|=32;
		if(rec_in(W+118,162,W+118+44,162+24,onmouse_x,onmouse_y))b=b.substr(0,selected)+"K"+b.substr(selected+1);
		if(rec_in(W+168,162,W+168+44,162+24,onmouse_x,onmouse_y))b=b.substr(0,selected)+f.substr(selected,1)+b.substr(selected+1);
		if(rec_in(W+120,210,W+140,230,onmouse_x,onmouse_y)&&xs[selected]>1)xs[selected]-=1,f_lock|=1;
		if(rec_in(W+180,210,W+200,230,onmouse_x,onmouse_y)&&xs[selected]+1<W)xs[selected]+=1,f_lock|=2;
		if(rec_in(W+120,245,W+140,265,onmouse_x,onmouse_y)&&ys[selected]>1)ys[selected]-=1,f_lock|=4;
		if(rec_in(W+180,245,W+200,265,onmouse_x,onmouse_y)&&ys[selected]+1<H)ys[selected]+=1,f_lock|=8;
		if(rec_in(W+20,280,W+120,300,onmouse_x,onmouse_y))
		{
			f_mode=1;
			f_tmp_v=selected;
		}
		if(rec_in(W+20,310,W+120,330,onmouse_x,onmouse_y))
		{
			for(i=0;i<r1.length;i++)
			{
				if(r1[i]==selected||r2[i]==selected)
				{
					r1.splice(i,1);
					r2.splice(i,1);
					i--;
				}
				else
				{
					if(r1[i]>selected)r1[i]-=1;
					if(r2[i]>selected)r2[i]-=1;
				}
			}
			N-=1;
			xs.splice(selected,1);
			ys.splice(selected,1);
			b=b.substr(0,selected)+b.substr(selected+1);
			f=f.substr(0,selected)+f.substr(selected+1);
			
			sz.splice(selected,1);
			
			selected=-1;
		}
		if(rec_in(W+20,340,W+120,360,onmouse_x,onmouse_y))
		{
			selected=-1;
		}
		if(f_lock_las!=f_lock)flk_t=performance.now();
	}
	else if(f_mode==1)
	{
		for(i=0;i<xs.length;i++)
		{
			if(i!=selected&&dist(onmouse_x,onmouse_y,xs[i],ys[i])<=sz[i]+7)
			{
				var r_s=i;
				var r_t=selected;
				var finded=-1;
				for(j=0;j<r1.length;j++)
				{
					if(r_s==r1[j]&&r_t==r2[j])finded=j;
					if(r_s==r2[j]&&r_t==r1[j])finded=j;
				}
				if(finded==-1)
				{
					r1.push(r_s);
					r2.push(r_t);
				}
				else
				{
					r1.splice(finded,1);
					r2.splice(finded,1);
				}
			}
		}
		if(rec_in(W+20,310,W+120,330,onmouse_x,onmouse_y))
		{
			f_mode=0;
		}
	}
	
	}
}
window.onmouseup=function(event)
{
	var onmouse_tmp=document.getElementById("cvs");
	var om_x=event.pageX-onmouse_tmp.offsetLeft;
	var om_y=event.pageY-onmouse_tmp.offsetTop;
	f_lock=0;
	if(f_mode==0&&selected!=-1)
	{
		if(0<om_x&&om_x<W&&0<om_y&&om_y<H)
		{
			xs[selected]=om_x;
			ys[selected]=om_y;
		}
	}
}
var mm_tx=-128;
var mm_ty=-128;
window.onmousemove=function(event)
{
	var onmouse_tmp=document.getElementById("cvs");
	mm_tx=event.pageX-onmouse_tmp.offsetLeft;
	mm_ty=event.pageY-onmouse_tmp.offsetTop;
}