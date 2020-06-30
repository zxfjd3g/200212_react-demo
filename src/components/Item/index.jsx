import React, { Component } from 'react'
import PropTpes from 'prop-types'
import './index.css'

/* 
列表项组件
*/
export default class Item extends Component {
  static propTypes = {
    todo: PropTpes.object.isRequired
  }

  /* 
  勾选状态改变的回调
  */
  handleChange = () => {

  }

  render() {

    const {title, completed} = this.props.todo

    return (
      <li>
        <label>
          <input type="checkbox" checked={completed} onChange={this.handleChange}/>
          <span>{title}</span>
        </label>
        <button className="btn btn-danger" style={{display:'none'}}>删除</button>
      </li>
    )
  }
}
