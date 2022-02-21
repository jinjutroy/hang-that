 import { Container, Row, Col } from "react-bootstrap";
import "./SectionTopService.css";
import  {Content}  from "./SectionTopServiceContent";

export default function SectionTopService(){
    return (
      <Container>
        <div className="section-top-service-container">
          <Row>
            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
              <div className="section-top-service-content">
                <div className="section-top-service__icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <div className="section-top-service__title">
                  {Content.title}
                </div>
                <div className="section-top-service__desc">
                  {Content.content1} <br />
                  <br /> {Content.content2}
                </div>
                <a href="/" className="section-top-service__see-more">
                  Xem thêm
                </a>
              </div>
            </Col>

            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
              <div className="section-top-service-top">
                <div className="section-top-service-top__image">
                  <img src={Content.service.image} alt="" />
                </div>
                <div className="section-top-service-top-content">
                  <div className="section-top-service-top-content__title">
                    {Content.service.serviceTitle}
                  </div>
                  <div className="section-top-service-top-content__desc">
                    {Content.service.serviceDescription}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    );
}