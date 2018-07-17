import * as React from 'react'
import { NavLink,Link } from 'react-router-dom'
import "../../assets/scss/header.scss";
import SITE from "../../../config/site.json";

export class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {name: null},
      isLogin: false
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.setState({ isLogin: true, user: user })
    }
  }

  // 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  componentWillUpdate() { 

  }

  logout() {
    this.setState({ isLogin: false, user: '' })
    localStorage.clear();
  }

  render() {
    return (
      <header className="header">
        <header className="quick-link">
          <div className="public-container">
            <span className="header-server">服务热线：{SITE.serverTel}</span>
            <div className="header-login">
              {!this.state.isLogin ? <Link className="header-link" to="/login">登录</Link> : <span className="header-link">欢迎您，{this.state.user.name}</span>}
              {this.state.isLogin && <span className="header-separator">|</span>}
              {this.state.isLogin && <span className="header-link" onClick={this.logout}>退出</span>}
              <span className="header-separator">|</span>
              <Link className="header-link" to="/login">继续登录</Link>
            </div>
          </div>
        </header>
        <nav className="header-nav">
          <NavLink exact to="/" activeClassName="nav-active">Home</NavLink>
          <NavLink to="/project/list" activeClassName="nav-active">List</NavLink>
        </nav>
      </header>
    )
  }
}

