import React from "react";

import "./Explanation.css";

const Explanation = () => (
  <div align="left">
    <div className="textbox">
      <div className="header">
        <h2>
          A brief explanation for those familiar with variational autoencoders
        </h2>
      </div>
      <div className="content">
        <p>
          The above visualization was created using the 2-dimensional bottleneck
          features of a variational autoencoder. 50 000 handwritten numerical
          digit images (from MNIST) of size 28x28 were used to train the weights
          of the autoencoder that restricts the bottleneck features to roughly
          follow a unit Gaussian. After training, the test set was encoded and
          the latent space vectors produced were recorded and are displayed in
          the above scatterplot. Moving your mouse around this plot samples 2
          latent space vectors from the encoded unit Gaussian and passes these
          values to the decoder network. The decoder network produces a new
          generated handwritten digit which is displayed via an html Canvas.
        </p>
        <p>
          All code runs in the browser using the recently released
          Tensorflow-js. The model was originally implemented in Keras and
          imported into the browser. React and D3 are responsible for handling
          the page updates and drawing the chart visualization.
        </p>
      </div>
    </div>

    <div className="textbox">
      <div className="header">
        <h2>
          What is variational autoencoder?
        </h2>
      </div>
      <div className="content">
        <p>
          For an great explanation, check out{" "}
          <a href="http://kvfrans.com/variational-autoencoders-explained/">
            this excellent blog post
          </a>{" "}
          by Kevin Frans.
        </p>
      </div>
    </div>

    {/* <div className="textbox">
      <div className="header">
        <h2>Implementation details</h2>
      </div>
      <div className="content">
        <h4>Encoder</h4>
        <code>
          2D convolution (32 filters, 3x3 kernel, stride 2, padding 'same')<br />
          batch normalization<br />
          leaky relu activation<br />
          <br />
          2D convolution (64 filters, 3x3 kernel, stride 2, padding 'same')<br />
          batch normalization<br />
          leaky relu activation<br />
          <br />
          2D convolution (128 filters, 3x3 kernel, stride 2, padding 'same')<br />
          batch normalization<br />
          leaky relu activation<br />
          <br />
          flatten to one dimensional vector<br />
          <br />
          dense layer, output size 100<br />
          relu activation<br />
          <br />
          two parallel dense layers, output size 2 each
        </code>
        <h4>Variational layer</h4>
        <p>
          The final two output layers of size 2 would now typically be used to
          decode back to their original as best possible. These distilled layers
          try to capture the essence of the differences between different
          images. That is, these latent factors represented a distinct image
          using just 4 values.
          <br />
          In VAEs, we constrain these latent factors so they roughly follow a
          unit Gaussian distribution. This restriction allows us to generate new
          images later by simply sampling values from the unit Gaussian, and
          decoding that latent vector back to a normal image. This operation is
          as follows:
        </p>
        <code>
          mu := [2 values from one of the final dense layers]<br />
          sigma := [2 values from the other final dense layer]<br />
          <br />
          # sample 2 values from unit Gaussian<br />
          epsilon = [e1, e2] ~ N(0, 1)<br />
          <br />
          z = mu + e^(sigma / 2) * epsilon
        </code>
        <h4>Decoder</h4>
        <p>The Decoder inverts the Encoder layers</p>
        <code>
          dense layer of size 100<br />
          dense layer of size 2048<br />
          relu activation <br />
          reshape size 2048 vector to (128, 4, 4)
          <br />
          <br />
          2d convolution transpose (64 filters, 3x3 kernel)<br />
          batch normalization<br />
          leaky relu activation<br />
          <br />
          2d convolution transpose (32 filters, 3x3 kernel)<br />
          batch normalization<br />
          {/* leaky relu activation<br />
          <br />
          2d convolution transpose (1 filter, 3x3 kernel)<br />
          sigmoid activation
        </code>
      </div>
    </div> */}
  </div>
);

export default Explanation;
