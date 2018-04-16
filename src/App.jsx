import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import gaussian from "gaussian";
import "./App.css";
import ImageCanvas from "./ImageCanvas";

const MODEL_PATH = "models/generatorjs/model.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      digitImg: tf.zeros([28, 28]),
      mu: 0.5,
      sigma: 0.5
    };
    this.norm = gaussian(1, 1);

    this.getImage = this.getImage.bind(this);
    this.handleMuChange = event => {
      this.setState({ mu: event.target.value / 100 });
      this.getImage().then(digitImg => this.setState({ digitImg }));
    };
    this.handleSigmaChange = event => {
      this.setState({ sigma: event.target.value / 100 });
      this.getImage().then(digitImg => this.setState({ digitImg }));
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VAE Digit Visualization</h1>
        </header>
        <p className="App-intro" />
        <div>
          <form>
            <label htmlFor="mu">
              Mu: {this.state.mu}
              <input
                type="range"
                name="mu"
                min="5"
                max="95"
                value={this.state.mu * 100}
                onChange={this.handleMuChange}
              />
            </label>
            <br />
            <label htmlFor="sigma">
              Sigma: {this.state.sigma}
              <input
                type="range"
                name="sigma"
                min="5"
                max="95"
                value={this.state.sigma * 100}
                onChange={this.handleSigmaChange}
              />
            </label>
          </form>

          <ImageCanvas
            width={300}
            height={300}
            imageData={this.state.digitImg}
          />
        </div>
      </div>
    );
  }
}

export default App;
