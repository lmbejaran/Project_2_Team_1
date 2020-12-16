var svgWidth = 750;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("static/js/correlation_data2.csv").then(function(correlationData) {
  //console.log(correlationData)
    correlationData.forEach(function(data) {
      data.Cases = +data.Cases;
      data.Deaths = +data.Deaths;
    });

    var i;
    for (i = correlationData.length -1; i>=0; i-= 1) {
      if (correlationData[i].Cases === 0 && correlationData[i].Deaths === 0) {
        correlationData.splice(i, 1);
      };
    }
    console.log(correlationData)

    var xLinearScale = d3.scaleLinear()
      .domain([10000, 100000])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([500, 6500])
      .range([height, 0]);

    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(correlationData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.Cases))
    .attr("cy", d => yLinearScale(d.Deaths))
    .attr("r", "10")
    .attr("fill", "#89bdd3")
    .attr("opacity", ".5");

    var stateNames = chartGroup.selectAll().data(correlationData).enter().append("text");

    stateNames
      .attr("x", function(d) {
        return xLinearScale(d.Cases);
      })
      .attr("y", function(d) {
        return yLinearScale(d.Deaths);
      })
      .text(function(d) {
        return d.Boroughs;
      })
      .attr("font-family", "arial")
      .attr("font-size", "8px")
      .attr("text-anchor", "middle")
      .attr("fill", "black");

    
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.Boroughs}<br>No. of Cases: ${d.Cases}<br>No. of Deaths: ${d.Deaths}`);
      });


    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });


    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Deaths");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Cases");
  }).catch(function(error) {
    console.log(error);
  });
