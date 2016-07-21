$(document).ready(function(){

var margin = {top: 50, right: 20, bottom: 110, left: 80},
  width = 1000- margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
  .range([height, 0]);

var color = d3.scale.ordinal()
  .range(["blue", "yellow  "]);

var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));

var svg = d3.select("#tab5").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("../json/4.json", function(error, data) {
 if (error) throw error;
 
 var popgdp = d3.keys(data[0]).filter(function(key) { return key !== "Continent"; });
  console.log(popgdp);
 data.forEach(function(d) {
  d.ages = popgdp.map(function(name) { return {name: name, value: +d[name]}; });
});


 x0.domain(data.map(function(d) { return d["Continent"]; }));
 x1.domain(popgdp).rangeRoundBands([0, x0.rangeBand()]);
 y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

svg.append("g")
    .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
      .selectAll('text')
      .attr("transform","rotate(-75)")
      .attr("dx","-.8em")
      .attr("dy","-0.1em")
      .style("text-anchor","end");

 svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
   .append("text")
     .attr("transform", "rotate(-90)")
     .attr("x", -height/2)
     .attr("dy", "-3.71em")
     .style("text-anchor", "end")
     .text("in Millions");

 var state = svg.selectAll(".state")
     .data(data)
   .enter().append("g")
    .attr("class", "state")
    .attr("transform", function(d) { return "translate(" + x0(d["Continent"]) + ",0)"; });

 state.selectAll("rect")
     .data(function(d) { return d.ages; })
   .enter().append("rect")
     .attr("width", x1.rangeBand())
     .attr("x", function(d) { return x1(d.name); })
     .attr("y", function(d) { return y(d.value); })
     .attr("height", function(d) { return height - y(d.value); })
     .style("fill", function(d) { return color(d.name); });

 var legend = svg.selectAll(".legend")
     .data(popgdp.slice().reverse())
   .enter().append("g")
     .attr("class", "legend")
     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

 legend.append("rect")
     .attr("x", width - 18)
     .attr("width", 18)
     .attr("height", 18)
     .style("fill", color);

 legend.append("text")
     .attr("x", width - 24)
     .attr("y", 9)
     .attr("dy", ".35em")
    .style("text-anchor", "end")
     .text(function(d) { return d; });

});
});