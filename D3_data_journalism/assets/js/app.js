// Set svg height and width 
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

// Select scatter plot div from html, append SVG area to it, and set its dimensions
var svg = d3.select('#scatter')
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function (Data) {

    // Print the Data
    console.log(Data);

    // Cast the variables to numeric
    Data.forEach(function (data) {
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

    // Create two new functions passing the scales in as arguments to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append an SVG path and plot the points "Smokers vs healthcare"
    chartGroup.append("g")
        .selectAll('dot')
        .data(Data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xLinearScale(d.smokes); })
        .attr("cy", function (d) { return yLinearScale(d.healthcare); })
        .attr("r", 12)
        .style("fill", "#69acb3")
        .attr("stroke", "white")
        // .append("text").text(function (d) { return (d.abbr); })
        // .attr("cx", function (d) { return xLinearScale(d.smokes); })
        // .attr("cy", function (d) { return yLinearScale(d.healthcare) + 10 / 2.5;; })

    chartGroup.selectAll("text.abr")
        .data(Data)
        .enter()
        .append("text")
        .attr("class", "abr")
        .attr("x", d => xLinearScale(d.smokes)-10)
        .attr("y", d => yLinearScale(d.healthcare)+4)
        .attr("fill", "white")
        .text(d => d.abbr)


        
    // Create the left axis inside of the SVG 
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    //Create the bottom axis inside of the SVG 
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

        var leftTextX = 0 
        var leftTextY = 0

    // Add axes 
    chartGroup.append("text")
        .attr("x", 400)
        .attr("y", 420)
        .attr("class", "aText active x")
        .text("Smokes (%)");

        chartGroup.append("text")
        .attr("x", -180)
        .attr("y", -35)
        .attr(
            "transform",
            "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
          )
        .attr("class", "aText active y")
        .text("Lacks healthcare (%)");
    

}).catch(function (error) {
    console.log(error);
});
