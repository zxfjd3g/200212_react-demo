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

## 更新状态(state/data)数据
	vue中: 直接更新目标数据即可: this.xxx = value
	React中:
		必须通过this.setState({xxx: value})来更新
		不要直接修改state数据

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