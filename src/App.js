import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import CategoryList from './components/CategoryList'
import CategoryEdit from './components/CategoryEdit'

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
  return (
    <Router>
      <div className="App">
          <NavBar />
      </div>
      <Route path='/' exact component={ (routeProps) =>   <CategoryList  {...routeProps}/> } />
      <Route path='/category-edit' component={(routeProps) =>  <CategoryEdit  {...routeProps}/>} />
      <Route path='/category-new' component={(routeProps) =>  <CategoryEdit  {...routeProps}/>} />
    </Router>
  );
  }
}

const mapStateToProps = (store) => {
  return {
      currentPage: store.currentPage,        
  }
}
export default connect(mapStateToProps)(App);
