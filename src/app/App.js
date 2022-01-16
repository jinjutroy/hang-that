import { React,Component } from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../components/Header/Header.js'
import HelloWorld from "../components/hello-world/helloworld.js";


export default class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  UserPage = () => {
   return (
     <div className="App">
       <div>
         <Header />
       </div>
       <div className="hello-world">
         <HelloWorld/>
       </div>
     </div>
   );
  } 
  render() {
    return <div>
      {this.UserPage()} 
    </div>;  
  }
};