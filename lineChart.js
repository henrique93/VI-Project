d3.csv("MovieGenresperYears.csv").then(function(csv) {
      // Historical Exchange Rates Source: https://www.ofx.com/en-gb/forex-news/historical-exchange-rates/

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
      }];
      //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi,SUM
      d3.map(csv).values().forEach(function(d) {
        data[0].values.push({
          key: dateConvert(d.released),
          value: d['Action'],
            name: 'Action'
        });
        data[1].values.push({
          key: dateConvert(d.released),
          value: d['Adventure'],
            name: 'Adventure'
        });
          data[2].values.push({
          key: dateConvert(d.released),
          value: d['Animation'],
            name: 'Animation'
        });
          data[3].values.push({
          key: dateConvert(d.released),
          value: d['Biography'],
            name: 'Biography'
        });
          data[4].values.push({
          key: dateConvert(d.released),
          value: d['Comedy'],
            name: 'Comedy'
        });
          data[5].values.push({
          key: dateConvert(d.released),
          value: d['Crime'],
            name: 'Crime'
        });
          data[6].values.push({
          key: dateConvert(d.released),
          value: d['Drama'],
            name: 'Drama'
        });
          data[7].values.push({
          key: dateConvert(d.released),
          value: d['Family'],
            name: 'Family'
        });
          data[8].values.push({
          key: dateConvert(d.released),
          value: d['Fantasy'],
            name: 'Fantasy'
        });
          data[9].values.push({
          key: dateConvert(d.released),
          value: d['Horror'],
            name: 'Horror'
        });
          data[10].values.push({
          key: dateConvert(d.released),
          value: d['Mystery'],
            name: 'Mystery'
        });
          data[11].values.push({
          key: dateConvert(d.released),
          value: d['Romance'],
            name: 'Romance'
        });
          data[12].values.push({
          key: dateConvert(d.released),
          value: d['Sci-Fi'],
            name: 'Sci-Fi'
        });
      });

      // Create chart base
    var fix = 0;
      var myChart = d3.ez.base()
        .width(750)
        .height(280)
        .chart(chart)
        .title(title)
        .legend(legend)
        .on("customValueMouseOver", function(d) {
            //console.log(d);
          //d3.select("#lineMessage").text(d.value);
            d3.select("#bubbleMessage").text(d.value);
        })
        .on("customSeriesClick", function(d) {
            if (fix <= 1){
                genre = d.key;
                bubbles = d3.selectAll("[genre="+genre+"]");
                line = d3.select("#"+genre);
                if (bubbles.attr("visibility") == "visible") {
                    line.attr("stroke-opacity", "0.2");
                    line.attr("fill-opacity", "0.2");
                    bubbles.attr("visibility", "hidden");
                }
                else {
                    line.attr("stroke-opacity", "1");
                    line.attr("fill-opacity", "1");
                    bubbles.attr("visibility", "visible");
                }
                console.log(genre);
                console.log(bubbles.attr("visibility"));
                fix += 1;
            }
            else {
                fix = 0;
            }
        });

      d3.select('#lineChart')
        .datum(data)
        .call(myChart);
});