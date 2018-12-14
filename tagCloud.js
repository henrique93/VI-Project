// Encapsulate the word cloud functionality
var cloud;

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

var words;

function showNewWords() {
		cloud.update(words);
}

function sortByFrequency(arr) {
		f = {};
	  arr.forEach(function(i) { f[i] = 0; });
	  var u = arr.filter(function(i) { return ++f[i] == 1; });
		temp = u.sort(function(a, b) { return f[b] - f[a]; });
	  return [temp , f];
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
  merge = actorAction.concat(actorAdventure, actorAnimation, actorBiography, actorComedy, actorCrime, actorDrama,
		 actorFamily, actorFantasy, actorHorror, actorMystery, actorRomance, actorSciFi);
	actors = [].concat.apply([], merge);
  var answer = sortByFrequency(actors);
	var sorted_words = answer[0];
	var size = answer[1];
	 words = sorted_words.map(function(d) {
			  return {text: d, size: size[d]};
			});

	for (i = 0; i < words.length; i++) {
			  if(words[i].text === ""){
						words.splice(i, 1);
				}
	}

function wordCloud(selector) {

  var color = d3.scaleOrdinal(d3.schemeSpectral[9]);
	var width = document.getElementById('tagCloud').offsetWidth;
	var height = document.getElementById('tagCloud').offsetHeight;

	var fontScale = d3.scaleLinear()
		.domain([
		  d3.min(words, function(d) { return d.size; }),
		  d3.max(words, function(d) { return d.size; })
		])
		.range([5,25]);//.range([20,120]),
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
                .duration(200)
                .style('fill-opacity', 0)
                .attr('font-size', 1)
                .remove();
    }


    return {
        update: function(words) {
            d3.layout.cloud().size([400, 200])
                .words(words)
                //.padding(5)
                .rotate(function() { return 0; })
                .font("Impact")
                .fontSize(function(d) { return fontScale(d.size); })
                .on("end", draw)
                .start();
        }
    }

}


//Create a new instance of the word cloud visualisation.
cloud = wordCloud('#tagCloud');

//Start cycling
cloud.update(words);
showNewWords();
});
