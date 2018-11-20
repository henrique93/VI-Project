var data = [
  {
    "key": "Monster Truck",
    "values": [
      { "key": "Speed", "value": 5 },
      { "key": "Durability", "value": 8 },
      { "key": "Comfort", "value": 6 },
      { "key": "Power", "value": 10 },
      { "key": "Space", "value": 5 }
    ]
  }, {
    "key": "Drag Racer",
    "values": [
      { "key": "Speed", "value": 10 },
      { "key": "Durability", "value": 3 },
      { "key": "Comfort", "value": 4 },
      { "key": "Power", "value": 9 },
      { "key": "Space", "value": 2 }
    ]
  }, {
    "key": "Family Saloon",
    "values": [
      { "key": "Speed", "value": 7 },
      { "key": "Durability", "value": 5 },
      { "key": "Comfort", "value": 10 },
      { "key": "Power", "value": 6 },
      { "key": "Space", "value": 8 }
    ]
  }];
var colors = d3.ez.palette.categorical(1);
var chart = d3.ez.chart.radarChart().colors(colors);
// Create chart base
var myChart = d3.ez.base()
  .width(500)
  .height(300)
  .chart(chart)
  .on("customValueMouseOver", function(d) {
    d3.select("#message").text(d.value);
  })
  .on("customSeriesClick", function(d) {
    console.log(d);
  });
// Add to page
d3.select("#radarChart")
  .datum(data)
  .call(myChart);