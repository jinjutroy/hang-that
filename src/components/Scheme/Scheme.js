import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

import {  Schemes } from "./SchemeItem"; 

import './Scheme.css'
function Scheme()  { 
        return (
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
        ); 
}


export default Scheme;
