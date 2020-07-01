import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  state = {
    searchName: ''
  }

  handleChange = (e) => {
    this.setState({
      searchName: e.target.value.trim()
    })
  }

  search = () => {
    const {searchName} = this.state
    if (searchName) {
      // 通知Main去搜索
      PubSub.publish('SEARCH', searchName)
      // 清除输入
      this.setState({
        searchName: ''
      })
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" 
            value={this.state.searchName} onChange={this.handleChange}/>
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}
