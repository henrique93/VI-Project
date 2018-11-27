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
      //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi,SUM
      var data = [{
        key: "Action",
        values: []
      }, {
        key: "Adventure",
        values: []
      }, {
        key: "Animation",
        values: []
      }, {
        key: "Biography",
        values: []
      }, {
        key: "Comedy",
        values: []
      }, {
        key: "Crime",
        values: []
      }, {
        key: "Drama",
        values: []
      }, {
        key: "Family",
        values: []
      }, {
        key: "Fantasy",
        values: []
      }, {
        key: "Horror",
        values: []
      }, {
        key: "Mystery",
        values: []
      }, {
        key: "Romance",
        values: []
          }, {
        key: "Sci-Fi",
        values: []
      }, {
        key: "Total",
        values: []
      }];
      //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi,SUM
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
          value: d['Animation']
        });
          data[3].values.push({
          key: dateConvert(d.released),
          value: d['Biography']
        });
          data[4].values.push({
          key: dateConvert(d.released),
          value: d['Comedy']
        });
          data[5].values.push({
          key: dateConvert(d.released),
          value: d['Crime']
        });
          data[6].values.push({
          key: dateConvert(d.released),
          value: d['Animation']
        });
          data[7].values.push({
          key: dateConvert(d.released),
          value: d['Family']
        });
          data[8].values.push({
          key: dateConvert(d.released),
          value: d['Fantasy']
        });
          data[9].values.push({
          key: dateConvert(d.released),
          value: d['Horror']
        });
          data[10].values.push({
          key: dateConvert(d.released),
          value: d['Mystery']
        });
          data[11].values.push({
          key: dateConvert(d.released),
          value: d['Romance']
        });
          data[12].values.push({
          key: dateConvert(d.released),
          value: d['Sci-Fi']
        });
          data[13].values.push({
          key: dateConvert(d.released),
          value: d['SUM']
        });
      });

      // Create chart base
      var myChart = d3.ez.base()
        .width(750)
        .height(300)
        .chart(chart)
      .title(title)
      .legend(legend)
        .on("customValueMouseOver", function(d) {
          d3.select("#lineMessage").text(d.value);
        })
        .on("customSeriesClick", function(d) {
          console.log(d);
        });

      d3.select('#lineChart')
        .datum(data)
        .call(myChart);
});