import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class Child1 extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props.data1)
  }

  componentDidUpdate() {
    let data = this.props.data1

    // Set Dimensions and Margins of Graph
    let margin = {top: 10, right: 10, bottom: 30, left: 20}, w = 500-margin.left-margin.right, h = 300-margin.top-margin.bottom;

    let container = d3.select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X Axis
    let x_data = data.map(d => d.total_bill)
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);

    container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g").attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));
    
    //Add Y Axis
    let y_data = data.map(d => d.tip)
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "y_axis_g").attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

    container.selectAll(".circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x_scale(d.total_bill))
      .attr("cy", d => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "#69b3a2");
    
    
    console.log("ComponentDidUpdate", this.props.data1)
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
