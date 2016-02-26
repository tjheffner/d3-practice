var svgW = 1000,
    svgH = 1000,
    pad = 2;

var data; // a global

d3.json("states.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  visualizeit();
});
