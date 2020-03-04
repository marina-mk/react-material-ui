import React, { useEffect } from "react";
import * as d3 from "d3";

const data = [
  {name: "<5", value: 19912018},
  {name: "5-9", value: 20501982},
  {name: "10-14", value: 20679786},
  {name: "15-19", value: 21354481},
  {name: "20-24", value: 22604232},
  {name: "25-29", value: 21698010},
  {name: "30-34", value: 21183639},
  {name: "35-39", value: 19855782},
  {name: "40-44", value: 20796128},
  {name: "45-49", value: 21370368},
  {name: "50-54", value: 22525490},
  {name: "55-59", value: 21001947},
  {name: "60-64", value: 18415681},
  {name: "65-69", value: 14547446},
  {name: "70-74", value: 10587721},
  {name: "75-79", value: 77301290}
];

const color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

const width = 25;
const height = 10;
const radius = Math.min(width, height) / 2;
const arc = d3.arc().innerRadius(2).outerRadius(5);

const pie = d3.pie().padAngle(0.005).sort(null).value(d => d.value);

const drawChart = () => {
  const arcs = pie(data);
  const svg = d3.select("#d3_donut_chart").append("svg").attr("viewBox", [-width/2, -height/2, width, height]);

  svg.selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc);

  svg.append("g")
      .attr("font-size", 0.3)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
    .call(text => text.append("tspan")
      .attr("font-weight", "bold")
      .text(d => d.data.name));
};

const DonutChart = () => {
  useEffect(() => {
    drawChart();
  }, []);

  return (<div id="d3_donut_chart"></div>);
}

export default DonutChart;
