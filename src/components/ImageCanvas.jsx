/* global ImageData */

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as tf from "@tensorflow/tfjs";

function toPixels(tensor) {
  const pixels = tensor.dataSync();
  const imageData = new ImageData(tensor.shape[1], tensor.shape[0]);
  if (tensor.shape.length === 2 || tensor.shape[2] === 1) {
    // Greyscale
    for (let i = 0; i < pixels.length; i += 1) {
      imageData.data[i * 4] = pixels[i];
      imageData.data[i * 4 + 1] = pixels[i];
      imageData.data[i * 4 + 2] = pixels[i];
      imageData.data[i * 4 + 3] = 255;
    }
  } else if (tensor.shape[2] === 3) {
    // RGB
    for (let i = 0; i < pixels.length / 3; i += 1) {
      imageData.data[i * 4] = pixels[i * 3];
      imageData.data[i * 4 + 1] = pixels[i * 3 + 1];
      imageData.data[i * 4 + 2] = pixels[i * 3 + 2];
      imageData.data[i * 4 + 3] = 255;
    }
  } else if (tensor.shape[2] === 4) {
    // RGBA
    imageData.data = pixels;
  }
  return imageData;
}
class ImageCanvas extends Component {
  constructor(props) {
    super(props);
    this.updateCanvas = this.updateCanvas.bind(this);
  }
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.canvas.getContext("2d");
    ctx.canvas.width = this.props.width;
    ctx.canvas.height = this.props.height;

    const scaleH = this.props.height / this.props.imageData.shape[0];
    const scaleW = this.props.width / this.props.imageData.shape[1];

    ctx.putImageData(toPixels(this.props.imageData), 0, 0);
    ctx.scale(scaleH, scaleW);
    ctx.drawImage(ctx.canvas, 0, 0);
  }

  render() {
    return (
      <div className="ImageCanvas">
        <canvas
          ref={c => {
            this.canvas = c;
          }}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

ImageCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageData: PropTypes.instanceOf(tf.Tensor).isRequired
};

export default ImageCanvas;
