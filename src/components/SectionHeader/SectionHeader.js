import { Component } from "react";
import { Button } from "../Button/Button";
import ggplay from "../../images/ggplay.webp";
import appstore from "../../images/appstore.webp";
import  {Content} from "./SectionContent";
import { Container } from "react-bootstrap";

import "./SectionHeader.css";

class SectionHeader extends Component {
  render() {
    return (
      <Container>
        <div className="header-content">
          <h1 className="header__title">{Content.title}</h1>
          <span className="header__slogan">{Content.slogan}</span>
          <Button buttonSize={"btn--large"}>Bắt đầu</Button>
          <div className="header__get-apps">
            Get the app on 
            <span>
              <a href="/">Iphone</a>,<a href="/"> Ipad</a>,
              <a href="/"> Android</a>
            </span>
            <div className="header__img-download">
              <a className="" href="/">
                <img src={ggplay} alt=""></img>
              </a>
              <a className="appstore-img" href="/">
                <img src={appstore} alt=""></img>
              </a>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default SectionHeader;
