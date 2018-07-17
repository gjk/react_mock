import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Footer } from './components/public/Footer'
import { Header } from './components/public/Header'
import routers from './router/router'
import './assets/scss/index.scss'
import api from './api/axios'

// 暂时使用window作为全局变量的载体，以后更好的解决办法则替换之
// 据说也可以使用redux来做载体，等待亲测之
window.$api = api

ReactDOM.render(
  <HashRouter basename="/" forceRefresh={false} keyLength={12}>
    <div>
      <Header />
      {routers}
      <Footer />
    </div>
  </HashRouter>,
  document.getElementById('app')
);
