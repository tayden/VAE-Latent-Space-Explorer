import React, { Component } from "react";
import PropTypes from "prop-types";

import * as d3 from "d3";

class XYPlot extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    // this.createChart();
  }

  createChart() {
    let svg = d3.select(this.node).attr("border", 1);
    const h =
      this.props.height + this.props.margin.top + this.props.margin.bottom;
    const w =
      this.props.width + this.props.margin.left + this.props.margin.right;

    const border = svg
      .append("rect")
      .attr("height", h)
      .attr("width", w)
      .style("stroke", "black")
      .style("fill", "none")
      .style("stroke-width", 1);

    svg = svg
      .append("g")
      .attr(
        "transform",
        `translate(${this.props.margin.left}, ${this.props.margin.top})`
      );

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(this.props.data, d => d.y))
      .range([this.props.height, 0]);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(this.props.data, d => d.x))
      .range([0, this.props.width]);

    svg
      .selectAll("circle")
      .data(this.props.data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .style("fill", "#fe9922")
      .style("stroke", "black")
      .style("stroke-width", 1);

    svg
      .selectAll("circle")
      .data(this.props.data)
      .exit()
      .remove();

    // Add hover callback
    const hoverRect = svg
      .append("rect")
      .attr("height", this.props.height)
      .attr("width", this.props.width)
      .style("fill", "transparent");

    hoverRect.on("mousemove", () => {
      const [x, y] = d3.mouse(hoverRect.node());
      this.props.onHover({ y: yScale.invert(y), x: xScale.invert(x) });
    });
  }

  render() {
    return (
      <svg
        ref={node => {
          this.node = node;
        }}
        width={
          this.props.width + this.props.margin.left + this.props.margin.right
        }
        height={
          this.props.height + this.props.margin.top + this.props.margin.bottom
        }
      />
    );
  }
}

XYPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      label: PropTypes.number.isRequired
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  }),
  onHover: PropTypes.func
};

XYPlot.defaultProps = {
  margin: {
    top: 20,
    bottom: 30,
    left: 30,
    right: 20
  },
  onHover: () => {}
};

export default XYPlot;
