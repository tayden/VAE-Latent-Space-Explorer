import React, { Component } from "react";
import * as tf from "@tensorflow/tfjs";
import gaussian from "gaussian";
import "./App.css";
import ImageCanvas from "../components/ImageCanvas";
import XYPlot from "../components/XYPlot";

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">VAE Digit Visualization</h1>
        </header>
        <p className="App-intro" />
        <div>
          <p>Mu: {this.state.mu}</p>
          <p>Sigma: {this.state.sigma}</p>

          <ImageCanvas
            width={300}
            height={300}
            imageData={this.state.digitImg}
          />

          <XYPlot
            data={[
              { x: -4, y: -4, label: 0 },
              { x: -1, y: -4, label: 1 },
              { x: -2, y: -2, label: 2 },
              { x: -1, y: -3, label: 3 },
              { x: 0, y: 0, label: 4 },
              { x: 1, y: 0, label: 5 },
              { x: 4, y: 2, label: 6 },
              { x: 4, y: 4, label: 7 },
              { x: -2, y: 4, label: 8 },
              { x: -3, y: 4, label: 9 },
              { x: 4, y: -3, label: 7 }
            ]}
            width={300 - 10 - 10}
            height={300 - 20 - 10}
            margin={{ top: 20, bottom: 10, left: 10, right: 10 }}
            onHover={({ x, y }) => {
              this.setState({ sigma: x });
              this.setState({ mu: y });
              this.getImage().then(digitImg => this.setState({ digitImg }));
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
