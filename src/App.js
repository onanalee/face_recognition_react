import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';

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
      box: {},
      route: 'signin',
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementsByClassName('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
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
          this.displayFaceBox(this.calculateFaceLocation(response));
        },
        function (err) {
          console.log(err);
        }
      );
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }


  render() {
    return (
      <div className="App">
        <Particles className="particles"></Particles>
        <Navigation onRouteChange={this.onRouteChange}></Navigation>

        {this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange}></Signin>
          : <div><Logo></Logo>
            <Rank></Rank>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} ></ImageLinkForm>

            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}></FaceRecognition>
          </div>
        }

      </div>
    );
  }
}

export default App;
