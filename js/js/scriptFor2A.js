var fs = require('fs'),
data = fs.readFileSync("../csv/file2.csv",{encoding: 'UTF8'}).toString();
var rows = data.split("\r\n");
var first_row = rows[0].split(",");
var head=[];
head[0]=first_row[0];
head[1]=first_row[5];
var output=[];
for(var i=1;i<(rows.length-3);i=i+1)
{
    var line = rows[i].split(",");
    var object={};
    object[head[0]]=line[0];
    object[head[1]]=line[5];
    output.push(object);
}



for(var j=0;j<output.length;j++)
{
    for(var i=0;i<(output.length-j-1);i++)
    {
        if(parseFloat(output[i][head[1]])<parseFloat(output[i+1][head[1]]))
        {
            var temp;
            temp=output[i];
            output[i]=output[i+1];
            output[i+1]=temp;
        }
    }
}



fs.writeFileSync("../json/2a.json", JSON.stringify(output));