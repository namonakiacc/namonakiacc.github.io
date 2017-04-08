var funcon=2;
var funcp=0.5;
var radcon=1;
var W = 600;
var c_s=0;
var H = 467;
var pw_enemy=3.0;
var besiege_pw=0.9;
var pw_me=3.2;
var e_start=60;
var my_base=0;
var city_num=55;
var bg_img;
var city_x=[258,157,190,151,143,318,494,270,482,380,405,437,563,250,315,495,150,73,107,112,233,338,241,421,224,252,274,249,311,199,216,226,356,318,427,540,285,347,414,440,461,474,428,460,403,370,510,175,465,412,221,181,135,335,346];
var city_y=[226,309,337,251,159,134,320,329,65,197,294,334,443,87,310,350,200,228,175,260,375,46,316,162,217,253,242,278,274,237,171,118,330,357,359,398,186,205,198,195,320,314,273,262,77,103,403,323,96,375,395,359,324,380,421];
var city_size=new Array(city_num);
for(i=0;i<city_num;i++)city_size[i]=1;
city_size[0]=8;
city_size[1]=4;
city_size[2]=5;
city_size[3]=3;
city_size[4]=3;
city_size[5]=6;
city_size[6]=4;
city_size[7]=4;
city_size[8]=3;
city_size[11]=2;
city_size[12]=2;
city_size[13]=2;
city_size[15]=2;
city_size[16]=2;
city_size[20]=2;
city_size[21]=2;
city_size[24]=8;
city_size[49]=2;
city_size[50]=2;
city_size[51]=2;
city_size[52]=2;
city_size[53]=2;
city_size[54]=12;

var city_rebels=new Array(city_num);
for(i=0;i<city_num;i++)city_rebels[i]=0;
var my_power=0;
var enemy_power=0;

var G=new Array(city_num);
G[0]=[24,25,26,36];
G[1]=[3,19,29,47,52];
G[2]=[20,22,47,51];
G[3]=[1,16,19];
G[4]=[16,18,31];
G[5]=[13,21,36,45];
G[6]=[15,41];
G[7]=[22,33];
G[8]=[48];
G[9]=[10,37,38];
G[10]=[9,11];
G[11]=[10,34,40];
G[12]=[35,46];
G[13]=[5,31];
G[14]=[28,32,33];
G[15]=[6,35,46];
G[16]=[3,4];
G[17]=[18,19];
G[18]=[4,17];
G[19]=[1,3,17];
G[20]=[2,33,50];
G[21]=[5];
G[22]=[2,7,27];
G[23]=[38,39,48];
G[24]=[0,29,30];
G[25]=[0,27];
G[26]=[0,28];
G[27]=[22,25];
G[28]=[14,26];
G[29]=[1,24];
G[30]=[24,31];
G[31]=[4,13,30];
G[32]=[14,34];
G[33]=[7,14,20,53];
G[34]=[11,32,49];
G[35]=[12,15,46];
G[36]=[0,5,37];
G[37]=[9,36];
G[38]=[9,23,39,42];
G[39]=[23,38,43];
G[40]=[11,41,42];
G[41]=[6,40,43];
G[42]=[38,40];
G[43]=[39,41];
G[44]=[45];
G[45]=[5,44];
G[46]=[12,15,35];
G[47]=[1,2];
G[48]=[8,23];
G[49]=[34,53];
G[50]=[20,51,53];
G[51]=[2,50,52];
G[52]=[1,51];
G[53]=[33,49,50,54];
G[54]=[53];

//test
/*
for(i=0;i<city_num;i++){
for(var k in G[i])
{
	ok=false;
	for(var j in G[G[i][k]])
	{
		if(i==G[G[i][k]][j])ok=true;
	}
	if(!ok)alert(i+" "+G[i][k]);
}
}
*/


var player_num;
var PLAYER_ID=0;
var AI_ID=1;
// player - 0
// computer - 1
var flag=new Array(city_size);
for(i=0;i<49;i++)flag[i]=AI_ID;
for(i=49;i<city_num;i++)flag[i]=PLAYER_ID;



var city_udist=new Array(city_num);
for(i=0;i<city_num;i++)
{
	city_udist[i]=new Array(city_num);
	for(j=0;j<city_num;j++)
	{
		var dx=city_x[i]-city_x[j];
		var dy=city_y[i]-city_y[j];
		city_udist[i][j]=Math.sqrt(dx*dx+dy*dy);
	}
}



var attack_time=new Array(city_num);
for(i=0;i<city_num;i++)attack_time[i]=0;

var onriver=new Array(city_num);
for(i=0;i<city_num;i++)
{
	onriver[i]=new Array(city_num);
	for(j=0;j<city_num;j++)onriver[i][j]=0;
}

var city_power=new Array(city_num);
var gmi=1200000;
for(i=0;i<city_num;i++)
{
	city_power[i]=city_size[i]*city_size[i]*2000;
	if(flag[i]==AI_ID)city_power[i]*=pw_enemy;
	else city_power[i]*=pw_me;
	if(city_power[i]<2000)city_power[i]=2000;
	
	if(flag[i]==PLAYER_ID)my_base+=city_power[i];
}
var seigen=1500000;
var bisieged=new Array(city_num);
var bisieged2=new Array(city_num);
var save_power=new Array(city_num);
for(i=0;i<city_num;i++)save_power[i]=1;


if(gmi>=my_base&&gmi)
{
	console.log(gmi);
	console.log(my_base);
	for(i=0;i<city_num;i++)if(flag[i]==PLAYER_ID)city_power[i]*=gmi/my_base;
	my_base=gmi;
}