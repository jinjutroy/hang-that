import { Component } from "react";
import { Button } from "../Button/Button";
import "./Header.css";
import { MenuItems, Content, Schemes } from "./MenuItems";
import ggplay from "../../images/ggplay.webp"; 
import appstore from "../../images/appstore.webp"; 


import { Container, Col, Row } from "react-bootstrap";
class Header extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div className="fluid">
        <Container>
          <div className="header">
            <h1 className="header-logo">Hang That</h1>
            <div className="menu-icon" onClick={this.handleClick}>
              <i
                className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
              ></i>
            </div>
            <ul
              className={this.state.clicked ? "menu-list active" : "menu-list"}
            >
              {MenuItems.map((item, index) => {
                return (
                  <li className="menu-item" key={index}>
                    <a className={item.cName} href={item.url}>
                      <div className="menu-item__title"> {item.title}</div>
                    </a>
                  </li>
                );
              })}
              <div className="btn-signIn">
                <Button buttonStyle={"btn--outline"}>Sign In</Button> 
              </div>
            </ul>
          </div>
          <div className="header-content">
            <h1 className="header__title">{Content.title}</h1>
            <span className="header__slogan">{Content.slogan}</span>
            <Button buttonSize={"btn--large"}>Bắt đầu</Button>
            <div className="header__get-apps">
              Get the app on{" "}
              <span>
                <a href="/">Iphone</a>,<a href="/"> Ipad</a>,
                <a href="/"> Android</a>
              </span>
              <div className="header__img-download">
                <a className="" href="/">
                  <img src={ggplay} alt=""></img>
                </a>
                <a className="" href="/">
                  <img src={appstore} alt=""></img>
                </a>
              </div>
            </div>
          </div>
          <div className="header-scheme">
            <Container>
              <Row>
                {Schemes.map((item, index) => {
                  return (
                    <Col
                      xxl={4}
                      xl={4}
                      lg={4}
                      md={12}
                      sm={12}
                      xs={12}
                      key={index}
                    >
                      <div className="scheme-item">
                        <div className="scheme__icon">
                          <img src={item.icon} alt={item.title} />
                        </div>
                        <h2 className="scheme__title">{item.title}</h2>
                        <div className="scheme__line"></div>
                        <div className="scheme__desc">{item.description}</div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    );
  }
}

export default Header;
