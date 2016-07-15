const readline=require('readline');
const fs=require('fs');
var header=[];
var jsonData=[];
var tempdata={};
var isHeader=true;
const rl=readLine.createInterface(

{
	input: fs.createReadStream('<name_Of_CSV_file>')
});

rl.on('line',function(line))
{
	var lineRecords= line.trim().split(',');;
	for (var i = 0; i < lineRecords.length; i++) 
	{
		if(isHeader)
		{
			header[i]=lineRecords[i];
		}
		else
		{
			tempdata[header[i]]=lineRecords[i];
			jsonData.push(tempdata);
		}
	}
	tempdata={};
	isHeader=false;
	fs.writeFileSync("<name of json file in which you want to writedata>",JSON.stringify(jsonData),encoding="utf8");
});	