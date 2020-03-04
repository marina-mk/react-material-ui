import React, { useEffect } from "react";
import * as d3 from "d3";

const drawChart = () => {
  const width = '100%';
  const height = 150;
  const data = [12, 5, 6, 6, 9, 10];

  const svg = d3.select("#d3_bar_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
};

const BarChart = () => {
  useEffect(() => {
    drawChart();
  }, []);

  return (<div id="d3_bar_chart"></div>);
}

export default BarChart;
