import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import gaussian from "gaussian";

import ImageCanvas from "../components/ImageCanvas";
import XYPlot from "../components/XYPlot";
import Explanation from "../components/Explanation";
import { rounder } from "../utils";

import "./App.css";

import encodedData from "../encoded.json";

const MODEL_PATH = "models/generatorjs/model.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);

    this.norm = gaussian(0, 1);

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
      <div>Loading, please wait</div>
    ) : (
      <div className="App">
        <h1>VAE Latent Space Explorer</h1>
        <div className="ImageDisplay">
          <ImageCanvas
            width={500}
            height={500}
            imageData={this.state.digitImg}
          />
        </div>

        <div className="ChartDisplay">
          <XYPlot
            data={encodedData}
            width={500 - 10 - 10}
            height={500 - 20 - 10}
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
        <p>Mu: {rounder(this.norm.cdf(this.state.mu), 3)}</p>
        <p>Sigma: {rounder(this.norm.cdf(this.state.sigma), 3)}</p>
        <div className="Explanation">
          <Explanation />
        </div>

        <h5>Created by Taylor Denouden (April 2018)</h5>
      </div>
    );
  }
}

export default App;
