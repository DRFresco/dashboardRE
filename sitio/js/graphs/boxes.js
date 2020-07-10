function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var boxDim=845;
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = boxDim - margin.left - margin.right,
  height = boxDim - margin.top - margin.bottom;

// append the svg object to the body of the page
graphjson("json/g500.json");

function graphjson(json){
  d3.select("svg").remove(); //CLEAN
    // read json data
d3.json(json, function(data) {
  var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  // Give the data to this cluster layout:
  var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .paddingTop(28)
    .paddingRight(7)
    .paddingInner(3)      // Padding between each rectangle
    //.paddingOuter(6)
    //.padding(20)
    (root)

  // prepare a color scale
  var color = d3.scaleOrdinal()
    .domain(["boss1", "boss2", "boss3"])
    .range([ "rgba(0, 55, 255, 0.7)", "darkgrey", "grey"])

  // And a opacity scale
  var opacity = d3.scaleLinear()
    .domain([10, 30])
    .range([.5,1])

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .attr('class', function (d) { return "boxes" })
      .style("stroke", "black")
      .style("fill", function(d){ return color(d.parent.data.name)} )
      .style("opacity", function(d){ return opacity(d.data.value)})

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name.toUpperCase() })
      .attr("font-size", "14px")
      .attr("fill", "black")

  // and to add the text labels
  svg
    .selectAll("vals")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+35})    // +20 to adjust position (lower)
      .text(function(d){ return "$ "+numberWithCommas(Math.round(d.data.value) )+" MXN" })
      .attr("font-size", "13px")
      .attr("fill", "white")
      .attr("background-color", "grey")

  // Add title for the 3 groups
  svg
    .selectAll("titles")
    .data(root.descendants().filter(function(d){return d.depth==1}))
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0})
      .attr("y", function(d){ return d.y0+21})
      .text(function(d){ return d.data.name })
      .attr("font-size", "19px")
      .attr("fill",  function(d){ return color(d.data.name)} )

  // Add title for the 3 groups
  svg
    .append("text")
      .attr("x", 0)
      .attr("y", 14)    // +20 to adjust position (lower)
      .text("Distribución de ingreso por cliente")
      .attr("font-size", "19px")
      .attr("fill",  "grey" )



  })
}
