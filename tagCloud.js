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
	console.log(words);
	var fontName = "Impact",
	  cWidth = 500,
	  cHeight = 250,
	  svg,
	  wCloud,
	  bbox,
	  ctm,
	  bScale,
	  bWidth,
	  bHeight,
	  bMidX,
	  bMidY,
	  bDeltaX,
	  bDeltaY;

	var cTemp = document.createElement('canvas'),
	  ctx = cTemp.getContext('2d');
	  ctx.font = "100px " + fontName;

	var fRatio = Math.min(cWidth, cHeight) / ctx.measureText(words[0].text).width,
	  fontScale = d3.scaleLinear()
		.domain([
		  d3.min(words, function(d) { return d.size; }),
		  d3.max(words, function(d) { return d.size; })
		])
		//.range([20,120]),
		.range([15,35]), // tbc
	  //fill = d3.scale.category20();
	  fill = d3.scaleOrdinal(d3.schemePaired);

 cloud =	d3.layout.cloud()
	  .size([cWidth, cHeight])
	  .words(words)
	  //.padding(2) // controls
	  .rotate(function() { return 0; })
	  .font(fontName)
	  .fontSize(function(d) { return fontScale(d.size) })
	  .on("end", draw)
	  .start();

	function draw(words, bounds) {
	  // move and scale cloud bounds to canvas
	  // bounds = [{x0, y0}, {x1, y1}]
	  bWidth = bounds[1].x - bounds[0].x;
	  bHeight = bounds[1].y - bounds[0].y;
	  bMidX = bounds[0].x + bWidth/2;
	  bMidY = bounds[0].y + bHeight/2;
	  bDeltaX = cWidth/2 - bounds[0].x + bWidth/2;
	  bDeltaY = cHeight/2 - bounds[0].y + bHeight/2;
	  bScale = bounds ? Math.min( cWidth / bWidth, cHeight / bHeight) : 1;

	  console.log(
		"bounds (" + bounds[0].x +
		", " + bounds[0].y +
		", " + bounds[1].x +
		", " + bounds[1].y +
		"), width " + bWidth +
		", height " + bHeight +
		", mid (" + bMidX +
		", " + bMidY +
		"), delta (" + bDeltaX +
		", " + bDeltaY +
		"), scale " + bScale
	  );

	  // the library's bounds seem not to correspond to reality?
	  // try using .getBBox() instead?

	  svg = d3.select(".cloud").append("svg")
		.attr("width", cWidth)
		.attr("height", cHeight);

	  wCloud = svg.append("g")
		//.attr("transform", "translate(" + [bDeltaX, bDeltaY] + ") scale(" + 1 + ")") // nah!
		.attr("transform", "translate(" + [bWidth>>1, bHeight>>1] + ") scale(" + bScale + ")") // nah!
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) { return d.size + "px"; })
		.style("font-family", fontName)
		.style("fill", function(d, i) { return fill(i); })
		.attr("text-anchor", "middle")
		.transition()
		.duration(500)
		.attr("transform", function(d) {
		  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function(d) { return d.text; });

	  // TO DO: function to find min and max x,y of all words
	  // and use it as the group's bbox
	  // then do the transformation
	  bbox = wCloud.node(0).getBBox();
	  //ctm = wCloud.node().getCTM();
	  console.log(
		"bbox (x: " + bbox.x +
		", y: " + bbox.y +
		", w: " + bbox.width +
		", h: " + bbox.height +
		")"
	  );

	};

	function sortByFrequency(arr) {
		f = {};
	  arr.forEach(function(i) { f[i] = 0; });
	  var u = arr.filter(function(i) { return ++f[i] == 1; });
		temp = u.sort(function(a, b) { return f[b] - f[a]; });
	  return [temp , f];
	}
});
