d3.csv("MovieData.csv").then(function(csv) {
    csv.forEach(function(d) {
        d.released = new Date(d.released);
})
  // Hans Rosling Data Source: https://plot.ly/~LeoDKFZ/0.embed
  var colors = [d3.rgb(31, 119, 180), d3.rgb(255, 127, 14), d3.rgb(44, 160, 44), d3.rgb(214, 39, 40), d3.rgb(148, 103, 189)];
  var chart = d3.ez.chart.bubbleChart().colors(colors).yAxisLabel("yScale");
  // Convert csv to d3-ez data format
  // Rename keys
  var tmp = csv.map(function(d) {
    return {
      "key": d.score,
      "value": d.revenue,
      "x": d.released,
      "y": d.score,
      "series": d.score
    };
  });
  // Nest Data
  var data = d3.nest().key(function(d) {
    return d.score;
  }).entries(tmp);
  // Create chart base
  var myChart = d3.ez.base()
    .width(750)
    .height(300)
    .chart(chart)
    /*.on("customValueMouseOver", function(d) {
      d3.select("#message").text(d.value);
    })*/
    .on("customSeriesClick", function(d) {
      console.log(d);
    });
  d3.select('#BubbleChart')
    .datum(data)
    .call(myChart);
});