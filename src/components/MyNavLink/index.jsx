import React from 'react'
import { NavLink } from 'react-router-dom'
/* 
对NavLink进行二次封装, 默认就会我们指定的样式
将接收的所有props都传递给我的子组件NavLink  ==> 透传  ==>使用...
组件一个特别的props: children
是谁? 组件标签体内容
值是多少?
  字符串   ==> 组件标签体是文本
  标签对象  ==> 组件标签体是一个标签
  标签对象的数组 ==> 组件标签体是多个标签
*/
export default function MyNavLink(props) {
  return <NavLink activeClassName="myActive" {...props} />
}
