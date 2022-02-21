import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import { Contact, About, Support, Content } from "./FooterList";
import ggplay from "../../images/ggplay.webp";
import appstore from "../../images/appstore.webp";
export default function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col
            className="footer-item-head"
            xxl={3}
            xl={3}
            lg={3}
            md={6}
            sm={6}
            xs={12}
          >
            <h2 className="footer-item__title-head">{Content.title}</h2>
            <Row>
              <div className="footer-item__download">
                {`Get the app on `}
                <span>
                  <a href="/">Iphone</a>, <a href="/">Ipad</a> and 
                  <a href="/"> Android</a>
                </span>
              </div>
              <Col
                className="footer-item"
                xxl={6}
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <a className="footer-download-app" href="/">
                  <img src={ggplay} alt=""></img>
                </a>
              </Col>
              <Col
                className="footer-item"
                xxl={6}
                xl={6}
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <a className="footer-download-app" href="/">
                  <img src={appstore} alt=""></img>
                </a>
              </Col>
            </Row>
          </Col>
          <Col
            className="footer-item"
            xxl={3}
            xl={3}
            lg={3}
            md={6}
            sm={6}
            xs={12}
          >
            <h2 className="footer-item__title">Contact</h2>
            {Contact.map((contact) => {
              return (
                <a className="footer-link" href={contact.link}>
                  <p>{contact.title}</p>
                </a>
              );
            })}
          </Col>
          <Col
            className="footer-item"
            xxl={3}
            xl={3}
            lg={3}
            md={6}
            sm={6}
            xs={12}
          >
            <h2 className="footer-item__title">About</h2>
            {About.map((about) => {
              return (
                <a className="footer-link" href={about.link}>
                  <p>{about.title}</p>
                </a>
              );
            })}
          </Col>
          <Col
            className="footer-item"
            xxl={3}
            xl={3}
            lg={3}
            md={6}
            sm={6}
            xs={12}
          >
            <h2 className="footer-item__title">Support</h2>
            {Support.map((support) => {
              return (
                <a className="footer-link" href={support.link}>
                  <p>{support.title}</p>
                </a>
              );
            })}
          </Col>
        </Row>
      </Container>
      <div className="copyright">Copyright © 2022 by Hang That.</div>
    </div>
  );
}
