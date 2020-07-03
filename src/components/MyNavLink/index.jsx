import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
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

function MyNavLink(props) {
  
  // otherProps: 是包含props对象中除了左侧staticContext属性的所有其属性的对象
  const {staticContext, ...otherProps} = props

  return <NavLink activeClassName="myActive" {...otherProps} />
}

export default withRouter(MyNavLink)

/* 
withRouter函数:
接收一个组件(函数), 返回一个新的组件(函数)
withRouter就是一个高阶函数 ==> 高阶组件(接收组件, 返回新组件)
*/
