import React, { Component } from "react";

function toPixels(tensor) {
  const pixels = tensor.dataSync();
  const imageData = new ImageData(tensor.shape[1], tensor.shape[0]);
  if (tensor.shape.length === 2 || tensor.shape[2] === 1) {
    // Grayscale
    for (let i = 0; i < pixels.length; i++) {
      imageData.data[i * 4 + 0] = pixels[i];
      imageData.data[i * 4 + 1] = pixels[i];
      imageData.data[i * 4 + 2] = pixels[i];
      imageData.data[i * 4 + 3] = 255;
    }
  } else if (tensor.shape[2] === 3) {
    // RGB
    for (let i = 0; i < pixels.length / 3; i++) {
      imageData.data[i * 4 + 0] = pixels[i * 3 + 0];
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
  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.canvas.width = this.props.width;
    ctx.canvas.height = this.props.height;

    const scale_h = this.props.height / this.props.imageData.shape[0];
    const scale_w = this.props.width / this.props.imageData.shape[1];

    ctx.putImageData(toPixels(this.props.imageData), 0, 0);
    ctx.scale(scale_h, scale_w);
    ctx.drawImage(ctx.canvas, 0, 0);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  constructor(props) {
    super(props);
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  render() {
    return (
      <div className="ImageCanvas">
        <canvas
          ref="canvas"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

export default ImageCanvas;
