## 改造vue集成环境变为React集成环境
    1). 删除vue相关的依赖包声明  => npm install
    2). 删除vue相关的webpack配置
    3). 修正index页面的webpack配置 ==> npm run dev运行
    4). 下载react相关包: 
        npm install react react-dom
        npm install @babel/preset-react -D  // jsx=>js
        npm install @babel/plugin-syntax-class-properties  //解析类属性
    5). 修改React相关的webpack配置
	    babel的配置
	        test: /\.jsx?$/, // 能处理js和jsx文件
	        presets: [
	            '@babel/preset-env',  // ES6==>ES5
	            '@babel/preset-react', // jsx ==> js
	        ],
            plugins: [
                '@babel/plugin-syntax-class-properties'
            ]
	    引入模块省略.jsx的配置 
	        extensions: [".js", '.jsx', ".json"]


## 组件化编码的基本流程
	1) 拆分组件: 拆分界面抽取定义组件
	2) 静态组件: 组件化的静态界面
	3) 动态组件
		1.初始化数据动态显示
			设计数据:
				类型: 数组
				名称: todos
				保存在哪个组件? 看是哪个组件需要还是哪些组件需要
		2.交互

## 交互功能
    1) Header
    2) Item
    3) Footer
    状态数据在哪个组件, 更新状态数据的行为(函数)就应该定义在哪个组件

## state数据定义在哪个组件
	props方案
		状态提升: 如果是某个组件用就放在这个组件内, 如果是某些组件用放在共同的父组件中
	pubsub方案
		数据放在需要显示的组件内, 再通过PubSub分发需要这个数据的其组件
	redux方案
		多个组件共享(用)的数据交给redux管理: 有的组件要读, 有的组件要更新, 都需要找redux的store对象


## 更新状态(state/data)数据
	vue中: 
		直接更新目标数据即可: this.xxx = value
	React中:
		必须通过this.setState({xxx: value})来更新
		不要直接修改state数据, 而要指定一个新的数据(很可能依赖于原来state数据)

## React组件间通信
	1) props
		父子组件间相互通信
		父 --> 子: 非函数props  父组件将数据交给子组件是让子组件读取显示, 不能直接更新
		子 --> 父: 函数props 子组件调用父组件传入的函数, 将数据以参数的形式传递父组件,从而更新父组件数据
		问题: 祖孙组件/兄弟组件会比较麻烦
	
	2) refs
		父子组件间通信: 父组件主动进攻
		父组件得到子组件对象, 从而可以读取其状态数据或调用其方法更新其状态数据
	
	3) pubsub
		任意组件间(非父子组件)通信
		订阅消息(接收数据): 
			const token = PubSub.subscribe('msgName', (msgName, data) => {});
			const token2 = PubSub.subscribe('msgName', (msgName, data) => {});
		发布消息(发送数据): PubSub.publish('msgName', data)
		取消订阅: PubSub.unsubscribe(token/msgName);

	4) redux
		任意组件间(非父子组件)通信
		它的功能比pubsub更强大, react项目基本都用redux或基于redux的插件来管理多个组件共享状态

	5) context
		祖孙组件间直接相互通信
		利用Provder来向后代组件提供数据
		后代组件通过Consumer来读取数据(祖--> 孙), 也可以调用传递过的函数(孙-->祖)


## ES6常用新语法
	1)定义常量/变量:  const/let
	2)解构赋值: const {a, b} = this.props   import {aa} from 'xxx'  function ({name, age}) {}
	3)对象的简洁表达: {a, b, c(){}}
	4)箭头函数: 
	a.常用场景
		* 组件的自定义方法: xxx = () => {}
		* 参数匿名函数
		b.优点:
			* 简洁
			* 没有自己的this,使用引用this查找的是外部this
	5)扩展(三点)运算符: 拆解对象(const MyProps = {}, <Xxx {...MyProps}>)  [a, ...b]  {...obj}
	6)类:  class/extends/constructor/super/static
	7)ES6模块化:  export default | import
	8)promise / async&await

