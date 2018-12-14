var scatterPlot;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

d3.csv("datasets/BubbleChart.csv").then(function(csv) {
  //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi
  var genre;

  var namesAction = ["Action"];
  var namesAdventure = ["Adventure"];
  var namesAnimation = ["Animation"];
  var namesBiography = ["Biography"];  //Short csv version
  var namesComedy = ["Comedy"];
  var namesCrime = ["Crime"];
  var namesDrama = ["Drama"];
  var namesFamily = ["Family"];
  var namesFantasy = ["Fantasy"];
  var namesHistory = ["History"];    //Long csv version
  var namesHorror = ["Horror"];
  var namesMusic = ["Music"];        //Long csv version
  var namesMystery = ["Mystery"];
  var namesRomance = ["Romance"];
  var namesSciFi = ["SciFi"];
  var namesThriller = ["Thriller"];  //Long csv version
  var namesWar = ["War"];            //Long csv version
  var namesWestern = ["Western"];    //Long csv version

  var dataAction = ["Action"];
  var dataAdventure = ["Adventure"];
  var dataAnimation = ["Animation"];
  var dataBiography = ["Biography"];  //Short csv version
  var dataComedy = ["Comedy"];
  var dataCrime = ["Crime"];
  var dataDrama = ["Drama"];
  var dataFamily = ["Family"];
  var dataFantasy = ["Fantasy"];
  var dataHistory = ["History"];    //Long csv version
  var dataHorror = ["Horror"];
  var dataMusic = ["Music"];        //Long csv version
  var dataMystery = ["Mystery"];
  var dataRomance = ["Romance"];
  var dataSciFi = ["SciFi"];
  var dataThriller = ["Thriller"];  //Long csv version
  var dataWar = ["War"];            //Long csv version
  var dataWestern = ["Western"];    //Long csv version

  var dataAction_x = ["Action_x"];
  var dataAdventure_x = ["Adventure_x"];
  var dataAnimation_x = ["Animation_x"];
  var dataBiography_x = ["Biography_x"];  //Short csv version
  var dataComedy_x = ["Comedy_x"];
  var dataCrime_x = ["Crime_x"];
  var dataDrama_x = ["Drama_x"];
  var dataFamily_x = ["Family_x"];
  var dataFantasy_x = ["Fantasy_x"];
  var dataHistory_x = ["History_x"];    //Long csv version
  var dataHorror_x = ["Horror_x"];
  var dataMusic_x = ["Music_x"];        //Long csv version
  var dataMystery_x = ["Mystery_x"];
  var dataRomance_x = ["Romance_x"];
  var dataSciFi_x = ["SciFi_x"];
  var dataThriller_x = ["Thriller_x"];  //Long csv version
  var dataWar_x = ["War_x"];            //Long csv version
  var dataWestern_x = ["Western_x"];    //Long csv version

  var nameArr = [];

  //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi
  d3.map(csv).values().forEach(function(d) {
    nameArr.push(d.title);
    if (d.genre == "Action") {
      namesAction.push(d.title);
      dataAction.push(d.score);
      dataAction_x.push(d.released);
    }
    else if (d.genre == "Adventure") {
      namesAdventure.push(d.title);
      dataAdventure.push(d.score);
      dataAdventure_x.push(d.released);
    }
    else if (d.genre == "Animation") {
      namesAnimation.push(d.title);
      dataAnimation.push(d.score);
      dataAnimation_x.push(d.released);
    }
    else if (d.genre == "Biography") {
      namesBiography.push(d.title);
      dataBiography.push(d.score);
      dataBiography_x.push(d.released);
    }
    else if (d.genre == "Comedy") {
      namesComedy.push(d.title);
      dataComedy.push(d.score);
      dataComedy_x.push(d.released);
    }
    else if (d.genre == "Crime") {
      namesCrime.push(d.title);
      dataCrime.push(d.score);
      dataCrime_x.push(d.released);
    }
    else if (d.genre == "Drama") {
      namesDrama.push(d.title);
      dataDrama.push(d.score);
      dataDrama_x.push(d.released);
    }
    else if (d.genre == "Family") {
      namesFamily.push(d.title);
      dataFamily.push(d.score);
      dataFamily_x.push(d.released);
    }
    else if (d.genre == "Fantasy") {
      namesFantasy.push(d.title);
      dataFantasy.push(d.score);
      dataFantasy_x.push(d.released);
    }
    else if (d.genre == "History") {
      namesHistory.push(d.title);
      dataHistory.push(d.score);
      dataHistory_x.push(d.released);
    }
    else if (d.genre == "Horror") {
      namesHorror.push(d.title);
      dataHorror.push(d.score);
      dataHorror_x.push(d.released);
    }
    else if (d.genre == "Music") {
      namesMusic.push(d.title);
      dataMusic.push(d.score);
      dataMusic_x.push(d.released);
    }
    else if (d.genre == "Mystery") {
      namesMystery.push(d.title);
      dataMystery.push(d.score);
      dataMystery_x.push(d.released);
    }
    else if (d.genre == "Romance") {
      namesRomance.push(d.title);
      dataRomance.push(d.score);
      dataRomance_x.push(d.released);
    }
    else if (d.genre == "SciFi") {
      namesSciFi.push(d.title);
      dataSciFi.push(d.score);
      dataSciFi_x.push(d.released);
    }
    else if (d.genre == "Thriller") {
      namesThriller.push(d.title);
      dataThriller.push(d.score);
      dataThriller_x.push(d.released);
    }
    else if (d.genre == "War") {
      namesWar.push(d.title);
      dataWar.push(d.score);
      dataWar_x.push(d.released);
    }
    else if (d.genre == "Western") {
      namesWestern.push(d.title);
      dataWestern.push(d.score);
      dataWestern_x.push(d.released);
    }
  });
  scatterPlot = c3.generate({
    bindto: '#bubbleChart',
      data: {
          xs: {
            Action: 'Action_x',
            Adventure: 'Adventure_x',
            Animation: 'Animation_x',
            Biography: 'Biography_x',  //Short csv version
            Comedy: 'Comedy_x',
            Crime: 'Crime_x',
            Drama: 'Drama_x',
            Family: 'Family_x',
            Fantasy: 'Fantasy_x',
            //History: 'History_x',     //Long csv version
            Horror: 'Horror_x',
            //Music: 'Music_x',         //Long csv version
            Mystery: 'Mystery_x',
            Romance: 'Romance_x',
            SciFi: 'SciFi_x',
            //Thriller: 'Thriller_x',   //Long csv version
            //War: 'War_x',             //Long csv version
            //Western: 'Western_x',     //Long csv version
          },
          // iris data from R
          columns: [
              dataAction,
              dataAdventure,
              dataAnimation,
              dataBiography,  //Short csv version
              dataComedy,
              dataCrime,
              dataDrama,
              dataFamily,
              dataFantasy,
              //dataHistory,   //Long csv version
              dataHorror,
              //dataMusic,     //Long csv version
              dataMystery,
              dataRomance,
              dataSciFi,
              //dataThriller,  //Long csv version
              //dataWar,       //Long csv version
              //dataWestern    //Long csv version

              dataAction_x,
              dataAdventure_x,
              dataAnimation_x,
              dataBiography_x,  //Short csv version
              dataComedy_x,
              dataCrime_x,
              dataDrama_x,
              dataFamily_x,
              dataFantasy_x,
              //dataHistory_x,   //Long csv version
              dataHorror_x,
              //dataMusic_x,     //Long csv version
              dataMystery_x,
              dataRomance_x,
              dataSciFi_x,
              //dataThriller_x,  //Long csv version
              //dataWar_x,       //Long csv version
              //dataWestern_x    //Long csv version
              ],
          type: 'scatter'
      },
      tooltip: {
         format: {
             value: function(value, ratio, id, index) {
                genre = id;
                var format = id === 'data1' ? d3.format(',') : d3.format("");
                return format(value);
             },
             name: function (name, ratio, id, index) {
               if (name == "SciFi") {
                 return "Sci-Fi";
               }
               else {
                 return name;
               }
             },
             title: function(x) {
                var indOfVal;
                if (genre == "Action") {
                  date = formatDate(x);
                  indOfVal = dataAction_x.indexOf(date);
                  return (namesAction[indOfVal]);
                }
                else if (genre == "Adventure") {
                  date = formatDate(x);
                  indOfVal = dataAdventure_x.indexOf(date);
                  return namesAdventure[indOfVal];
                }
                else if (genre == "Animation") {
                  date = formatDate(x);
                  indOfVal = dataAnimation_x.indexOf(date);
                  return namesAnimation[indOfVal];
                }
                else if (genre == "Biography") {
                  date = formatDate(x);
                  indOfVal = dataBiography_x.indexOf(date);
                  return namesBiography[indOfVal];
                }
                else if (genre == "Comedy") {
                  date = formatDate(x);
                  indOfVal = dataComedy_x.indexOf(date);
                  return namesComedy[indOfVal];
                }
                else if (genre == "Crime") {
                  date = formatDate(x);
                  indOfVal = dataCrime_x.indexOf(date);
                  return namesCrime[indOfVal];
                }
                else if (genre == "Drama") {
                  date = formatDate(x);
                  indOfVal = dataDrama_x.indexOf(date);
                  return namesDrama[indOfVal];
                }
                else if (genre == "Family") {
                  date = formatDate(x);
                  indOfVal = dataFamily_x.indexOf(date);
                  return namesFamily[indOfVal];
                }
                else if (genre == "Fantasy") {
                  date = formatDate(x);
                  indOfVal = dataFantasy_x.indexOf(date);
                  return namesFantasy[indOfVal];
                }
                else if (genre == "History") {
                  date = formatDate(x);
                  indOfVal = dataHistory_x.indexOf(date);
                  return namesHistory[indOfVal];
                }
                else if (genre == "Horror") {
                  date = formatDate(x);
                  indOfVal = dataHorror_x.indexOf(date);
                  return namesHorror[indOfVal];
                }
                else if (genre == "Music") {
                  date = formatDate(x);
                  indOfVal = dataMusic_x.indexOf(date);
                  return namesMusic[indOfVal];
                }
                else if (genre == "Mystery") {
                  date = formatDate(x);
                  indOfVal = dataMystery_x.indexOf(date);
                  return namesMystery[indOfVal];
                }
                else if (genre == "Romance") {
                  date = formatDate(x);
                  indOfVal = dataRomance_x.indexOf(date);
                  return namesRomance[indOfVal];
                }
                else if (genre == "SciFi") {
                  date = formatDate(x);
                  indOfVal = dataSciFi_x.indexOf(date);
                  return namesSciFi[indOfVal];
                }
                else if (genre == "Thriller") {
                  date = formatDate(x);
                  indOfVal = dataThriller_x.indexOf(date);
                  return namesThriller[indOfVal];
                }
                else if (genre == "War") {
                  date = formatDate(x);
                  indOfVal = dataWar_x.indexOf(date);
                  return namesWar[indOfVal];
                }
                else if (genre == "Western") {
                  date = formatDate(x);
                  indOfVal = dataWestern_x.indexOf(date);
                  return namesWestern[indOfVal];
                }
             }
         },

      },
      axis: {
          x: {
            type: 'timeseries',
            tick: {
                format: '%Y',
                values: ['1987-01-01', '1989-01-01', '1991-01-01', '1993-01-01', '1995-01-01', '1997-01-01', '1999-01-01', '2001-01-01', '2003-01-01', '2005-01-01', '2007-01-01', '2009-01-01', '2011-01-01', '2013-01-01', '2015-01-01']
            }
          },
          y: {
              label: 'Score'
          }
      },
      color: {
        pattern: ["#e6194B", "#3cb44b", "#f032e6", "#bfef45", "#f58231", "#000075", "#9A6324", "#ffe119", "#911eb4", "#800000", "#42d4f4", "#fabebe", "#4363d8"]
      },
      legend: {
          show: false
      },
      transition: {
        duration: 2000
      }
  });
});
