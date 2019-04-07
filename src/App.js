import React, { Component } from 'react';
import Tachyons from 'tachyons';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '8ff8a4fcafcb4fc2b59017ad7b30df46'
});

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density : {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: []
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map((face) => { 
      const id = face.id;
      const boundingBox = face.region_info.bounding_box;
      return {
        "id": id,
        "top_row": boundingBox.top_row * height,
        "left_col": boundingBox.left_col * width,
        "bottom_row": height - (boundingBox.bottom_row * height),
        "right_col": width - (boundingBox.right_col  * width)
      }});
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = (event) => {
    this.setState({ imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBoxes(this.calculateFaceLocation(response)))
      .catch(err => console.log(err)
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} boxes={this.state.boxes} />
      </div>
    );
  }
}

export default App;