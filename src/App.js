import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import { render } from '@testing-library/react';

// a7e6a87dc48542b79a7ac79d0cbb0a04

const app = new Clarifai.App({
  apiKey: 'a7e6a87dc48542b79a7ac79d0cbb0a04'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
        function (response) {
          console.log(response);
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (err) {
          console.log(err);
        }
      );
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles"></Particles>
        <Navigation></Navigation>
        <Logo></Logo>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} ></ImageLinkForm>
        <Rank></Rank>
        <FaceRecognition imageUrl={this.state.imageUrl}></FaceRecognition>

      </div>
    );
  }
}

export default App;
