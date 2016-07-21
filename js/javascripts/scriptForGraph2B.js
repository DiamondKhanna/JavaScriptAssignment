$(document).ready(function(){
// set the dimensions of the canvas
var margin = {top: 50, right: 20, bottom: 150, left: 100},
    width = 900 - margin.left - margin.right,
    height = 600- margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);


//tooltip

    var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:orange'>" + d["GDP Billions (USD) 2013"] + "</span>";
  	})


// add the SVG element
var svg = d3.select("#tab2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


svg.call(tip);


// load the data
d3.json("json/2b.json", function(error, data) {

    data.forEach(function(d) {
        d["Country Name"] = d["Country Name"];
        d["GDP Billions (USD) 2013"] = +d["GDP Billions (USD) 2013"];
    });
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d["Country Name"]; }));
  y.domain([0, d3.max(data, function(d) { return d["GDP Billions (USD) 2013"]; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

 


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d["Country Name"]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d["GDP Billions (USD) 2013"]); })
      .attr("height", function(d) { return height - y(d["GDP Billions (USD) 2013"]);})
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

      

   // Draw yAxis and postion the label
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -height/2)
       .attr("dy", "-3em")
       .style("text-anchor", "middle")
       .text("GDP Billions (USD) 2013");


    

});
});