import { React,Component } from 'react';
import './App.css'; 
import Header from '../components/Header/Header.js' 
import Footer from "../components/Footer/Footer.js"; 
import "bootstrap/dist/css/bootstrap.min.css"; 

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  UserPage = () => {
   return (
     <div className="App">
       <header>
         <Header />
       </header>
       <footer>
         <Footer />
       </footer>
     </div>
   );
  } 
  render() {
    return <div>
      {this.UserPage()} 
    </div>;  
  }
};