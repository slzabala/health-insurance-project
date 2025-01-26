// Function to build demographic metadata
function buildMetadata(id) {
    d3.json("samples.json").then((data) => {
      let metadata = data.metadata;
      let resultArray = metadata.filter(sampleObj => sampleObj.id == id);
      let result = resultArray[0];
      let PANEL = d3.select("#sample-metadata");
   
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
   
      // Build gauge chart for claim denial rate
      buildGaugeChart(result.denialRate);
    });
  }
   
  // Function to build charts
  function buildCharts(id) {
    d3.json("samples.json").then((data) => {
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id == id);
      let result = resultArray[0];
   
      let charges = result.charges;
      let demographics = result.demographics;
      let claimTypes = result.claimTypes;
   
      // Create bar chart
      let barData = [{
        x: charges.slice(0, 10).reverse(),
        y: demographics.slice(0, 10).map(demo => `Category ${demo}`).reverse(),
        text: claimTypes.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }];
   
      let barLayout = {
        title: "Top 10 Insurance Claims by Amount",
        margin: { t: 30, l: 150 }
      };
   
      Plotly.newPlot("bar", barData, barLayout);
   
      // Create bubble chart
      let bubbleData = [{
        x: demographics,
        y: charges,
        text: claimTypes,
        mode: "markers",
        marker: {
          size: charges.map(val => val/1000),
          color: demographics,
          colorscale: "Earth"
        }
      }];
   
      let bubbleLayout = {
        title: "Claims Distribution",
        xaxis: { title: "Demographics" },
        yaxis: { title: "Claim Amount ($)" },
        hovermode: "closest"
      };
   
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  }
   
  // Function to build gauge chart
  function buildGaugeChart(denialRate) {
    let gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: denialRate,
      title: { text: "Claims Denial Rate (%)" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [0, 100] },
        steps: [
          { range: [0, 20], color: "lightgreen" },
          { range: [20, 40], color: "yellow" },
          { range: [40, 60], color: "orange" },
          { range: [60, 80], color: "coral" },
          { range: [80, 100], color: "red" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 90
        }
      }
    }];
   
    let gaugeLayout = { margin: { t: 0, b: 0 } };
   
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  }
   
  // Initialize the dashboard
  function init() {
    let selector = d3.select("#selDataset");
   
    d3.json("samples.json").then((data) => {
      let sampleNames = data.names;
   
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
   
      let firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
   
  // Handle change event
  function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
   
  // Initialize dashboard
  init();