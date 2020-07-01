import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

/* 
头部组件
*/
export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  }

  state = {
    title: ''
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value.trim()
    })
  }

  handleKeyUp = (e) => {
    // 如果不是enter键, 直接结束
    if (e.keyCode!==13) return
    // 读取title状态数据
    const {title} = this.state
    // 如果是空串, 直接结束
    if (!title) return

    // 调用函数更新父组件的状态
    this.props.addTodo(title)

    // 清除输入
    this.setState({
      title: ''
    })
  }

  render() {
    const {title} = this.state
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" value={title}
          onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
      </div>
    )
  }
}

/* 
1. 受控组件自动收集数据
2. 点击Enter响应
3. 更新父组件状态数据
*/