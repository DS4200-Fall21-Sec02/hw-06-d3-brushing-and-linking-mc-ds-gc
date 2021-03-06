var margin = {top: 10, right: 30, bottom: 50, left: 60},
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append svg object to the body of the page to house Scatterplot 1
var svg1 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Scatterplot 2
var svg2 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Bar chart
var svg3 = d3
.select("#dataviz_brushScatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define color scale
var color = d3
.scaleOrdinal()
.domain(["setosa", "versicolor", "virginica"])
.range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Read data and make plots 
d3.csv("data/iris.csv").then((data) => {

  //Scatterplot 1
  {
    var xKey1 = "Sepal_Length";
    var yKey1 = "Petal_Length";

    //Add X axis
    var x1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[xKey1])))
    .range([0, width]);
    svg1
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .call((g) =>
        g
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(xKey1)
    );

    //Add Y axis
    var y1 = d3
    .scaleLinear()
    .domain(d3.extent(data.map((val) => val[yKey1])))
    .range([height, 0]);
    svg1
    .append("g")
    .call(d3.axisLeft(y1))
    .call((g) =>
        g
        .append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(yKey1)
    );

    // Add dots
    var myCircle1 = svg1
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("cx", function (d) {
      return x1(d[xKey1]);
    })
    .attr("cy", function (d) {
      return y1(d[yKey1]);
    })
    .attr("r", 8)
    .style("fill", function (d) {
      return color(d.Species);
    })
    .style("opacity", 0.5);

    //TODO: Define a brush

    //TODO: Add brush to the svg

  }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)

  var xKey1 = "Sepal_Width";
  var yKey1 = "Petal_Width";

  //Add X axis
  var x2 = d3
  .scaleLinear()
  .domain(d3.extent(data.map((val) => val[xKey1])))
  .range([0, width]);
  svg2
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x2))
  .call((g) =>
      g
      .append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text(xKey1)
  );

  //Add Y axis
  var y2 = d3
  .scaleLinear()
  .domain(d3.extent(data.map((val) => val[yKey1])))
  .range([height, 0]);
  svg2
  .append("g")
  .call(d3.axisLeft(y2))
  .call((g) =>
      g
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(yKey1)
  );

  // Add dots
  let myCircle2 = svg2
  .append("g")
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("id", (d) => d.id)
  .attr("cx", function (d) {
    return x2(d[xKey1]);
  })
  .attr("cy", function (d) {
    return y2(d[yKey1]);
  })
  .attr("r", 8)
  .style("fill", function (d) {
    return color(d.Species);
  })
  .style("opacity", 0.5);

  //TODO: Barchart with counts of different species

  var dataNest = d3.group(data, d => d.Species)

  console.log(dataNest);

  let x = d3.scaleBand()
  .domain(data.map(d => d.Species))
  .range([0, width])
  .padding([(0.05)])

  svg3
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .call((g) =>
      g
      .append("text")
      .attr("x", width)
      .attr("y", margin.bottom - 4)
      .attr("fill", "currentColor")
      .attr("text-anchor", "end")
      .text("Species")
  );

  let y = d3
  .scaleLinear()
  .domain([0, d3.max(dataNest, d => d[1].length)])
  .range([height, 0]);
  svg3
  .append("g")
  .call(d3.axisLeft(y))
  .call((g) =>
      g
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text()
  );

  let bars = svg3.append("g")
  .selectAll("rect")
  .data(dataNest)
  .join("rect")
  .attr("transform", d => `translate(${x(d[0]) + x.bandwidth() / 4},0)`)
  .attr("width", x.bandwidth() / 2)
  .attr("height", d => height - y(d[1].length))
  .style("fill", function (d) {
    return color(d[0]);
  })

  //Brushing Code---------------------------------------------------------------------------------------------

  let brush1 = d3.brush();
  let brush2 = d3.brush();

  //Removes existing brushes from svg
  function clear() {
    svg1.call(brush1.clear())
    svg2.call(brush2.clear())
  }

  svg1
  .call(
      brush1                // Add the brush feature using the d3.brush function
      .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart1) // Each time the brush selection changes, trigger the 'updateChart' function

  )



  svg2
  .call(
      brush2                // Add the brush feature using the d3.brush function
      .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart2)
       // Each time the brush selection changes, trigger the 'updateChart' function
  )



  //Is called when we brush on scatterplot #1
  function updateChart1(brushEvent) {
     svg2.call(brush2.clear)
    
    if (brushEvent === null) {
      return;
    }
    let species = [];
    //TODO: Check all the circles that are within the brush region in Scatterplot 1
    myCircle1.classed("selected", function (d) {
      if (isBrushed(brushEvent, x1(d["Sepal_Length"]), y1(d["Petal_Length"]))) {
        species.push(d["Species"]);
        return true;
      }
    });
    //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
    myCircle2.classed("selected", function (d) {
      return isBrushed(brushEvent, x1(d["Sepal_Length"]), y1(d["Petal_Length"]))
    });
    //TODO: Select bars in bar chart based on species selected in Scatterplot 1
    bars.classed("selected", function (d) {
      return species.includes(d[0])
    });
  }

  //Is called when we brush on scatterplot #2
  function updateChart2(brushEvent) {


    if (brushEvent === null) {
      return;
    }
    let species = [];
    //TODO: Check all the circles that are within the brush region in Scatterplot 1
    myCircle1.classed("selected", function (d) {
      if (isBrushed(brushEvent, x2(d["Sepal_Width"]), y2(d["Petal_Width"]))) {
        species.push(d["Species"]);
        return true;
      }
    }

    );
    //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
    myCircle2.classed("selected", function (d) {
      return isBrushed(brushEvent, x2(d["Sepal_Width"]), y2(d["Petal_Width"]))
    });

    //TODO: Select bars in bar chart based on species selected in Scatterplot 2
    bars.classed("selected", function (d) {
      return species.includes(d[0])
    });


  }

  //Finds dots within the brushed region
  function isBrushed(brushEvent, cx, cy) {
    if(brushEvent.selection !== null) {
    let x0 = brushEvent.selection[0][0];
    let x1 = brushEvent.selection[1][0];
    let y0 = brushEvent.selection[0][1];
    let y1 = brushEvent.selection[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  }}
});
