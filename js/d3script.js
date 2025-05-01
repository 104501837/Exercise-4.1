// Create responsive SVG
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 1600")
  .style("border", "1px solid black");

// Load and clean data
d3.csv("data/data clean.csv", d => ({
  brand: d["Brand_Reg"]?.trim(),
  count: +d["Labelled energy consumption (kWh/year)"]?.trim()
}))
.then(data => {
  // Sort descending
  data.sort((a, b) => d3.descending(a.count, b.count));
  createBarChart(data);
});

const createBarChart = (data) => {
  const width = 500;
  const height = 1600;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, width - 100]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, height])
    .padding(0.1);

  // Group each bar and label
  const barAndLabel = svg.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Rectangle (bar)
  barAndLabel.append("rect")
    .attr("x", 100)
    .attr("y", 0)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#2a9d8f");

  // Brand label (left of bar)
  barAndLabel.append("text")
    .text(d => d.brand)
    .attr("x", 95)
    .attr("y", yScale.bandwidth() / 2)
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");

  // Count label (inside/right of bar)
  barAndLabel.append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 4)
    .attr("y", yScale.bandwidth() / 2 + 1)
    .attr("dominant-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px");
};
