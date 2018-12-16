var radarChart;

var minRadar = [3, 17472, 7000, 69, 1280];
var maxRadar = [8.3, 788241776, 129888888, 202, 1122688];

function updateRadar() {
  first = years[0].getFullYear() - 1986;
  last = years[1].getFullYear() - 1986;
  dataNorm = [];
  score = 0;
  revenue = 0;
  budget = 0;
  runtime = 0;
  votes = 0;
  num = 0;
  cop = deepCopy(activeValues);
  toUse = [];
  cop.forEach(function(el) {
		toUse.push(el.slice(first, last+1));
	});
  conc = [].concat.apply([], toUse);
  conc.forEach(function(yr) {
    if (yr[0] != "0") {
      score = score + parseInt(yr[0]);
      revenue = revenue + parseInt(yr[1]);
      budget = budget + parseInt(yr[2]);
      runtime = runtime + parseInt(yr[3]);
      votes = votes + parseInt(yr[4]);
      num++;
    }
  })
  score = ((score / num) / maxRadar[0]) * 10;
  revenue = ((revenue / num) / maxRadar[1]) * 10;
  budget = ((budget / num) / maxRadar[2]) * 10;
  runtime = ((runtime / num) / maxRadar[3]) * 10;
  votes = ((votes / num) / maxRadar[4]) * 10;

  dataNorm = [score, revenue, budget, runtime, votes];
  radarChart.data.datasets.forEach((dataset) => {
      dataset.data = dataNorm;
  });
  radarChart.update();
}

function getValue(index) {
	if (index == 0) {return valuesAction;}
  else if(index == 1) {return valuesAdventure;}
  else if(index == 2) {return valuesAnimation;}
  else if(index == 3) {return valuesBiography;}
  else if(index == 4) {return valuesComedy;}
  else if(index == 5) {return valuesCrime;}
  else if(index == 6) {return valuesDrama;}
  else if(index == 7) {return valuesFamily;}
  else if(index == 8) {return valuesFantasy;}
  else if(index == 9) {return valuesHorror;}
  else if(index == 10) {return valuesMystery;}
  else if(index == 11) {return valuesRomance;}
  else if(index == 12) {return valuesSciFi;}
}

var valuesAction = [];
var valuesAdventure = [];
var valuesAnimation = [];
var valuesBiography = [];
var valuesComedy = [];
var valuesCrime = [];
var valuesDrama = [];
var valuesFamily = [];
var valuesFantasy = [];
var valuesHorror = [];
var valuesMystery = [];
var valuesRomance = [];
var valuesSciFi = [];

var activeValues;

d3.csv("datasets/RadarChart.csv").then(function(csv) {
  csv.forEach(function(d) {
    valuesAction.push(d.Action.split("; "));
    valuesAdventure.push(d.Adventure.split("; "));
    valuesAnimation.push(d.Animation.split("; "));
    valuesBiography.push(d.Biography.split("; "));
    valuesComedy.push(d.Comedy.split("; "));
    valuesCrime.push(d.Crime.split("; "));
    valuesDrama.push(d.Drama.split("; "));
    valuesFamily.push(d.Family.split("; "));
    valuesFantasy.push(d.Fantasy.split("; "));
    valuesHorror.push(d.Horror.split("; "));
    valuesMystery.push(d.Mystery.split("; "));
    valuesRomance.push(d.Romance.split("; "));
    valuesSciFi.push(d['Sci-Fi'].split("; "));
  })

  activeValues = [valuesAction, valuesAdventure, valuesAnimation, valuesBiography, valuesComedy, valuesCrime, valuesDrama, valuesFamily,
                  valuesFantasy, valuesHorror, valuesMystery, valuesRomance, valuesSciFi];

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
            data: [0, 0, 0, 0, 0]
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
                    if (dataType == 0) {
                      dataPoint = Math.round(dataPoint * 10) / 10;
                    }
                    else if (dataType == 1) {
                      unit = ' $';
                      dataPoint = Math.round(dataPoint * maxRadar[1] / 10);
                    }
                    else if (dataType == 2) {
                      unit = ' $';
                      dataPoint = Math.round(dataPoint * maxRadar[2] / 10);
                    }
                    else if (dataType == 3) {
                      unit = ' min';
                      dataPoint = Math.round(dataPoint * maxRadar[3] / 10);
                    }
                    else if (dataType == 4) {
                      unit = ' votes';
                      dataPoint = Math.round(dataPoint * maxRadar[4] / 10);
                    }
                    return datasetLabel + ': '+ dataPoint + unit;
                   }
          }
        }
      }
  });
  updateRadar();
});
