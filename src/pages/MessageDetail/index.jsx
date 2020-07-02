import React, { Component } from 'react'
import qs from 'qs'

/* 
消息详情路由组件(三级)
*/

const allDetails = [
  {id: 1, title: 'message001', content: 'cntent001...'},
  {id: 3, title: 'message003', content: 'cntent003...'},
  {id: 5, title: 'message005', content: 'cntent005...'},
]

export default class MessageDetail extends Component {
  render() {
    // 读取params参数
    const id = this.props.match.params.id*1
    const detail = allDetails.find(item => item.id===id)

    // 读取query(search)参数     ?name=tom&age=12  ==> 需要手动解析后才能使用
    const search = this.props.location.search
    console.log('search/query参数', search)
    if (search) {
      // 使用qs工具包手动解析后才能使用
      console.log(qs.parse(search.replace('?', '')))
    }

    // 读取state参数数据
    const stateData = this.props.location.state
    console.log(stateData)

    return (
      <ul>
        <li>ID: {id}</li>
        <li>TITLE: {detail.title}</li>
        <li>CONTENT: {detail.content}</li>
      </ul>
    )
  }
}
