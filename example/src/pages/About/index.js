import React, { Component } from 'react';

import { deviceReady, toBase64 } from '../../../../';
import { getUserTicket, getAccessToken, selectImage } from '../../shared/cordova';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: '',
      token: '',
      img: '',
    };

    this.handleSelectPhoto = this.handleSelectPhoto.bind(this);
  }
  componentDidMount() {
    deviceReady({ timeout: 1000 })
      .then(() => Promise.all([getUserTicket(), getAccessToken()]))
      .then((res) => {
        const [ticket, token] = res;
        const { user_ticket } = ticket.data;
        const { access_token } = token.data;
        this.setState({ ticket: user_ticket, token: access_token });
      });
  }
  handleSelectPhoto() {
    selectImage()
      .then((res) => {
        const { key } = res.data;
        toBase64(key, (base64) => {
          console.log(base64);
          const { target } = base64;
          this.setState({ img: `data:image/png;base64,${target._result}` });
        });
      });
  }
  render() {
    return (<div>
      <h1>About Page</h1>
      <p>Ticket: {this.state.ticket}</p>
      <p>Token: {this.state.token}</p>
      <p></p>
      <h1>Image to Base64</h1>
      <p onClick={this.handleSelectPhoto}>Select photo</p>
      <div style={{ width: 300, height: 300 }}>
        <img src={this.state.img} alt="base64" />
      </div>
    </div>)
  }
}
