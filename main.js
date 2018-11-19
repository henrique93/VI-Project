
var dataset, full_dataset;

d3.csv("MovieData.csv").then(function (data) {
	data.forEach(function(d) {
		d.revenue = +d.revenue;
		d.score = +d.score;
		//console.log(d.released)
		d.released = new Date(d.released);
	})
	console.log(data[0]);
    full_dataset = data;
    dataset = full_dataset;

	gen_timeline();
    gen_bubblechart();
});

//////////////////////////////////////////////////////////////
///////////////////////// TIMELINE ///////////////////////////
//////////////////////////////////////////////////////////////

var drag = d3.drag()
	.subject(function(d) {return d;})
	.on("start", dragstarted)
	.on("drag",dragged)
	.on("end",dragended);
	
function dragstarted(d){
	d3.event.sourceEvent.stopPropagation();
	d3.select(this).classed("dragging",true);
}

function dragged(d){
	d3.select(this).attr("x", d3.event.x);
}

function dragended(d){
	d3.select(this).classed("dragging",false);
}



function gen_timeline_window(svg){
	var w =	200;
	var h =	50;	
	var newg = svg.append("g")
      .data([{x: 1 / 2, y: h / 2}]);
		
	var rect =	newg.append("rect")
			.attr("id","drag")
			.attr("stroke","blue")
			.attr("fill-opacity","0")
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.attr("width",w)
			.attr("height",h)
			.call(drag);
}

function gen_timeline(){
	var w =	screen.width;
	var h =	100;
	var padding = 30;
	
	var svg = d3.select("#timeline")
		.append("svg")
		.attr("width",w)
		.attr("height",h);
	
	released_min = d3.min(dataset, function(d) {return d.released;});
	released_max =d3.max(dataset, function(d) {return d.released;});
	
	console.log(released_min + "," + released_max);
    var xscale = d3.scaleTime()
	   .domain([released_min, released_max])	  
		.range([padding,w-padding]);

	var xaxis = d3.axisBottom()
		.scale(xscale)
		.ticks(30);
	
	gX = svg.append("g")
		.attr("transform","translate(0," + (h-padding) + ")")
		.call(xaxis);
		
	gen_timeline_window(svg);
}

//////////////////////////////////////////////////////////////
/////////////////////// BUBBLE CHART /////////////////////////
//////////////////////////////////////////////////////////////

function gen_bubblechart() {
    var w = 10000;
    var h = 300;

    var svg = d3.select("#BubbleChart")
		.append("svg")
		.attr("width",w)
		.attr("height",h)


    var padding = 30;
    var bar_w = 15;
    var r = 5;

    var hscale = d3.scaleLinear()
		.domain([10 ,0])
		.range([padding,h-padding]);

    var xscale = d3.scaleTime()
	   .domain([d3.min(dataset, function(d) {return d.released;})
				,d3.max(dataset, function(d) {return d.released;})
		])
	   .range([padding,w-padding]);
					   
	var rscale = d3.scaleLinear()
		.domain([d3.min(dataset, function(d) {return d.revenue;})
			,d3.max(dataset, function(d) {return d.revenue;})
		])
		.range([ 5 , 50]);

    var yaxis = d3.axisLeft()
		.scale(hscale);

    var xaxis = d3.axisBottom()
		.scale(xscale)
			.ticks(30);

    var cscale = d3.scaleLinear()
		.domain([d3.min(dataset, function(d) { return  d.released;}),
			d3.max(dataset, function(d) { return d.released;})
		])
		.range(["red", "blue"]);


	gY = svg.append("g")
		.attr("transform","translate(30,0)")
		.attr("class","y axis")
		.call(yaxis);


	gX = svg.append("g")
		.attr("transform","translate(0," + (h-padding) + ")")
		.call(xaxis);

	svg.selectAll("circle")
		.data(dataset)
		.enter().append("circle")
			/*.on("mouseover", function(d) {
			dispatch.call("movieEnter",d , d);
			})*/
		.attr("r", function(d){ 
			console.log(d);
			return rscale(d.revenue);})
		.attr("stroke","blue")
		.attr("fill-opacity","0")
		.attr("cx",function(d) {
			return  xscale(d.released);
		})
		.attr("cy", function(d){ return hscale(d.score);})
		.attr("title", function(d){ return d.title;});

//////////////////////////////////////////////////////////////
///////////////////////// ???????? ///////////////////////////
//////////////////////////////////////////////////////////////
