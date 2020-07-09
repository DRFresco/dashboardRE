
// set the dimensions and marginbarss of the graph
var marginbars = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - marginbars.left - marginbars.right,
    heightb = 300 - marginbars.top - marginbars.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([heightb, 0]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left marginbars
var svg = d3.select("#historyviz").append("svg")
    .attr("width", width + marginbars.left + marginbars.right)
    .attr("height", heightb + marginbars.top + marginbars.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + marginbars.left + "," + marginbars.top + ")");

// get the data
d3.csv("csv/bars.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.sales = +d.sales;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.salesperson; }));
  y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.salesperson); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); })
      .attr("height", function(d) { return heightb - y(d.sales); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + heightb + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});