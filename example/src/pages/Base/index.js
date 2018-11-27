import './style.css';

import React from 'react';
import ReactJson from 'react-json-view';
import { Button, Card, WingBlank, WhiteSpace } from 'antd-mobile';

const Base = (hook, action) => {
  return (<div className="base-page page">
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header title="# 调用参数" />
        <Card.Body>
          <div className="base-info"> 
            <ul>
              <li>Hook: xxx</li>
              <li>Action: xxx</li>
              <li>Params: xxx</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header title="# 警告或提示" />
        <Card.Body>
          <p>插件对象 数组 Array (或一个插件对象) – 有关详细信息请参阅 插件入门。记住要调用导入的插件函数(即 commonjs(), 而不是 commonjs).</p>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header title="# 输出" />
        <Card.Body>
        <ReactJson src={{ x: 1, y: { a: 1}}} />
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
    <WhiteSpace size="lg" />
    <WingBlank>
      <Button type="primary">执行方法</Button>
    </WingBlank>
  </div>);
};

export default Base;
