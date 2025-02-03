const DATA_PATH = "assets/json/insurance.json";

// Function to match region
function regionMatch(region, row) {
  return row.region === region;
}


// Function to build charts for a selected region
function buildCharts(region) {
  d3.json(DATA_PATH).then((data) => {
    console.log("Selected Region:", region);

  //  Filter the data for the selected region
      let regionData = data.filter(row => regionMatch(region, row));

  // 1. Bar Chart: Average Charges by Region    
  //=========================================
  // Calculate average claim charges by selected region
      let avgCharges = d3.mean(regionData, row => row.charges);

  // Clear the previous chart
      d3.select("#chart").html("");
    
  // Create bar chart
  const margin = { top: 60, right: 20, bottom: 40, left: 60 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;  

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Add title to the Average Charges chart
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text(`Average Charges by Region: ${region}`);

  // x axis (region)
  const x = d3.scaleBand()
    .range([0, width])
    .domain([region])
    .padding(0.1);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // y axis (average charges)
  const y = d3.scaleLinear()
    .domain([0, avgCharges * 1.2])
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Create bar for the selected region 
  svg.append("rect")
    .attr("x", x(region))
    .attr("y", y(avgCharges))
    .attr("width", x.bandwidth())
    .attr("height", height - y(avgCharges))
    .attr("fill", "#69b3a2");

  // Add label to the average charges 
  svg.append("text")
    .attr("x", x(region) + x.bandwidth() / 2)
    .attr("y", y(avgCharges) - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text(`$${avgCharges.toFixed(2)}`);

  // 2. Bar Chart: Top 10 Claims by Type
  // ====================================
  let claimTypes = d3.rollup(
    regionData, 
    v => d3.sum(v, d => d.charges),
    d => d.claimType
  );

  // Convert the map to an array and sort by charges
  let barData = Array.from(claimTypes, ([type, charges]) => ({ type, charges }))
    .sort((a, b) => d3.descending(a.charges, b.charges))
    .slice(0, 10); 

  // Debugging:
  console.log("Top 10 Claims by Type:", barData);

  // If there are no claims, display a message
  if (barData.length === 0) {
    d3.select("#bar").html("style='color: red; '>No claims found for the selected region.");
    return;
  }
    d3.select("#bar").html(""); // Clear the previous chart

  // Set dimensions and margins for the bar chart
  const barMargin = { top: 40, right: 20, bottom: 50, left: 100 };
const barWidth = 500 - barMargin.left - barMargin.right;
const barHeight = 400 - barMargin.top - barMargin.bottom;

    const barSvg = d3.select("#bar")
      .append("svg")
      .attr("width", barWidth + barMargin.left + barMargin.right)
      .attr("height", barHeight + barMargin.top + barMargin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Add title to the Top 10 Claims chart
  barSvg.append("text")
    .attr("x", barWidth / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text(`Top Claim Charges in ${region}`);

  // Define x and y scales
    const xBar = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.charges) * 1.1])
      .range([0, barWidth]);

    const yBar = d3.scaleBand()
      .domain(barData.map(d => d.type))
      .range([0, barHeight])
      .padding(0.1);

  // Draw x and y axes    
    barSvg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xBar));

    barSvg.append("g")
    .call(d3.axisLeft(yBar));

  // Draw bars
    barSvg.selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", d => yBar(d.type))
      .attr("width", d => xBar(d.charges))
      .attr("height", yBar.bandwidth())
      .attr("fill", "#69b3a2");

  // Add labels to the bars
    barSvg.selectAll(".bar-label")
      .data(barData)
      .enter()
      .append("text")
      .attr("x", d => xBar(d.charges) + 5)
      .attr("y", d => yBar(d.type) + yBar.bandwidth() / 2)
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("fill", "black")
      .text(d => `$${d.charges.toFixed(2)}`);

  // 3. Bubble Chart: Demographics vs. Claims
  // ========================================
  let bubbleData = d3.rollup(
    regionData,
    v => d3.sum(v, d => d.charges),
    d => d.sex
  );

  bubbleData = Array.from(bubbleData, ([demographics, charges]) => ({ demographics, charges }));

  d3.select("#bubble").html(""); // Clear the previous chart

  // Set dimensions and margins for the bubble chart
  const bubbleMargin = { top: 40, right: 20, bottom: 50, left: 60 };
  const bubbleWidth = 500 - bubbleMargin.left - bubbleMargin.right;
  const bubbleHeight = 400 - bubbleMargin.top - bubbleMargin.bottom;

  const bubbleSvg = d3.select("#bubble")
    .append("svg")
    .attr("width", bubbleWidth + bubbleMargin.left + bubbleMargin.right)
    .attr("height", bubbleHeight + bubbleMargin.top + bubbleMargin.bottom)
    .append("g")
    .attr("transform", `translate(${bubbleMargin.left}, ${bubbleMargin.top})`);

  // Add title to the Bubble Chart
bubbleSvg.append("text")
    .attr("x", bubbleWidth / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text(`Demographics vs. Claims in ${region}`);

  // Define x and y scales
  const xBubble = d3.scaleBand()
    .domain(bubbleData.map(d => d.demographics))
    .range([0, bubbleWidth])
    .padding(0.1);
  
  bubbleSvg.append("g")
    .attr("transform", `translate(0, ${bubbleHeight})`)
    .call(d3.axisBottom(xBubble));

  const yBubble = d3.scaleLinear()
    .domain([0, d3.max(bubbleData, d => d.charges)])
    .range([bubbleHeight, 0]);

  bubbleSvg.append("g")
    .call(d3.axisLeft(yBubble));

  bubbleSvg.selectAll("circle")
    .data(bubbleData)
    .enter()
    .append("circle")
    .attr("cx", d => xBubble(d.demographics) + xBubble.bandwidth() / 2)
    .attr("cy", d => yBubble(d.charges))
    .attr("r", d => Math.sqrt(d.charges) / 10)
    .style("fill", "#69b3a2")
    .attr("opacity", 0.7)
  });
}
 

// Initialize the dashboard
function init() {
  let selector = d3.select("#selRegion");
 
  d3.json(DATA_PATH).then((data) => {
    let regionNames = [...new Set(data.map((row) => row.region))];

    // Add region names to the dropdown
    regionNames.forEach(region => {
      selector
        .append("option")
        .text(region)
        .attr("value", region);
  });
 
  // Build the charts with the first region in the list
  let firstRegion = regionNames[0];
  buildCharts(firstRegion);
});
}
 

// Handle change event
function optionChanged(newRegion) {
  buildCharts(newRegion);
}
 

// Initialize dashboard
init();