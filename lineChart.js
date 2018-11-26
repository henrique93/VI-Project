d3.csv("MovieGenresperYears.csv").then(function(csv) {
      // Historical Exchange Rates Source: https://www.ofx.com/en-gb/forex-news/historical-exchange-rates/
    console.log(csv);
      var colors = d3.ez.palette.categorical(3);
      var chart = d3.ez.chart.lineChart().colors(colors).yAxisLabel("Quantity");
      var legend = d3.ez.component.legend().title("Genre");
      var title = d3.ez.component.title().mainText("").subText("");
      // Convert csv to d3-ez data format
      dateConvert = function(dateYMD) {
        parser = d3.timeParse('%Y');
        var dateISO = parser(dateYMD).toISOString();
        var dateUnix = new Date(dateISO) / 1000;
        return dateUnix;
      }
      var data = [{
        key: "Action",
        values: []
      }, {
        key: "Adventure",
        values: []
      }, {
        key: "Drama",
        values: []
      }];
      d3.map(csv).values().forEach(function(d) {
        data[0].values.push({
          key: dateConvert(d.released),
          value: d['Action']
        });
        data[1].values.push({
          key: dateConvert(d.released),
          value: d['Adventure']
        });
        data[2].values.push({
          key: dateConvert(d.released),
          value: d['Drama']
        });
      });
      // Create chart base
      var myChart = d3.ez.base()
        .width(750)
        .height(300)
        .chart(chart)
        .on("customValueMouseOver", function(d) {
          d3.select("#message").text(d.value);
        })
        .on("customSeriesClick", function(d) {
          console.log(d);
        });
      d3.select('#lineChart')
        .datum(data)
        .call(myChart);
    });