var c;
function change_data()
{
	var cvs_v=document.getElementById("cvs");
	var nW=parseInt(document.edit.W.value);
	var nH=parseInt(document.edit.H.value);
	for(i=0;i<N;i++)
	{
		if(xs[i]>=nW||ys[i]>=nH)
		{
			alert("範囲外に出る拠点があるため設定できません");
			return false;
		}
	}
	cvs_v.width=parseInt(document.edit.W.value)+cw_ad;
	if(parseInt(document.edit.H.value)<400)
	{
		ch_ad=400-parseInt(document.edit.H.value);
	}
	cvs_v.height=parseInt(document.edit.H.value)+ch_ad;
	c=cvs_v.getContext("2d");
	W=cvs_v.width-cw_ad;
	H=cvs_v.height-ch_ad;
	img=document.edit.img.value;
	mp=parseInt(document.edit.mp.value);
	ep=parseInt(document.edit.ep.value);
	tl=parseInt(document.edit.tl.value);
	bgimg=new Image();
	bgimg.src=document.edit.img.value;
	bgimg.onload=function()
	{
		if(draw_start==false)draw();
	}
}