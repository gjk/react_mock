import * as React from "react";
import PropTypes from 'prop-types';
import "../../assets/scss/login.scss";

export class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      nameObj: {
        value: '',
        error: null
      },
      pwdObj: {
        value: '',
        error: null
      },
      error: null
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (e) {
    let x = e.target.value
    if (x.length < 2 || x.length > 6) {
      this.setState({ nameObj: { value: e.target.value, error: '姓名必须在2-6位之间' } }, (prevState, props) => {
        // console.log(prevState, '====---', props);
      });
      return;
    }
    this.setState({ nameObj: { value: e.target.value } }, (prevState, props) => {
      // console.log(this.state.nameObj);
    });
  }

  handlePwdChange (e) {
    this.setState({ pwdObj: {value: e.target.value }});
  }

  handleSubmit (e) {
    if (!this.state.nameObj.value) {
      this.setState({nameObj: {error: '姓名不能为空'}});
      return;
    }
    if (!this.state.pwdObj.value) {
      this.setState({pwdObj: {error: '密码不能为空'}});
      return;
    }

    localStorage.setItem('user', JSON.stringify({name: this.state.nameObj.value, pwd: this.state.pwdObj.value}));

    // 带参数路由跳转
    this.props.history.push({pathname: '/', state: {user: JSON.parse(localStorage.getItem('user'))}})

    // 登录完不好刷新，就直接飞走了
    // window.location.href = "/";
  }

  render () {
    return (
      <div className="login">
        <div className="form-group">
          <label htmlFor="name">
            名称：
            <input type="text" name="name" value={this.state.nameObj.value} onInput={this.handleNameChange} />
            <span className="form-error">{this.state.nameObj.error}</span>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            密码：
            <input type="password" name="password" value={this.state.pwdObj.value} onInput={this.handlePwdChange}/>
            <span className="form-error">{this.state.pwdObj.error}</span>
          </label>
        </div>
        <div className="form-group">
          <span className="form-error">{this.state.error}</span>
          <button className="form-btn" onClick={this.handleSubmit} >提交</button>
        </div>
      </div>
    )
  }
}

Login.propTypes = {

}

