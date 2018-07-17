import * as React from 'react'
import '../../assets/scss/footer.scss'

// 类组件
export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-main">
          <div>&copy; 2018-2028 版权所有，你猜是谁</div>
          <div>服务热线：123123</div>
          <div>随便啥啦，大部分可能是友链</div>
        </div>
      </footer>
    );
  }
}
