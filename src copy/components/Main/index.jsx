import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import './index.css'

export default class Main extends Component {

  state = {
    firstView: true, // 是否显示初始界面
    loading: false, // 是否正在请求中
    users: [], // 所有匹配的用户列表
    errorMsg: '', // 需要显示请求错误信息
  }

  getUsers = (searchName) => {
    // 更新状态(请求中)
    this.setState({
      firstView: false,
      loading: true
    })
    // 发ajax请求获取用户列表数据
    axios.get('/api/search/users2', {params: {q: searchName}})
      .then(response => { // 成功了, 更新状态(成功)
        const result = response.data
        const users = result.items.map(item => ({
          id: item.id,
          name: item.login,
          url: item.html_url,
          avatarUrl: item.avatar_url
        }))

        this.setState({
          loading: false,
          users
        })
      })
      .catch(error => { // 失败了, 更新状态(失败)
        this.setState({
          loading: false,
          errorMsg: error.message
        })
      })
  }

  getUsers_fetch = (searchName) => {
    // 更新状态(请求中)
    this.setState({
      firstView: false,
      loading: true
    })
    // 发ajax请求获取用户列表数据(使用fetch)

    fetch(`/api/search/users2?q=${searchName}`)
      .then((response) => {
        return response.json() // 返回包含响应体json数据的promise
      }).then((data) => { // 相当于axios中的response.data  响应体数据
        const users = data.items.map(item => ({
          id: item.id,
          name: item.login,
          url: item.html_url,
          avatarUrl: item.avatar_url
        }))

        this.setState({
          loading: false,
          users
        })
      }).catch((e) => {
        this.setState({
          loading: false,
          errorMsg: error.message
        })
      })
  }

  componentDidMount () {
    // 订阅消息
    this.token = PubSub.subscribe('SEARCH', (msgName, searchName) => {
      // this.getUsers(searchName)
      this.getUsers_fetch(searchName)
    })
  }

  componentWillUnmount () {
    // 取消消息订阅
    // PubSub.unsubscribe('SEARCH')
    PubSub.unsubscribe(this.token)
  }


  render() {
    const {firstView, loading, users, errorMsg} = this.state
    if (firstView) {
      return <h2>输入关键字进行搜索</h2>
    } else if (loading) {
      return <h2>正在加载中...</h2>
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>
    }
    return (
      <div className="row">
        {
          users.map(user => (
            <div className="card" key={user.id}>
              <a href={user.url} target="_blank">
                <img src={user.avatarUrl} style={{width: 100}}/>
              </a>
            <p className="card-text">{user.name}</p>
            </div>
          ))
        }
      </div>
    )
  }
}
