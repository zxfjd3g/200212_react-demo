import React, { Component } from 'react'
import Main from './components/Main'
import Search from './components/Search'

export default class App extends Component {

  handleClick = () => {
    // 得到的是子组件search实例对象
    const search = this.refs.search 
    // 读取子组件的状态数据
    console.log(search.state.searchName)
    // 调用子组件的方法,从而更新子组合的状态数据
    search.chanageSearchName('abc')
  }
  
  render() {
    return (
      <div className="container">
        <button onClick={this.handleClick}>父组件的按钮</button>
        <Search ref="search"></Search>
        <Main></Main>
      </div>
    )
  }
}
