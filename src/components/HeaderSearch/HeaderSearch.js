import React from 'react';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeaderSearch.css"
import logo from "../../images/logo.png";

export default function HeaderSearch(){
    return (
      <div className="header-search">
        <Container>
          <Link className="header-search-logo" to="/">
            <img className="header-search-img" src={logo} alt="" />
            <h1>Hang That</h1>
          </Link>
        </Container>
      </div>
    );
}