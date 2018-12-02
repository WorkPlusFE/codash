import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, List, WhiteSpace } from 'antd-mobile';
import accordions from './accordions';
import logo from '../../assets/logo/workplus.png';
import { changeTitle } from '../../shared/cordova';

import './style.css';

const ListItem = (item, index) => (
  <List.Item key={index} arrow={'horizontal'}>
    <Link to={{ pathname: `/base/${item.options.hook}/${item.options.action}` }}>{item.title}</Link>
  </List.Item>
);

export default class Home extends Component {
  componentDidMount() {
    changeTitle('Cordova');
  }
  render() {
    return (
      <div className="home-page">
        <div className="banner">
          <img src={logo} width="70" height="70" alt="workplus logo" />
          <h1>WorkPlus Cordova API</h1>
          <p>本应用只是对相关接口功能进行展示，具体的参数和说明，请以官方文档为准。带 * 号的例子，需要添加额外的参数才可执行。</p>
        </div>
        <div style={{ padding: '0 20px' }}>
          { accordions.map((item, index) => (<Accordion key={index} className="wp-accordion">
              <Accordion.Panel header={`${item.title} ${item.hook}`}>
                <List className="wp-list">
                  { item.items.map((it, i) => ListItem(it, i)) }
                </List>
              </Accordion.Panel>
            </Accordion>))
          }
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
