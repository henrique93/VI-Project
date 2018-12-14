var msreading = [100,300,10,20];
var reads = [1, 20, 30, 90];
var kb_written = [1500, 16000, 4500, 100000]; // obviously you can't have all of these on same chart

function normalizeData(val, my_array) {
  var val_max = _.max(my_array); // underscore max and min functions
  var val_min = _.min(my_array);
  var new_val = val == 0 ? 0 : ((val - val_min) / (val_max - val_min)).toFixed(2);
  return new_val;
}

var data = [
  {
    "key": "Monster Truck",
    "values": [
      { "key": "Score", "value": 9 },
      { "key": "Revenue", "value": 2 },
      { "key": "Budget", "value": 3 },
      { "key": "Runtime", "value": 7 },
      { "key": "Popularity", "value": 4 }
    ]
  }, {
    "key": "Drag Racer",
    "values": [
      { "key": "Score", "value": 3 },
      { "key": "Revenue", "value": 2.6 },
      { "key": "Budget", "value": 2 },
      { "key": "Runtime", "value": 3 },
      { "key": "Popularity", "value": 4.7 }
    ]
  }, {
    "key": "Family Saloon",
    "values": [
      { "key": "Score", "value": 7.2 },
      { "key": "Revenue", "value": 3 },
      { "key": "Budget", "value": 2.8 },
      { "key": "Runtime", "value": 4.3 },
      { "key": "Popularity", "value": 6.1 }
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
