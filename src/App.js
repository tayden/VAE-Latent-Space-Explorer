import React, { Component } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import gaussian from "gaussian";
import ImageCanvas from "./ImageCanvas";

class App extends Component {
  async fetchModel() {
    return tf.loadModel("models/generatorjs/model.json");
  }

  async getImage() {
    const { model, mu, sigma } = this.state;
    const z_sample = tf.tensor([[mu, sigma]]);
    const pred = model
      .predict(z_sample)
      .mul(tf.scalar(255.0))
      .reshape([28, 28]);
    return pred;
  }

  constructor(props) {
    super(props);
    this.state = {
      model: null,
      digit_img: tf.zeros([28, 28]),
      mu: 0.5,
      sigma: 0.5
    };
    this.norm = gaussian(1, 1);

    this.getImage = this.getImage.bind(this);
    this.fetchModel = this.fetchModel.bind(this);

    this.handleMuChange = event => {
      this.setState({ mu: event.target.value / 100 });
      this.getImage().then(digit_img => this.setState({ digit_img }));
    };
    this.handleSigmaChange = event => {
      this.setState({ sigma: event.target.value / 100 });
      this.getImage().then(digit_img => this.setState({ digit_img }));
    };
  }

  componentDidMount() {
    this.fetchModel()
      .then(model => this.setState({ model }))
      .then(() => this.getImage())
      .then(digit_img => this.setState({ digit_img }));
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
            <label>
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
            <label>
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
            imageData={this.state.digit_img}
          />
        </div>
      </div>
    );
  }
}

export default App;
