import React, {Component} from 'react';
import CountryTable from "./CountryTable";
import './CountryApp.css';

class CountryApp extends Component {
  
  constructor(props){
    super(props);
    //console.log(props.factory)
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>React, State, Fetch and Mobx</h2>
        </div>
        <div className="App-intro">
          <p>Your initial task is to fetch data from the server (see exercise for how to start it),
           and create a table below, with these data</p>          
          <CountryTable factory = {this.props.factory}/>
        </div>
      </div>
    );
  }
}

export default CountryApp;