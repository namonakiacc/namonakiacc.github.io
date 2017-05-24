var cvs;
var c;
if(location.hash==""||!readFragment())sample_load();
gamedata_init();
document.write("<canvas id='game' width='"+Math.max(W,450).toString()+"' height='"+(H+120).toString()+"' style='float:left;'></canvas>");

bgimg.onload=function()
{
	cvs = document.getElementById("game");
	if (!cvs.getContext)
	{
		document.write("Canvasに対応していないので表示できません<BR>");
	}
	else
	{
		c = cvs.getContext("2d");
		draw(0);
	}
}
