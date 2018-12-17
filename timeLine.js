//var randomX = d3.randomUniform(1986, 2016),
  //  data = d3.range(800).map(function() { return [randomX(), 0.5]; });
  var start = 0;
d3.csv("datasets/TimeLine.csv").then(function(csv) {
  var data = csv.map(function(d) {
    //was 0.5 insted was 0
    if (d.Name == "09/nov") { d.Name = "9/11" }
    return [new Date(d.Data), 0 , d.Type, d.Name];
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



var tooltip = d3.select("body")
  .append("div")
  .attr('class', 'tooltip');


  var dot = g.append("g")
      .attr("fill-opacity", 1)
      .selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("transform", function(d) { return "translate(" + x(d[0]) + "," + y(d[1]) + ")"; })
      .attr("r", 7) //was 3.5
      .attr("fill", function(d) {if (d[2] == "Disaster") {return "#e6194B" /*vermelho*/}
                                  else if (d[2] == "Economics") {return "#bfef45" /*verde*/}
                                  else if (d[2] == "War") {return "#f032e6" /*vermelho*/}
                                  else if (d[2] == "Politics") {return "#bfef45" /*verde*/}
                                  else if (d[2] == "Technology") {return "#800000" /*azul*/}
                                  else if (d[2] == "Terrorism") {return "#e6194B" /*vermelho*/}
                                  else if (d[2] == "Death") {return "#e6194B" /*vermelho*/}
                                  else if (d[2] == "Crime") {return "#9A6324" /*castanho*/}
                                  else if (d[2] == "Celebration") {return "#ffe119" /*amarelo*/}
                                  else if (d[2] == "Space") {return "#800000" /*azul*/}
      })
      .on("mouseover", function(d) {
    return tooltip.style("visibility", "visible").text(d[3] + " | Type: " + d[2]);
  })

  // we move tooltip during of "mousemove"

  .on("mousemove", function() {
    return tooltip.style("top", (event.pageY - 30) + "px")
      .style("left", event.pageX + "px");
  })

  // we hide our tooltip on "mouseout"

  .on("mouseout", function() {
    return tooltip.style("visibility", "hidden");
  });/*
    // Para debug
    .on("mouseover", function(d) {
        console.log("Sou um evento!");
        var res = String(d[0]).substring(0, 15);// select importante date
        console.log(res); //full date of the evento
        console.log(d[0]);
        console.log(d[1]); // 0 ?
        console.log(d[2]); // tipo do evento
        console.log(d[3]);
        console.log(d[4]);
      });*/

  var gBrush = g.append("g")
      .call(brush)
      .call(brush.move, [years[0], years[1]].map(x))
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

  function updateVis(start, end) {
    lineChart.axis.min({x:start}); //Start date
    lineChart.axis.max({x:end}); //End date

    scatterPlot.axis.min({x:start}); //Start date
    scatterPlot.axis.max({x:end}); //End date

    years = [start, end];
    updateRadar();
    setTimeout(function(){showNewWords()}, 1500);
    console.log("ask");
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
    updateVis(d1[0], d1[1]);
  }
});
