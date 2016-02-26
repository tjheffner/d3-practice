var svgW = 1000,
    svgH = 1000,
    pad = 2;

var USA; // a global

d3.json("states.json", function(error, json) {
  if (error) return console.warn(error);
  USA = json;
  visualizeit();
});

d3.select("body")
  .append("p")
  .text("is this really all it takes?")
  .style("color", "#ff6600")
  .style("font-size", "40pt");

function visualizeit(USA) {
  console.log(USA);
}
