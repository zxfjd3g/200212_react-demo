import React, { Component } from 'react'
import Main from './components/Main'
import Search from './components/Search'

export default class App extends Component {
  
  render() {
    return (
      <div className="container">
        <Search></Search>
        <Main></Main>
      </div>
    )
  }
}
