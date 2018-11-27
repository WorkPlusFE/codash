import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Accordion, List } from 'antd-mobile';
import accordions from './accordions';

import './style.css';

export default class Home extends Component {
  onChange = (key) => {
    console.log(key);
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner">
          <h1>WorkPlus</h1>
          <p>v3.10.1</p>
        </div>
        <div style={{ padding: '0 20px' }}>
          { accordions.map((item, index) => (<Accordion key={index} className="wp-accordion">
              <Accordion.Panel header={item.title}>
                <List className="wp-list">
                  {item.items.map((it, i) => (<List.Item key={i} arrow={'horizontal'}>{it.title}</List.Item>))}
                </List>
              </Accordion.Panel>
            </Accordion>))
          }
        </div>
      </div>
    );
  }
}
