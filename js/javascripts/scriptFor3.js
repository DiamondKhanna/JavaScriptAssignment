var fs=require('fs');

var data=fs.readFileSync("../csv/file3.csv",{encoding:'utf8'}).toString();

var rows=data.split("\r\n");
var first_row=rows[0].split(",");

var headings=[];
headings[0]=first_row[0];
headings[1]="Growth in Purchasing Power (2010-2013) in millions";
headings[2]="Growth in Population (2010-2013) in millions";

var output=[];

for(var i = 1; i < (rows.length-3); i++)
{
	var row_at_a_time=rows[i].split(",");  //purchasing power rows data
	final_object={};
	final_object[headings[0]]=row_at_a_time[0];
	final_object[headings[1]]=(row_at_a_time[17]-row_at_a_time[14]).toString();
	final_object[headings[2]]=((row_at_a_time[5]-row_at_a_time[2])*1000).toString();

	output.push(final_object);
}

fs.writeFileSync("../json/3.json", JSON.stringify(output));
