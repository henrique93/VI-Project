dateConvert = function(dateYMD) {
      parser = d3.timeParse('%Y-%m-%d');
      var dateISO = parser(dateYMD).toISOString();
      var dateUnix = new Date(dateISO)/1000;
      return dateUnix;
    };

var select1 = null;
var select2 = null;
var select3 = null;

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
      "key": d.revenue,
      "value": d.revenue,
      "x": d.released,
      "y": d.score,
      "series": d.score,
        "title": d.title
    };
  });
  // Nest Data
  var data = d3.nest().key(function(d) {
    return d.title;
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
        var select = document.getElementById(d.values[0].title).firstElementChild.firstElementChild;
        var update = 0;
        console.log(d.values.map)
        console.log(select);
        if (select1 == null && select != select2 && select != select3) {
            select1 = select;
            select1.setAttribute("stroke", "rgb(93, 165, 218)");
            select1.setAttribute("stroke-width", "5px");
            update = 1;
        }
        else if (select1 == select) {
            select1.setAttribute("stroke", "white");
            select1.setAttribute("stroke-width", "1px");
            select1 = null;
            update = 1;
        }
        else if (select2 == null && select != select1 && select != select3) {
            select2 = select;
            select2.setAttribute("stroke", "rgb(250, 164, 58)");
            select2.setAttribute("stroke-width", "5px");
            update = 1;
        }
        else if (select2 == select) {
            select2.setAttribute("stroke", "white");
            select2.setAttribute("stroke-width", "1px");
            select2 = null;
            update = 1;
        }
        else if (select3 == null && select != select1 && select != select2) {
            select3 = select;
            select3.setAttribute("stroke", "rgb(96, 189, 104)");
            select3.setAttribute("stroke-width", "5px");
            update = 1;
        }
        else if (select3 == select) {
            select3.setAttribute("stroke", "white");
            select3.setAttribute("stroke-width", "1px");
            select3 = null;
            update = 1;
        }
        /*radar = document.getElementById("radar");
        radar.style.display = "none";
        console.log(radar);*/
        console.log("1: ", select1);
        console.log("2: ", select2);
        console.log("3: ", select3);
        if (update == 1) {
            d3.select("#BubbleChart")
                .datum(d)
                .call(myChart);
            d3.select("#RadarChart")
                .datum(d)
                .call(myChart);
        }
    });
    if (select1 != null) {
        document.getElementById(d.values[0].title).firstElementChild.firstChild.style = select1
    }
  d3.select('#BubbleChart')
    .datum(data)
    .call(myChart);
});