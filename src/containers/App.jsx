import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import gaussian from "gaussian";

import ImageCanvas from "../components/ImageCanvas";
import XYPlot from "../components/XYPlot";

import "./App.css";

import encodedData from "../encoded.json";
const MODEL_PATH = "models/generatorjs/model.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);

    this.norm = gaussian(1, 1);

    this.state = {
      model: null,
      digitImg: tf.zeros([28, 28]),
      mu: 0,
      sigma: 0
    };
  }

  componentDidMount() {
    tf
      .loadModel(MODEL_PATH)
      .then(model => this.setState({ model }))
      .then(() => this.getImage())
      .then(digitImg => this.setState({ digitImg }));
  }

  async getImage() {
    const { model, mu, sigma } = this.state;
    const zSample = tf.tensor([[mu, sigma]]);
    return model
      .predict(zSample)
      .mul(tf.scalar(255.0))
      .reshape([28, 28]);
  }

  render() {
    return this.state.model === null ? (
      <div>Loading model</div>
    ) : (
      <div className="App">
        <p>Mu: {Math.round(this.norm.cdf(this.state.mu) * 1000) / 1000}</p>
        <p>
          Sigma: {Math.round(this.norm.cdf(this.state.sigma) * 1000) / 1000}
        </p>
        <ImageCanvas width={300} height={300} imageData={this.state.digitImg} />

        <XYPlot
          data={encodedData}
          width={300 - 10 - 10}
          height={300 - 20 - 10}
          xAccessor={d => d[0]}
          yAccessor={d => d[1]}
          colorAccessor={d => d[2]}
          margin={{ top: 20, bottom: 10, left: 10, right: 10 }}
          onHover={({ x, y }) => {
            this.setState({ sigma: y, mu: x });
            this.getImage().then(digitImg => this.setState({ digitImg }));
          }}
        />
      </div>
    );
  }
}

export default App;
