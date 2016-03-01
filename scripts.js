var data; // a global
var margin = {top: 20, right: 30, bottom: 30, left: 60}
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
    .call(yAxis);

  // var barWidth = width / data.length;
  //
  // var bar = chart.selectAll("g")
  //     .data(data)
  //   .enter().append("g")
  //     .attr("transform", function(d, i) {
  //       return "translate(" + i * barWidth + ",0)";
  //     });

  // bar.append("rect")
  //   .attr("y", function(d) { return y(d.POPESTIMATE2015); })
  //   .attr("height", function(d) { return height - y(d.POPESTIMATE2015); })
  //   .attr("width", barWidth - 1)
  //   .attr("class", "allPop");
  //
  // bar.append("rect")
  //   .attr("y", function(d) { return y(d.POPEST18PLUS2015); })
  //   .attr("height", function(d) { return height - y(d.POPEST18PLUS2015); })
  //   .attr("width", barWidth - 1)
  //   .attr("class", "ofAge");
  //
  // bar.append("text")
  //   .attr("x", x.rangeBand() / 2)
  //   .attr("dy", ".75em")
  //   .attr("class", "vertical-text")
  //   .text(function(d) { return d.NAME; });

});
