// Encapsulate the word cloud functionality
var cloud = null;

var years = [new Date("1986"), new Date("2016")];


var actorAction = [];
var actorAdventure = [];
var actorAnimation = [];
var actorBiography = [];  //Short csv version
var actorComedy = [];
var actorCrime = [];
var actorDrama = [];
var actorFamily = [];
var actorFantasy = [];
//var dataHistory = ["History"];    //Long csv version
var actorHorror = [];
//var dataMusic = ["Music"];        //Long csv version
var actorMystery = [];
var actorRomance = [];
var actorSciFi = [];

function getActor(index) {
	if (index == 0) {return actorAction;}
  else if(index == 1) {return actorAdventure;}
  else if(index == 2) {return actorAnimation;}
  else if(index == 3) {return actorBiography;}
  else if(index == 4) {return actorComedy;}
  else if(index == 5) {return actorCrime;}
  else if(index == 6) {return actorDrama;}
  else if(index == 7) {return actorFamily;}
  else if(index == 8) {return actorFantasy;}
  else if(index == 9) {return actorHorror;}
  else if(index == 10) {return actorMystery;}
  else if(index == 11) {return actorRomance;}
  else if(index == 12) {return actorSciFi;}
}

var words = [];
var activeGenre = []

function showNewWords() {
	getWords();
	cloud.update(words);
}

function sortByFrequency(arr) {
	f = {};
	arr.forEach(function(i) { f[i] = 0; });
	var u = arr.filter(function(i) { return ++f[i] == 1; });
	temp = u.sort(function(a, b) { return f[b] - f[a]; });
	return [temp , f];
}

function getWords() {
	first = years[0].getFullYear() - 1986;
	last = years[1].getFullYear() - 1986;
	cop = deepCopy(activeGenre);
	toUse = [];
	cop.forEach(function(el) {
		toUse.push(el.slice(first, last+1));
	});
	conc = [].concat.apply([], toUse);
	actors = [].concat.apply([], conc);
  answer = sortByFrequency(actors);
	sorted_words = answer[0];
	size = answer[1];
	words = sorted_words.map(function(d) {
	  return {text: d, size: size[d]};
	});
	for (i = 0; i < words.length; i++) {
	  if(words[i].text === ""){
				words.splice(i, 1);
		}
	}
}

function deepCopy(oldValue) {
  var newValue
  strValue = JSON.stringify(oldValue)
  return newValue = JSON.parse(strValue)
}

d3.csv("datasets/TagCloudActors.csv").then(function(data) {
  data.forEach(function(d) {
      actorAction.push(d.Action.split(", "));
			actorAdventure.push(d.Adventure.split(", "));
			actorAnimation.push(d.Animation.split(", "));
			actorBiography.push(d.Biography.split(", "));
			actorComedy.push(d.Comedy.split(", "));
			actorCrime.push(d.Crime.split(", "));
			actorDrama.push(d.Drama.split(", "));
			actorFamily.push(d.Family.split(", "));
			actorFantasy.push(d.Fantasy.split(", "));
			actorHorror.push(d.Horror.split(", "));
			actorMystery.push(d.Mystery.split(", "));
			actorRomance.push(d.Romance.split(", "));
			actorSciFi.push(d['Sci-Fi'].split(", "));
	})
	activeGenre = [actorAction, actorAdventure, actorAnimation, actorBiography, actorComedy, actorCrime, actorDrama,
		 actorFamily, actorFantasy, actorHorror, actorMystery, actorRomance, actorSciFi];

	getWords();

	function wordCloud(selector) {

	  var color = d3.scaleOrdinal(d3.schemeSpectral[9]);
		var width = document.getElementById('tagCloud').offsetWidth;
		var height = document.getElementById('tagCloud').offsetHeight;

		var fontScale = d3.scaleLinear()
			.domain([
			  d3.min(words, function(d) { return d.size; }),
			  d3.max(words, function(d) { return d.size; })
			])
			.range([10,25]);//.range([20,120]),
			//Construct the word cloud's SVG element
	    var svg = d3.select(selector).append("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .style("background-color", 'white')
	        .append("g")
	        .attr("transform", "translate(" + width/2 + ", " + height/2+ ")");


	    //Draw the word cloud
	    function draw(words) {
	        var cloud = svg.selectAll("g text")
	                        .data(words, function(d) { return d.text; })

	        //Entering words
	        cloud.enter()
	            .append("text")
	            .style("font-family", "Impact")
	            .style("fill", function(d,i) { return color(i); })
	        		.style("fill-opacity", 0)
	            .attr("text-anchor", "middle")
	            .attr('font-size', 1)
	            .text(function(d) { return d.text; });


	        //Entering and existing words
	        cloud
	            .transition()
	                .duration(5000)
	                .style("font-size", function(d) { return d.size + "px"; })
	        				.style("fill", function(d,i) { return color(i); })
	                .attr("transform", function(d) {
	                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	                })
	                .style("fill-opacity", 1);

	        //Exiting words
	        cloud.exit()
	            .transition()
	                .duration(1000)
	                .style('fill-opacity', 0)
	                .attr('font-size', 1)
	                .remove();
	    }


	    return {
	        update: function(currentWords) {
	            d3.layout.cloud().size([400, 200])
	                .words(deepCopy(currentWords))
	                //.padding(5)
	                .rotate(function() { return 0; })
	                .font("Impact")
	                .fontSize(function(d) { return fontScale(d.size); })
									.random(function(d) { return 1; })
	                .on("end", draw)
	                .start();
	        }
	    }

	}


	//Create a new instance of the word cloud visualisation.
	cloud = wordCloud('#tagCloud');

	//Start cycling
	cloud.update(words);
	cloud.update(words);
});
