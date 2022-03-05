import { Col, Container, Row } from "react-bootstrap";
import { Notification } from "../Notification/Notification";
import "./DetailProduct.css";
import { Information, NSX, Customers } from "./InfoProduct"; 
export default function DetailProduct(props) {
  const showSuccessToast= () =>{
    Notification({
      title: "Thông báo!",
      message: "Đây là nhà sản xuất.",
      type: "info",
      duration: 2000
    });
  }
  const handlerCus = ()=>{
    console.log(1);
      let wrapper = document.querySelector(".list-custommer-list__wrapper");
      wrapper.classList.add("show-block");
      wrapper.classList.remove("hide"); 
  }
  const handlerCloseListCus = () => {
    let wrapper = document.querySelector(".list-custommer-list__wrapper"); 
    wrapper.classList.add("hide"); 
    wrapper.classList.remove("show-block"); 
  }
  const closeListCus = ()=>{
    let list = document.querySelector(".list-custommer-list__wrapper");
    list.classList.add("hide"); 
    list.classList.remove("show-block");
  } 
  return (
    <Container>
      <div className="detail-product-container">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product__image">
              <img src={Information.link} alt={Information.ten} />
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product-listInfo">
              <h3 className="detail-product__name">{Information.ten}</h3>
              {Information.info.map((info, index) => {
                return (
                  <div key={index} className="detail-product-item">
                    <Row >
                      <Col xxl={3} xl={3} lg={4} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__name">{info.title}</div>
                      </Col>
                      <Col xxl={9} xl={9} lg={8} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__desc">
                          {info.description}
                        </div>
                      </Col>
                    </Row>
                  </div>

                );
              })}
              <div className="detail-product-item__note">
                *** Chú ý:  Nếu đã mua sản phẩm này. Hãy kiểm tra các giao dịch với khách vãng lai sau, nếu không có thời gian nào trùng khớp với giao dịch của bạn thì rất có thể sản phẩm này là giả.
              </div>
            </div>
          </Col>
        </Row>
          <div className="detail-customer-in-product">
            <div className="detail-customer-in-product__wrapper">
              <div className="detail-customer-in-product__header">
              <i className="fas fa-users"></i>Sở hữu hiện tại:
              </div>
              <div className="detail-customer-in-product__search">
                <input type="text" placeholder="Tìm kiếm"></input>
                <button className="detail-customer-in-product__buttonSearch" >
                  <i className="fas fa-search"></i>
                  <span>Search</span></button>
              </div>  
              <div className="info-custommer">
              <Row>
                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                  <button onClick={handlerCus} className="list-custommer-item__passersby">
                    <div><span>{Customers[Customers.length - 1].daytime}</span> <span>Khách vãng lai</span></div>
                    <div><span>Số lượng</span><span>{Customers[Customers.length - 1].quantity}</span></div> 
                  </button>
                </Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                  <button onClick={showSuccessToast} className="list-producer-item__producer"> 
                      <div><span>{NSX.daytime}</span> <span>{NSX.email}</span></div>
                      <div><span>Số lượng</span> <span>{NSX.quantity}</span></div>
                  </button>
                </Col>
              </Row>
              </div>
              
            </div>
          </div>
      </div>
      <div onClick={closeListCus} className="list-custommer-list__wrapper">
          <div onClick={(event) => {event.stopPropagation()}} className="list-custommer">
           <div className="list-custommer__header">
           <h3>Được mua từ: </h3> 
           <button onClick={handlerCloseListCus} className="list-custommer__close"><i className="fas fa-times"></i></button>
           </div>
            {Customers.map((Customer,index) =>{
                    return <div key={index} className="list-custommer-item__detail">
                       <div><span>{Customer.email}</span> <span></span></div>
                      <div><span>{Customer.daytime}</span><span></span></div>
                    </div>
            })}
          </div>
      </div> 
    </Container>
  );
}
