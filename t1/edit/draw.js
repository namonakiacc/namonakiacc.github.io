function draw()
{
	if(draw_stop)return;
	draw_start=true;
	DrawRect(0,0,W+cw_ad,H+ch_ad,192,192,192);
	c.drawImage(bgimg,0,0,bgimg.width,bgimg.height,0,0,W,H);
	for(i=0;i<r1.length;i++)
	{
		var p1=r1[i];
		var p2=r2[i];
		DrawLine(xs[p1],ys[p1],xs[p2],ys[p2],4,243,152,0);
	}
	for(i=0;i<N;i++)
	{
		var city_i_r=Math.max(3,sz[i])
		if(f[i]=="A")DrawCircle(xs[i],ys[i],city_i_r,128,128,128);
		else DrawCircle(xs[i],ys[i],city_i_r,255,0,0);
		DrawCircleLine(xs[i],ys[i],city_i_r,0,0,0);
		if(b[i]=="A"||b[i]=="P")DrawCircleLine(xs[i],ys[i],city_i_r+1,0,0,0);
		
		if(selected==i)
		{
			DrawCircleLine(xs[i],ys[i],city_i_r+3,0,255,255);
			DrawCircleLine(xs[i],ys[i],city_i_r+4,0,255,255);
			DrawCircleLine(xs[i],ys[i],city_i_r+5,0,255,255);
			DrawCircleLine(xs[i],ys[i],city_i_r+6,0,255,255);
		}
	}
	DrawRect(W,0,cw_ad,H+ch_ad,192,192,192);
	c.fillStyle="rgb(0,0,0)";
	c.font="bold 20px 'MS Gothic'";
	c.textAlign="start";
	c.textBaseLine="bottom";
	if(selected==-1)
	{
		c.fillText("拠点を選択してください",W,40,400);
		c.font="bold 12px 'MS Gothic'";
		c.fillText("　地図上の拠点をクリックしてください",W,70);
		
		
		c.font="bold 16px 'MS Gothic'";
		DrawRect(W+20,90,100,20,128,128,128);
		c.fillStyle="#000000";
		c.fillText("拠点の作成",W+27,105);
		DrawRect(W+20,120,100,20,128,128,128);
		c.fillStyle="#000000";
		c.fillText("リンク生成",W+27,135);
	}
	else if(f_mode==0)
	{
		c.fillText("拠点を編集中・・・",W,40,400);
		c.font="bold 12px 'MS Gothic'";
		c.fillText("　白い丸が表示されているとき、そこを",W,70);
		c.fillText("クリックしても拠点が移動できます",W,82);
		c.font="bold 16px 'MS Gothic'";
		c.fillText("最初の支配者：",W,110);
		if(f[selected]=='A')
		{
			DrawRect(W+120,94,40,20,255,0,0);
			DrawRect(W+168,92,44,24,0,255,255);
			DrawRect(W+170,94,40,20,128,128,128);
			c.font="bold 12px 'MS Gothic'";
			c.fillStyle="#FFFFFF";
			c.fillText("味方",W+127,108);
			c.fillText("敵",W+185,108);
		}
		else
		{
			DrawRect(W+118,92,44,24,0,255,255);
			DrawRect(W+120,94,40,20,255,0,0);
			DrawRect(W+170,94,40,20,128,128,128);
			c.font="bold 12px 'MS Gothic'";
			c.fillStyle="#FFFFFF";
			c.fillText("味方",W+127,108);
			c.fillText("敵",W+185,108);
		}
		
		c.font="bold 16px 'MS Gothic'";
		c.fillStyle="#000000";
		c.fillText("拠点の大きさ：",W,145);
		DrawRect(W+120,130,20,20,128,128,128);
		DrawRect(W+140,130,40,20,255,255,255);
		DrawRect(W+180,130,20,20,128,128,128);
		c.fillStyle="#000000";
		c.textAlign="center";
		c.fillText(sz[selected].toString(),W+160,147);
		if(sz[selected]>1)c.fillText("―",W+130,147);
		if(sz[selected]<12)c.fillText("＋",W+190,147);
		
		
		c.textAlign="start";
		c.fillText("拠点の状態：",W+16,180);
		if(b[selected]=='A'||b[selected]=='P')
		{
			DrawRect(W+120,164,40,20,255,0,0);
			DrawRect(W+168,162,44,24,0,255,255);
			DrawRect(W+170,164,40,20,128,128,128);
			c.font="bold 12px 'MS Gothic'";
			c.fillStyle="#FFFFFF";
			c.fillText("普通",W+127,178);
			c.fillText("要塞",W+177,178);
		}
		else
		{
			DrawRect(W+118,162,44,24,0,255,255);
			DrawRect(W+120,164,40,20,255,0,0);
			DrawRect(W+170,164,40,20,128,128,128);
			c.font="bold 12px 'MS Gothic'";
			c.fillStyle="#FFFFFF";
			c.fillText("普通",W+127,178);
			c.fillText("要塞",W+177,178);
		}
		c.font="bold 12px 'MS Gothic'";
		c.fillStyle="#000000";
		c.fillText("　要塞は支配者が変わることがないです",W,200);
		
		c.font="bold 16px 'MS Gothic'";
		c.fillStyle="#000000";
		c.fillText("位置(右が正)：",W,225);
		DrawRect(W+120,210,20,20,128,128,128);
		DrawRect(W+140,210,40,20,255,255,255);
		DrawRect(W+180,210,20,20,128,128,128);
		c.fillStyle="#000000";
		c.textAlign="center";
		c.fillText(xs[selected].toString(),W+160,227);
		if(xs[selected]-1>0)c.fillText("―",W+130,227);
		if(xs[selected]+1<W)c.fillText("＋",W+190,227);
		
		c.textAlign="start";
		c.fillText("位置(下が正)：",W,260);
		DrawRect(W+120,245,20,20,128,128,128);
		DrawRect(W+140,245,40,20,255,255,255);
		DrawRect(W+180,245,20,20,128,128,128);
		c.fillStyle="#000000";
		c.textAlign="center";
		c.fillText(ys[selected].toString(),W+160,262);
		if(ys[selected]-1>0)c.fillText("―",W+130,262);
		if(ys[selected]+1<H)c.fillText("＋",W+190,262);
		c.textAlign="start";
		
		DrawRect(W+20,280,100,20,128,128,128);
		c.fillStyle="#000000";
		c.fillText("道路の編集",W+27,295);
		DrawRect(W+20,310,100,20,128,128,128);
		c.fillStyle="#000000";
		c.fillText("拠点の削除",W+27,325);
		DrawRect(W+20,340,100,20,128,128,128);
		c.fillStyle="#000000";
		c.fillText("編集の終了",W+27,355);
		
		var now_time=performance.now();
		if(flk_t!=-1&&now_time-flk_t>=300)
		{
			if((f_lock&1)&&xs[selected]>1)xs[selected]-=1;
			if((f_lock&2)&&xs[selected]+1<W)xs[selected]+=1;
			if((f_lock&4)&&ys[selected]>1)ys[selected]-=1;
			if((f_lock&8)&&ys[selected]+1<H)ys[selected]+=1;
			if((f_lock&16)&&sz[selected]>1)sz[selected]-=1;
			if((f_lock&32)&&sz[selected]<12)sz[selected]+=1;
		}
		
		if(0<mm_tx&&mm_tx<W&&0<mm_ty&&mm_ty<H)
		{
			DrawCircleLine(mm_tx,mm_ty,sz[selected],255,255,255);
			DrawCircleLine(mm_tx,mm_ty,sz[selected]+1,255,255,255);
			DrawCircleLine(mm_tx,mm_ty,sz[selected]+2,255,255,255);
		}
	}
	else if(f_mode==1)
	{
		c.fillText("道路編集中・・・",W,40,400);
		c.font="bold 12px 'MS Gothic'";
		c.fillText("　終点を指定してください。",W,70);
		c.fillText("　始点・終点間の道路の有無が切り替わ",W,82);
		c.fillText("ります。",W,94);
		
		DrawRect(W+20,310,100,20,128,128,128);
		c.fillStyle="#000000";
		c.font="bold 16px 'MS Gothic'";
		c.fillText("編集を終了",W+27,325);
	}
	requestAnimationFrame(draw);
}