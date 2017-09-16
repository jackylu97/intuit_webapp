$(document).ready(function(){
  var income;
  var disposable;
  var expenses = 0;
  var fouronecontrib;
  var graph;

  $("#income").submit(function(event){
    event.preventDefault();
    new_income = $("#first_input").val();

    if (isNaN(new_income)) {
      alert("Must input numbers");
      return;
    }

    $("#first").addClass("hide");
    $("#rest").removeClass("hide");

    income = parseInt(new_income);
    disposable = income - expenses;
    render_graph(disposable);
    console.log(income);
  });

  $("#expense").submit(function(event){
    event.preventDefault();
    new_expense = $("#second_input").val();

    if (isNaN(new_expense)) {
      alert("Must input numbers");
      return;
    }

    expenses = parseInt(new_expense);
    disposable = income - expenses;
    console.log(expenses);
    console.log(disposable);
  });

  $("#myRange").on("change", function(){
    console.log(disposable);
    fouronecontrib = $("#myRange").val();
    fouronecontrib = parseInt(fouronecontrib) * 0.01;
    data = generate_data(disposable, fouronecontrib);
    update_graph(data);
  });
}
);

function generate_data(disposable, fouronecontrib) {
  data = [0];
  for (var i = 1; i < 50; i++) {
    var val = data[i-1] * 1.0161 + fouronecontrib * disposable
    data.push(val);
  }
  return data;
}

function update_graph(data) {
  d3.select("svg").remove();

  var m = [80, 200, 80, 200]; // margins
  var w = 1000 - m[1] - m[3]; // width
  var h = 400 - m[0] - m[2]; // height

  // X scale will fit all values from data[] within pixels 0-w
  var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
  // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
  var y = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([h, 0]);
    // automatically determining max range can work something like this
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

  // create a line function that can convert data[] into x and y points
  var line = d3.svg.line().interpolate("monotone")
    // assign the X function to plot our line as we wish
    .x(function(d,i) {
      // verbose logging to show what's actually being done
      // console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i);
    })
    .y(function(d) {
      // verbose logging to show what's actually being done
      // console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      // return the Y coordinate where we want to plot this datapoint
      return y(d);
    });

    // Add an SVG element with the desired dimensions and margin.
    graph = d3.select("#graph").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
        .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // create yAxis
    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(3);
    // Add the x-axis.
    graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    // Add the y-axis to the left
    graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(-25,0)")
          .call(yAxisLeft);

     var clip = graph.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("id", "clip-rect")
      .attr("x", "0")
      .attr("y", "0")
      .attr("width", w)
      .attr("height", h);


    // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    var path = graph.append("svg:path")
      .attr("class","path")
      .attr("clip-path", "url(#clip)")
      .attr("d", line(data));

}

function render_graph(disposable) {
  var m = [80, 200, 80, 200]; // margins
  var w = 1000 - m[1] - m[3]; // width
  var h = 400 - m[0] - m[2]; // height

  // create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
  data = [0];
  for (var i = 1; i < 50; i++) {
    data.push(data[i-1] * 1.0161 + 0.50*disposable);

  }

  // X scale will fit all values from data[] within pixels 0-w
  var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
  // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
  var y = d3.scale.linear().domain([d3.min(data), d3.max(data)]).range([h, 0]);
    // automatically determining max range can work something like this
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

  // create a line function that can convert data[] into x and y points
  var line = d3.svg.line().interpolate("monotone")
    // assign the X function to plot our line as we wish
    .x(function(d,i) {
      // verbose logging to show what's actually being done
      // console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      // return the X coordinate where we want to plot this datapoint
      return x(i);
    })
    .y(function(d) {
      // verbose logging to show what's actually being done
      // console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      // return the Y coordinate where we want to plot this datapoint
      return y(d);
    });

    // Add an SVG element with the desired dimensions and margin.
    graph = d3.select("#graph").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
        .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    // create yAxis
    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(3);
    // Add the x-axis.
    graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
    // Add the y-axis to the left
    graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(-25,0)")
          .call(yAxisLeft);

     var clip = graph.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("id", "clip-rect")
      .attr("x", "0")
      .attr("y", "0")
      .attr("width", w)
      .attr("height", h);


    // Add the line by appending an svg:path element with the data line we created above
    // do this AFTER the axes above so that the line is above the tick-lines
    var path = graph.append("svg:path")
      .attr("class","path")
      .attr("clip-path", "url(#clip)")
      .attr("d", line(data));
}
