import { React,Component } from 'react';
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import './App.css'; 
import Header from '../components/Header/Header.js' 
import Footer from "../components/Footer/Footer.js"; 
import SectionHeader from '../components/SectionHeader/SectionHeader';

import Scheme from '../components/Scheme/Scheme'
import SectionTopService from '../components/SectionTopService/SectionTopService';
import OurHero from '../components/OurHero/OurHero'; 
import DetailProduct from '../components/DetailProduct/DetailProduct';
import HeaderSearch from '../components/HeaderSearch/HeaderSearch';  
import  "../models/firebase";
export default class App extends Component {
  UserPage = () => {
    return (
      <div className="App"> 
        <div id="toast"></div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div> 
                <header>
                  <Header />
                </header>
                <div className="section-header"></div>
                <SectionHeader />
                <Scheme />
                <SectionTopService />
                <OurHero />
              </div>
            }
          ></Route>
          <Route
            path="tracuu"
            element={
              <div>
                <HeaderSearch/>
                <DetailProduct />
              </div>
            }
          ></Route>
          <Route render={() => <div>Not Found 404</div>} />
        </Routes>

        <footer>
          <Footer />
        </footer>
      </div>
    );
  };
  render() {
    return <div>{this.UserPage()}</div>;
  }
};