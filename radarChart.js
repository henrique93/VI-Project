var radarChart;

function updateRadar(data) {
    radarChart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    radarChart.update();
}

//d3.csv("datasets/radarChart.csv").then(function(csv) {



  radarChart = new Chart(document.getElementById("radarChartCanvas"), {
      type: 'radar',
      data: {
      labels: ['Score', 'Revenue', 'Budget', 'Runtime', 'Votes'],
      datasets: [{
          label: "Average",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [10, 9, 4, 5, 5]
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Average for selected gender/years',
          fontFamily: "sans-serif",
          fontStyle: "normal",
          fontColor: "#000",
          fontSize: "14"
        },
        legend: {
          display: false
        },
        scale: {
          show: false,
          ticks: {
            display : false,
            min: 0,
            max: 10
          }
        },
        tooltips: {
          callbacks: {
            label: function(item, data) {
                    var datasetLabel=data.datasets[item.datasetIndex].label||'';
                    var dataPoint = item.yLabel;
                    var dataType = item.index;
                    var unit = '';
                    if (dataType == 1) {
                      unit = ' $';
                      dataPoint = dataPoint;
                    }
                    else if (dataType == 2) {
                      unit = ' $';
                      dataPoint = dataPoint;
                    }
                    else if (dataType == 3) {
                      unit = ' min';
                      dataPoint = dataPoint;
                    }
                    else if (dataType == 4) {
                      dataPoint = dataPoint;
                    }
                    return datasetLabel + ': '+ dataPoint + unit;
                   }
          }
        }
      }
  });
//});
