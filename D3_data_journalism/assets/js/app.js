// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select('#scatter')
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(Data) {

    // Print the Data
    console.log(Data);
  
    // Cast the variables to numeric
    Data.forEach(function(data) {
      data.smokes = +data.smokes;
      data.healthcare = +data.healthcare;
    });
  
    // Configure a linear X scale for Smokers
    var xLinearScale = d3.scaleLinear()
      .domain(d3.extent(Data, data => data.smokes))
      .range([0, chartWidth]);
  
    // Configure a linear y scale for insured by healthcare
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(Data, data => data.healthcare)])
      .range([chartHeight, 0]);
  
    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine = d3.line()
      .x(data => xLinearScale(data.smokes))
      .y(data => yLinearScale(data.healthcare));
  
    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
      // The drawLine function returns the instructions for creating the line for forceData
      .attr("d", drawLine(Data))
      .classed("line", true);
  
    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);
  
    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);
  }).catch(function(error) {
    console.log(error);
  });
  