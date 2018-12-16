var lineChart;

function getGenreIndex(genre) {
  if (genre == "Action") {return 0;}
  else if(genre == "Adventure") {return 1;}
  else if(genre == "Animation") {return 2;}
  else if(genre == "Biography") {return 3;}
  else if(genre == "Comedy") {return 4;}
  else if(genre == "Crime") {return 5;}
  else if(genre == "Drama") {return 6;}
  else if(genre == "Family") {return 7;}
  else if(genre == "Fantasy") {return 8;}
  else if(genre == "Horror") {return 9;}
  else if(genre == "Mystery") {return 10;}
  else if(genre == "Romance") {return 11;}
  else if(genre == "SciFi" || genre == "Sci-Fi") {return 12;}
}

d3.csv("datasets/LineChartShort.csv").then(function(csv) {
      //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi
      var dataAction = ["Action"];
      var dataAdventure = ["Adventure"];
      var dataAnimation = ["Animation"];
      var dataBiography = ["Biography"];  //Short csv version
      var dataComedy = ["Comedy"];
      var dataCrime = ["Crime"];
      var dataDrama = ["Drama"];
      var dataFamily = ["Family"];
      var dataFantasy = ["Fantasy"];
      //var dataHistory = ["History"];    //Long csv version
      var dataHorror = ["Horror"];
      //var dataMusic = ["Music"];        //Long csv version
      var dataMystery = ["Mystery"];
      var dataRomance = ["Romance"];
      var dataSciFi = ["Sci-Fi"];
      //var dataThriller = ["Thriller"];  //Long csv version
      //var dataWar = ["War"];            //Long csv version
      //var dataWestern = ["Western"];    //Long csv version
      //Movie types: Action,Adventure,Animation,Biography,Comedy,Crime,Drama,Family,Fantasy,Horror,Mystery,Romance,Sci-Fi
      d3.map(csv).values().forEach(function(d) {
        dataAction.push(d['Action']);
        dataAdventure.push(d['Adventure']);
        dataAnimation.push(d['Animation']);
        dataBiography.push(d['Biography']);  //Short csv version
        dataComedy.push(d['Comedy']);
        dataCrime.push(d['Crime']);
        dataDrama.push(d['Drama']);
        dataFamily.push(d['Family']);
        dataFantasy.push(d['Fantasy']);
        //dataHistory.push(d['History']);    //Long csv version
        dataHorror.push(d['Horror']);
        //dataMusic.push(d['Music']);        //Long csv version
        dataMystery.push(d['Mystery']);
        dataRomance.push(d['Romance']);
        dataSciFi.push(d['SciFi']);
        //dataThriller.push(d['Thriller']);  //Long csv version
        //dataWar.push(d['War']);            //Long csv version
        //dataWestern.push(d['Western']);    //Long csv version
      });



    lineChart = c3.generate({
      bindto: '#lineChart',
      data: {
          x: 'x',
  //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
          columns: [
            //['x', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            ['x', '1986-01-01', '1987-01-01', '1988-01-01', '1989-01-01', '1990-01-01', '1991-01-01', '1992-01-01', '1993-01-01', '1994-01-01', '1995-01-01', '1996-01-01', '1997-01-01', '1998-01-01', '1999-01-01', '2000-01-01', '2001-01-01', '2002-01-01', '2003-01-01', '2004-01-01', '2005-01-01', '2006-01-01', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01'],
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
          ],
          onclick: function (datum, element) {
            console.log("ola");
          }
      },
      axis: {
          x: {
            type: 'timeseries',
            tick: {
                format: '%Y',
                values: ['1987-01-01', '1989-01-01', '1991-01-01', '1993-01-01', '1995-01-01', '1997-01-01', '1999-01-01', '2001-01-01', '2003-01-01', '2005-01-01', '2007-01-01', '2009-01-01', '2011-01-01', '2013-01-01', '2015-01-01']

            }
          }
      },
      color: {
        pattern: ["#e6194B", "#3cb44b", "#f032e6", "#bfef45", "#f58231", "#000075", "#9A6324", "#ffe119", "#911eb4", "#800000", "#42d4f4", "#fabebe", "#4363d8"]
      },
      transition: {
        duration: 2000
      },
      legend: {
           item: {
               onclick: function legend_on_click(id) {
                 var $$ = this;
                 var regions = $$.mainRegion;
                 if ($$.d3.event.altKey) {
                   $$.api.hide();
                   $$.api.show(id);
                 }
                 else {
                   $$.api.toggle(id);
                   $$.isTargetToShow(id) ? $$.api.focus(id) : $$.api.revert();
                   var index = getGenreIndex(id);
                   console.log(id)
                   if ($$.isTargetToShow(id) == true) {
                     var act = getActor(index);
                     activeGenre.splice(index, 0, act);
                     if (id == "Sci-Fi") { id = "SciFi" }
                     scatterPlot.show(id);
                     setTimeout(function(){showNewWords()}, 1500);
                   }
                   else {
                     activeGenre.splice(index, 1);
                     if (id == "Sci-Fi") { id = "SciFi" }
                     scatterPlot.hide(id);
                     setTimeout(function(){showNewWords()}, 1500);
                   }
                 }
              }
           }
      }

  });
});
