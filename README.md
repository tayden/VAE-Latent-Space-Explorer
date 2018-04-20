# VAE Latent Space Explorer

This application is a toy visualization that allows you to generate new images of 28x28 numerical digits using a variational autoencoder.

## [You can view the visualization here](https://tayden.github.io/VAE-Latent-Space-Explorer/)

## Implementation details

The variational autoencoder was implemented using Keras and the relevant code is located in the scripts directory in a Jupyter notebook.
Once the model is trained, the architecture and weights are saved in a format that can be ingested by tensorflow-js. Tensorflow-js handles
implementing the model architecture and loading the weight in the browser. By leveraging WebGL, the model can efficient generate new image samples when given an appropriate latent space vector in the client browser.

The application uses React.js for interface updates along with html Canvas to draw the image matrices. D3.js was used to generate the scatterplot and handle hover events.

_Created by Taylor Denouden (April 2018)_
