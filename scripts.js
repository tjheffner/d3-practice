var data; // a global
var width = 1000,
    height = 500;

var y = d3.scale.linear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.json("https://gist.githubusercontent.com/micahgodbolt/c0b5587169db9f85f50b/raw/546695db0a0f70c41df47e457b426e533bb30c46/age-data.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;

  y.domain([0, d3.max(data, function(d) {return d.POPESTIMATE2015})]);

  var barWidth = width / data.length;

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(" + i * barWidth + ",0)";
      });

  bar.append("rect")
    .attr("y", function(d) { return y(d.POPESTIMATE2015); })
    .attr("height", function(d) { return height - y(d.POPESTIMATE2015); })
    .attr("width", barWidth - 1);


  bar.append("rect")
    .attr("y", function(d) { return y(d.POPEST18PLUS2015); })
    .attr("height", function(d) { return height - y(d.POPEST18PLUS2015); })
    .attr("width", barWidth - 1)
    .attr("class", "18plus");

});
