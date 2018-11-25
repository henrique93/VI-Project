dateConvert = function(dateYMD) {
      parser = d3.timeParse('%Y-%m-%d');
      var dateISO = parser(dateYMD).toISOString();
      var dateUnix = new Date(dateISO)/1000;
      return dateUnix;
    };

d3.csv("MovieGenresperYears.csv", function(error, csv) {
  var colors = d3.ez.palette.categorical(3);
  var chart = d3.ez.chart.lineChart()
    .colors(colors)
    .yAxisLabel("Quantity");
  var legend = d3.ez.component.legend().title("Genre");
  // Convert csv to d3-ez data format
  dataLine = [ {key: "Action", values: []}, {key: "Drama", values: []}, {key: "Sci-Fi", values: []} ];
  d3.map(csv).values().forEach(function(d) {
    dataLine[3].values.push({key: d.Date, value: d['Action']});
    dataLine[1].values.push({key: d.Date, value: d['Drama']});
    dataLine[2].values.push({key: d.Date, value: d['Sci-Fi']});
      console.log("aqui");
      console.log(dataLine);
  });

  // Create chart base
  var myChart = d3.ez.base()
    .width(900)
    .height(300)
    .chart(chart)
    .legend(legend)
    .on("customValueMouseOver", function(d, i) {
    });

  d3.select('#LineChart')
    .datum(dataLine)
    .call(myChart);
});