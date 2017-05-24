function DrawRect(drawrect_ax,drawrect_ay,drawrect_w,drawrect_h,drawrect_r,drawrect_g,drawrect_b)
{
	c.fillStyle="rgb("+drawrect_r+","+drawrect_g+","+drawrect_b+")";
	c.fillRect(drawrect_ax,drawrect_ay,drawrect_w,drawrect_h);
}
function DrawCircle(drawcircle_x,drawcircle_y,drawcircle_R,drawcircle_r,drawcircle_g,drawcircle_b)
{
	c.fillStyle="rgb("+drawcircle_r+","+drawcircle_g+","+drawcircle_b+")";
	c.beginPath();
	c.arc(drawcircle_x,drawcircle_y,drawcircle_R,0,Math.PI*2,false);
	c.fill();
}
function DrawCircleLine(drawcircle_x,drawcircle_y,drawcircle_R,drawcircle_r,drawcircle_g,drawcircle_b)
{
	c.strokeStyle="rgb("+drawcircle_r+","+drawcircle_g+","+drawcircle_b+")";
	c.lineWidth=1;
	c.beginPath();
	c.arc(drawcircle_x,drawcircle_y,drawcircle_R,0,Math.PI*2,false);
	c.stroke();
}
function DrawLine(drawline_ax,drawline_ay,drawline_bx,drawline_by,drawline_w,drawline_r,drawline_g,drawline_b)
{
	c.strokeStyle="rgb("+drawline_r+","+drawline_g+","+drawline_b+")";
	c.lineWidth=drawline_w;
	c.beginPath();
	c.moveTo(drawline_ax,drawline_ay);
	c.lineTo(drawline_bx,drawline_by);
	c.stroke();
}
function DrawRectLine(drawrect_ax,drawrect_ay,drawrect_w,drawrect_h,drawrect_r,drawrect_g,drawrect_b)
{
	DrawLine(drawrect_ax,drawrect_ay,drawrect_ax+drawrect_w,drawrect_ay,drawrect_r,drawrect_g,drawrect_b);
	DrawLine(drawrect_ax+drawrect_w,drawrect_ay,drawrect_ax+drawrect_w,drawrect_ay+drawrect_h,drawrect_r,drawrect_g,drawrect_b);
	DrawLine(drawrect_ax+drawrect_w,drawrect_ay+drawrect_h,drawrect_ax,drawrect_ay+drawrect_h,drawrect_r,drawrect_g,drawrect_b);
	DrawLine(drawrect_ax,drawrect_ay+drawrect_h,drawrect_ax,drawrect_ay,drawrect_r,drawrect_g,drawrect_b);
}