## react-router-dom
	作用: 实现基本react的SPA
	相关的组件:
		HashRouter: hash路由, 路径带#, 刷新此咱路径提交的只是#前面的部分
		BrowserRouter: history路由, 路径不带#, 刷新此咱路径提交完整路径 ==> 404 ==> 配置webpack/nginx
		Route: 配置路由, path/compoent
		Switch: 不用Switch会渲染所有指定<Route>, 而使用Switch只渲染匹配的第一个路由的<Route>
		Redirect: 重定向指定路径, 匹配任意, 一般放在最后==> 前面都不匹配就使用它
		NavLink: 导航路由链接, 当前路由链接就会有特定类名, 用来定义特定样式
		Link: 一般路由链接, 所有都一样, 用于不需要指定当前路由链接的特定样式的情况
	相关对象或函数:
		props.history对象: 包含控制路由跳转的一些方法, 如: push()/replace()/goBack()
		props.location对象:包含路由相关信息的对象, 如: pathname / search / state
		props.match对象:包含路由相关信息的对象, 如: params
		
		withRouter函数: 包装非路由组件返回一个新组件 ==> 向非路由组件传递上面3个属性
				==> 如果一个非路由组件要操作路由, 就需要用withRouter包装

	跳转路由的2种方式
		声明式: 通过路由链接点击跳转  ==> 用于跳转前没有逻辑处理的场景
		编程式: 通过history.push()/replace() ==> 用于跳转前有逻辑处理的场景

	携带参数的3种方式
		params: n个字符串   ==> 用得最多
			携带数据: /home/message/detail/12/abc  
			读取数据: this.props.match.params.id
			注意: 注意路由时指定标识名称  /home/message/detail/:id/:xxx
		query: n个字符串  ==> 用得少
			携带数据: /home/message/detail/12/abc?name=tom&age=12
			读取数据: this.props.location.search  ==> ?name=tom&age=12
			注意: 得到数据不能直接使用, 需要手动处理 ==> 可以使用qs工具包
		state: 一个任意类型数据, 一般是对象或数组 ==> 用得少些
			携带数据: this.props.history.push(path, state数据对象/数组)
			读取数据: this.props.location.state
			注意: history模式才可用, hash模式不可用

	组件一个特别的props: children
		是谁? 组件标签体内容
		值是多少?
		  字符串   ==> 组件标签体是文本
		  标签对象  ==> 组件标签体是一个标签
		  标签对象的数组 ==> 组件标签体是多个标签
	
	路由匹配的2种模式:
		模糊匹配(默认): 请求的路径只是前面部分与路由的path相同就匹配了 ==> 对于多层嵌套的路由是必要的
		完全匹配: 只请求路径与路由的path完全相同才匹配了 ==> <Route exact> ==> 多级路由路径对应同一级路由组件

## 路由表(自定义路由配置--集中式)
	1) 集中式配置项目中所有路由相关的信息(路径/组件/子路由的数组/链接名称)
	2) 根据配置动态生成路由链接<NavLink>
	3) 根据配置动态生成路由<Route> / <Redirect>

	二级子路由: 在一级子路由界面局部显示 ==> <Route>写在一级路由组件中


	/welcome
		/welcome/frontend
		/welcome/backend
	/pins
		/pins/frontend
		/pins/hot
	/books
		/books/frontend
		/books/backend


## 代码片断
	clg→    console.log(object)

	imp→    import moduleName from 'module'
	imd→    import { destructuredModule } from 'module'
	
	rcc→ 生成类组件
	rfc→ 生成函数组件
	
	sst→    this.setState({ })
	impt→    import PropTypes from 'prop-types'
	ptypes→    static propTypes = {}

## 编码功能列表
    1---React Helloworld
    2---jsx的理解和使用
    3---定义并使用组件
    4---组件三大属性1_state
    5---call&apply&bind理解使用与自定义视频学习
  
	6---组件三大属性2-props
    7---组件三大属性3-refs
    8---事件处理
    9---表单处理: 受控组件与非受控组件
    10---组件对象生命周期函数(勾子)
    11---封装函数处理多个输入框的数据收集
    12---搭建react打包环境
    13---todos练习到初始化动态显示
    
	14---Header组件--添加
    15---Item组件--移入移出效果
    16---Item组件--勾选效果
    17---Item组件--删除
    18---Footer组件
	19---users练习静态组件
	20---users练习动态组件-ajax请求
	21---react路由基本使用
	22---二级路由与封装MyNavLink
	22---向路由组件传递参数(3种)
	22---跳转路由(2种)

	23---根据配置动态生成导航路由链接
	24---根据配置动态生成路由
		