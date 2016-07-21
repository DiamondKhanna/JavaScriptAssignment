var fs=require('fs');
var data=fs.readFileSync("../csv/file2.csv",{encoding:'utf8'}).toString();

var rows=data.split("\r\n");
var first_row=rows[0].split(",");

var headings=[];
headings[0]="Continent";
headings[1]="Aggregate Population (till 2015)";
headings[2]="Aggregate GDP (till 2015)";

var continent_names=["AUSTRALIA","AMERICA","AFRICA","EUROPE","ASIA"];

var output=[];

var temp_population1=0;
var temp_gdp1=0;
var temp_population2=0;
var temp_gdp2=0;
var temp_population3=0;
var temp_gdp3=0;
var temp_population4=0;
var temp_gdp4=0;
var temp_population5=0;
var temp_gdp5=0;

for(var i = 1; i < (rows.length-2); i++)
{
	
	var row_at_a_time=rows[i].split(",");
	if(row_at_a_time[0] == "Australia")
		{
			
			temp_population1=parseFloat(temp_population1)+parseFloat(row_at_a_time[7]);
			temp_gdp1=parseFloat(temp_gdp1)+parseFloat(row_at_a_time[13]);
			
		}
	if(row_at_a_time[0] == "Argentina"||row_at_a_time[0] == "Canada"||
		row_at_a_time[0] == "Brazil"||row_at_a_time[0] == "Mexico"||
		row_at_a_time[0] == "USA")
		{
			
			temp_population2=parseFloat(temp_population2)+parseFloat(row_at_a_time[7]);
			temp_gdp2=parseFloat(temp_gdp2)+parseFloat(row_at_a_time[13]);
		}
	if(row_at_a_time[0] == "South Africa")
		{
			
			temp_population3=parseFloat(temp_population3)+parseFloat(row_at_a_time[7]);
			temp_gdp3=parseFloat(temp_gdp3)+parseFloat(row_at_a_time[13]);
		}
	if(row_at_a_time[0] == "European Union")
		{
			
			temp_population4=parseFloat(temp_population4)+parseFloat(row_at_a_time[7]);
			temp_gdp4=parseFloat(temp_gdp4)+parseFloat(row_at_a_time[13]);
		}
	if(row_at_a_time[0] === "China"||row_at_a_time[0] === "India"||
		row_at_a_time[0] === "Indonesia"||row_at_a_time[0] === "Russia"||
		row_at_a_time[0] === "Saudi Arabia"||row_at_a_time[0] === "Republic of Korea"||
		row_at_a_time[0] === "Turkey"||row_at_a_time[0] === "Japan")
		{
			
			temp_population5=parseFloat(temp_population5)+parseFloat(row_at_a_time[7]);
			temp_gdp5=parseFloat(temp_gdp5)+parseFloat(row_at_a_time[13]);
		}
}

		for (i =0; i< 5; i++) 
		{
			object={};
			if(i==0)
			{
				object[headings[0]]=continent_names[0];
				object[headings[1]]=temp_population1;
				object[headings[2]]=temp_gdp1;

				output.push(object);
			}
			if(i==1)
			{
				object[headings[0]]=continent_names[1];
				object[headings[1]]=temp_population2;
				object[headings[2]]=temp_gdp2;

				output.push(object);
			}
			if(i==2)
			{
				object[headings[0]]=continent_names[2];
				object[headings[1]]=temp_population3;
				object[headings[2]]=temp_gdp3;

				output.push(object);	
			}
			if(i==3)
			{
				object[headings[0]]=continent_names[3];
				object[headings[1]]=temp_population4;
				object[headings[2]]=temp_gdp4;

				output.push(object);
			}
			if(i==4)
			{
				object[headings[0]]=continent_names[4];
				object[headings[1]]=temp_population5;
				object[headings[2]]=temp_gdp5;

				output.push(object);
			}
		}
	

fs.writeFileSync("../json/4.json", JSON.stringify(output));