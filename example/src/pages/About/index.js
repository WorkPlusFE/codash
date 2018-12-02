import React, { Component } from 'react';

import { toBase64 } from '../../../../';
import { selectImage } from '../../shared/cordova';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
    };

    this.handleSelectPhoto = this.handleSelectPhoto.bind(this);
  }
  handleSelectPhoto() {
    selectImage()
      .then((res) => {
        const { key } = res.data;
        toBase64(key, (base64) => {
          const { target } = base64;
          this.setState({ img: `data:image/png;base64,${target._result}` });
        });
      });
  }
  render() {
    return (<div>
      <h1>Image to Base64</h1>
      <p onClick={this.handleSelectPhoto}>Select photo</p>
      <div style={{ width: 300, height: 300 }}>
        <img src={this.state.img} alt="base64" />
      </div>
    </div>)
  }
}
