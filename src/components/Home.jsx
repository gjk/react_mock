import * as React from 'react'
import { Link } from "react-router-dom";
import '../assets/scss/home.scss'

// 类组件
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [],
      user: {}
    }
  }

  // 渲染组件前调用
  componentWillMount() {}

  // 第一次渲染后调用
  componentDidMount() {
    $api.index({}).then(data => {
      this.setState({ bannerList: data.banner})
    })


  }


  // 在组件接收新的props时调用。在初始化render时不会被调用
  componentWillReceiveProps() {}

  // 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
  shouldComponentUpdate() {
    return false;
  }

  // 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  componentWillUpdate() {
    console.log(this.state);
  }

  // 在组件完成更新后立即调用。在初始化时不会被调用。
  componentDidUpdate() {}

  // 组件移除时调用
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <div className="home">
        <article className="banner-container">
          {this.state.bannerList.map(item => {
            return (<section key={item.id}>
              <Link target="_blank" to={item.url}><img src={item.img} alt={item.title} /></Link>
            </section>)
          })}
        </article>
        <div className="home-main">我是主页，就这样</div>
      </div>
    );
  }
}
