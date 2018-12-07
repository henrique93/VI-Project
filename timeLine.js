//var randomX = d3.randomUniform(1986, 2016),
  //  data = d3.range(800).map(function() { return [randomX(), 0.5]; });


d3.csv("TimeLine.csv").then(function(csv) {
  var data = csv.map(function(d) {
    return [d.Data.substring(3, 7), 0.5];
  });
  var	width=1300, height= 50,
      svg = d3.select(".timeLine").append("svg")
  	.attr("width", width)
  	.attr("height", height)
  	.attr("id","teste");
       g = svg.append("g");

  var	margin = {top: 0, right: 30, bottom: 20, left: 30};
      width = +svg.attr("width") - margin.left - margin.right;
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleLinear()
      .domain([1986, 2016])
      .range([10, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var brush = d3.brushX()
      .extent([[10, 0], [width, height]])
      .on("start brush", brushed)
      .on("end", brushended);

  var dot = g.append("g")
      .attr("fill-opacity", 0.2)
    .selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("transform", function(d) { return "translate(" + x(d[0]) + "," + y(d[1]) + ")"; })
      .attr("r", 3.5);

  g.append("g")
      .call(brush)
      .call(brush.move, [3, 5].map(x))
    .selectAll(".overlay")
      .each(function(d) { d.type = "selection"; }) // Treat overlay interaction as move.
      .on("mousedown touchstart", brushcentered); // Recenter before brushing.

  g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  function brushcentered() {
    var dx = x(1) - x(0), // Use a fixed width when recentering.
        cx = d3.mouse(this)[0],
        x0 = cx - dx / 2,
        x1 = cx + dx / 2;
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
  }

  function brushed() {
    if (!d3.event.selection) return; // Ignore empty selections.
    var extent = d3.event.selection.map(x.invert, x);
    dot.classed("selected", function(d) { return extent[0] <= d[0] && d[0] <= extent[1]; });
  }

  function brushended() {
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) return; // Ignore empty selections.
    var d0 = d3.event.selection.map(x.invert),
        d1 = d0.map(Math.round);

    // If empty when rounded, use floor & offset instead.
    if (d1[0] >= d1[1]) {
      d1[0] = Math.floor(d0[0]);
      d1[1] = d1[0] + 1;
    }

    d3.select(this).transition().call(brush.move, d1.map(x));
    console.log(d1[0]) //Data inicio
    console.log(d1[1]) //Data fim
  }
});
