import { React,Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; 
import './App.css'; 
import Header from '../components/Header/Header.js' 
import Footer from "../components/Footer/Footer.js"; 
import SectionHeader from '../components/SectionHeader/SectionHeader';

import Scheme from '../components/Scheme/Scheme'
import SectionTopService from '../components/SectionTopService/SectionTopService';
import OurHero from '../components/OurHero/OurHero';
export default class App extends Component { 

  UserPage = () => {
   return (
     <div className="App">
       <header>
         <Header />
       </header>
       <div className="section-header"></div>
        <SectionHeader />
        <Scheme />
        <SectionTopService/> 
        <OurHero/>
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