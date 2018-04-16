import React, { Component } from "react";
import PropTypes from "prop-types";

import * as d3 from "d3";

class XYPlot extends Component {
  constructor(props) {
    super(props);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.renderChart();
  }

  renderChart() {
    let svg = d3.select(this.node).attr("border", 1);
    const {
      width,
      height,
      margin,
      data,
      xAccessor,
      yAccessor,
      colorAccessor,
      onHover
    } = this.props;

    // Add SVG border
    svg
      .append("rect")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .style("stroke", "black")
      .style("fill", "none")
      .style("stroke-width", 1);

    // Add margins
    svg = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .range([height, 0]);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xAccessor))
      .range([0, width]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Add circles for data
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 2)
      .style("fill", d => colorScale(colorAccessor(d)));

    // Add hover callback
    const hoverRect = svg
      .append("rect")
      .attr("height", height)
      .attr("width", width)
      .style("fill", "transparent");

    hoverRect.on("mousemove", () => {
      const [x, y] = d3.mouse(hoverRect.node());
      onHover({ y: yScale.invert(y), x: xScale.invert(x) });
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
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  }),
  onHover: PropTypes.func,
  xAccessor: PropTypes.func.isRequired,
  yAccessor: PropTypes.func.isRequired,
  colorAccessor: PropTypes.func.isRequired
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
