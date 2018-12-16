//var randomX = d3.randomUniform(1986, 2016),
  //  data = d3.range(800).map(function() { return [randomX(), 0.5]; });
d3.csv("datasets/TimeLine.csv").then(function(csv) {
  var data = csv.map(function(d) {
    //was 0.5 insted was 0
    return [new Date(d.Data), 0 , d.Type];
  });

//special higth for the brush, previous there was no brushheight var, just heigth.
  var brushheight = 40;

  var	width=1300, height= 60,
    svg = d3.select("#timeLine").append("svg")
  	.attr("width", width)
  	.attr("height", height)
  	.attr("id","teste");
       g = svg.append("g");

  var	margin = {top: 0, right: 30, bottom: 20, left: 30};
      width = +svg.attr("width") - margin.left - margin.right;
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleTime()
      .domain([new Date(1986, 1, 1), new Date(2016, 1, 1) - 1])
      .range([20, width]);

  var y = d3.scaleLinear()
      .range([height, 0]);

  var brush = d3.brushX()
      .extent([[10, 0], [width, brushheight]])
      .on("start brush", brushed)
      .on("end", brushended);

  var dot = g.append("g")
      .attr("fill-opacity", 1)
      .selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("transform", function(d) { return "translate(" + x(d[0]) + "," + y(d[1]) + ")"; })
      .attr("r", 6) //was 3.5
      .attr("fill", function(d) {if (d[2] == "Disaster") {return "#e6194B"}
                                  else if (d[2] == "Economics") {return "#3cb44b"}
                                  else if (d[2] == "War") {return "#f032e6"}
                                  else if (d[2] == "Politics") {return "#bfef45"}
                                  else if (d[2] == "Technology") {return "#f58231"}
                                  else if (d[2] == "Terrorism") {return "#000075"}
                                  else if (d[2] == "Death") {return "#9A6324"}
                                  else if (d[2] == "Crime") {return "#ffe119"}
                                  else if (d[2] == "Celebration") {return "#911eb4"}
                                  else if (d[2] == "Space") {return "#800000"}

      })
      .on("mouseover", function(d) {
        console.log("Sou um evento!");
      });

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
    d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1+40]);
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
      d1 = d0.map(d3.timeYear.round);

    // If empty when rounded, use floor & offset instead.
    if (d1[0] >= d1[1]) {
      d1[0] = Math.floor(d0[0]);
      d1[1] = d1[0] + 1;
    }

    d3.select(this).transition().call(brush.move, d1.map(x));
    lineChart.axis.min({x:d1[0]}); //Start date
    lineChart.axis.max({x:d1[1]}); //End date

    scatterPlot.axis.min({x:d1[0]}); //Start date
    scatterPlot.axis.max({x:d1[1]}); //End date

    years = [d1[0], d1[1]];
    updateRadar();
    setTimeout(function(){showNewWords()}, 1500);
  }
});
