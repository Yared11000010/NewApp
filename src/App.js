import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state={progress:0}
  setProgress= (progress) =>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        />
          <Routes>
             <Route exact path='/' element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="general" key="general" />}></Route>
             <Route exact path='/business'  element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="business" key="business" />}></Route>
             <Route exact path='/entertainment'  element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="entertainment" key="entertainment" />}></Route>
             <Route exact path='/health'  element={<News  setProgress={this.setProgress}   country="us" pageSize={12} category="health" key="health" />}></Route>
             <Route exact path='/science'  element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="science" key="science" />}></Route>
             <Route exact path='/sports'  element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="sports" key="sports" />}></Route>
             <Route exact path='/technology'  element={<News  setProgress={this.setProgress}  country="us" pageSize={12} category="technology" key="technology" />}></Route>
          </Routes>  
        </Router>
      </div>
    )
  }
}
