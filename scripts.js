var data; // a global
var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://gist.githubusercontent.com/tjheffner/0922f6c058cae934c226/raw/471e20f51cd839634bfc5b0f304b363e070cd93e/age-data.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  x.domain(data.map(function(d) { return d.ABBREV; }));
  y.domain([0, d3.max(data, function(d) {return d.POPESTIMATE2015})]);

  chart.append("g")
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  chart.append("g")
    .attr("class", "yAxis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Population");

  chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.ABBREV); })
    .attr("y", function(d) { return y(d.POPESTIMATE2015); })
    .attr("height", function(d) { return height - y(d.POPESTIMATE2015); })
    .attr("width", x.rangeBand());

  chart.selectAll(".old")
    .data(data)
  .enter().append("rect")
    .attr("class", "old")
    .attr("x", function(d) { return x(d.ABBREV); })
    .attr("y", function(d) { return y(d.POPEST18PLUS2015); })
    .attr("height", function(d) { return height - y(d.POPEST18PLUS2015); })
    .attr("width", x.rangeBand());

  chart.selectAll("old")
    .data(data)
  .enter().append("text")
    .attr("class", "pct")
    .attr("x", function(d) { return x(d.ABBREV); })
    .attr("y", function(d) { return y(d.POPEST18PLUS2015) + 8; })
    .text(function(d) { return d.PCNT_POPEST18PLUS; });

});
