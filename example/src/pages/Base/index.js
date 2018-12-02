import './style.css';

import React from 'react';
import ReactJson from 'react-json-view';
import { Button, Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { getEventDetailByHookAndAction } from '../../shared/tools';
import { changeTitle } from '../../shared/cordova';
import { deviceReady } from '../../../../';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { hook, action } = props.match.params;
    this.hook = hook;
    this.action = action;
    this.detail = getEventDetailByHookAndAction(hook, action);

    this.state = {
      results: null,
      params: JSON.stringify(this.detail.options.params),
      editModel: false,
    };

    this.executeEvent = this.executeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSetEditModel = this.handleSetEditModel.bind(this);
  }

  componentDidMount() {
    deviceReady()
      .then(() => {
        changeTitle(this.detail.title);
      });
  }

  executeEvent() {
    const { options } = this.detail;
    const { hookInstance, action } = options;
    let params = [];
    try {
      params = JSON.parse(this.state.params);
      if (!Array.isArray(params)) {
        Toast.fail('参数必须为数组', 1);
        return;
      }
    } catch (error) {
      Toast.fail('参数格式有误', 1);
      return;
    }
    const fn = hookInstance.create(action, params);
    fn().then((res) => {
      const { data } = res;
      this.setState({ results: data });
    });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ params: value });
  }

  handleSetEditModel() {
    this.setState({ editModel: true });
  }

  render() {
    return (<div className="base-page page">
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header title="描述或提示" />
          <Card.Body>
            <p>{this.detail.tips}</p>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header title="调用参数" extra={<i onClick={this.handleSetEditModel} className="icon-edit">编辑</i>} />
          <Card.Body>
            <div className="base-info"> 
              <ul>
                <li><strong>Hook: </strong>{this.hook}</li>
                <li><strong>Action: </strong>{this.action}</li>
                <li><strong>Params: </strong>{ !this.state.editModel && this.state.params}</li>
                { this.state.editModel && 
                  (<li>
                    <textarea id="eidt-params" autoFocus onChange={this.handleChange} value={this.state.params}></textarea>
                    <p className="tips">* 只能编辑 Params, 且必须为数组。</p>
                  </li>)
                }
              </ul>
            </div>
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        {
          this.state.results && (
            <Card>
              <Card.Header title="运行结果" extra={<CopyToClipboard onCopy={() => Toast.success('复制成功')} text={JSON.stringify(this.state.results)}><i className="icon-copy">复制</i></CopyToClipboard>} />
              <Card.Body style={{ overflowY: 'auto' }}>
                <ReactJson 
                  name={false} 
                  integer={2} 
                  displayDataTypes={false}
                  enableClipboard={false} 
                  displayObjectSize={false}
                  src={this.state.results} 
                />
              </Card.Body>
            </Card>)
        }
      <WhiteSpace size="lg" />
      </WingBlank>
      <WhiteSpace size="lg" />
      <WingBlank>
        <Button type="primary" onClick={this.executeEvent}>点击执行</Button>
      </WingBlank>
      <WhiteSpace size="lg" />
    </div>);
  }
}

export default Base;
