var dataset = [
	{label: 'nback_0', count: 10},
	{label: 'nback_1', count: 20},
	{label: 'nback_2', count: 30},
	{label: 'nback_3', count: 40}
];

var width = 360;
var height = 360;
var donutWidth = 75;
var radius = Math.min(width, height) /2;
var color = d3.scaleOrdinal(d3.schemeCategory20b);
var legendRectSize = 18;
var legendSpacing = 4;

var svg = d3.select('#chart')
	.append('svg')
	.attr('width', width)
	.attr('height', height)
	.append('g')
	.attr('transform', 'translate('+ (width/2) + 
						',' + (height/2) +')');

var arc = d3.arc()
	.innerRadius(radius-donutWidth)
	.outerRadius(radius);

var pie = d3.pie()
	.value(function(d){
		return d.count;
	})
	.sort(null);

var path = svg.selectAll('path')
	.data(pie(dataset))
	.enter()
	.append('path')
	.attr('d', arc)
	.attr('fill', function(d, i){
		return color(d.data.label);
	});

var legend = svg.selectAll('.legend')
	.data(color.domain())
	.enter()
	.append('g')
	.attr('class', 'legend')
	.attr('transform', function(d, i){
		var height = legendRectSize + legendSpacing;
		var offset = height * color.domain().length /2;
		var horz = -2 * legendRectSize;
		var vert = i * height - offset;
		return 'translate(' + horz + ',' + vert + ')';
	});

legend.append('rect')
	.attr('width', legendRectSize)
	.attr('height', legendRectSize)
	.style('fill', color)
	.style('stroke', color);

legend.append('text')
	.attr('x', legendRectSize + legendSpacing)
	.attr('y', legendRectSize - legendSpacing)
	.text(function(d){
		return d;
	});

	
function getData(){
	while(nBackResults == null){
		return null;
	}
	
	console.log('nback0Passes: ' + nBackResults.nback0 + '%');
	console.log('nback1Passes: ' + nBackResults.nback1 + '%');
	console.log('nback2Passes: ' + nBackResults.nback2 + '%');
	console.log('nback3Passes: ' + nBackResults.nback3 + '%');
}
var nBackResults = getNbackPassRate();
getData();
	


	