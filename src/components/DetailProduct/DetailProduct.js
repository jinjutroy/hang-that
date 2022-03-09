import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"; 
import QRCode from "react-qr-code";
import {  useSearchParams } from "react-router-dom";
import { Notification } from "../Notification/Notification";
import "./DetailProduct.css";

export default function DetailProduct(props) { 
  const [listProperties,setListProperties] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();    
  const [infoProducer, setInfoProducer] = useState([]);
  const [infoCustomer,setInfoCustomer] = useState([]);
  
  const getProducer = (arr,item)=>{
    const getInfoProducer = arr[2]; 
    let email = arr[3];
    let quantity = 0;
    let quantityProductOfCus = 0;
    let date = new Date(getInfoProducer[item]["timeCreate"]).toLocaleString();  
    if(getInfoProducer[item]['history']){
      for(const i in (getInfoProducer[item]['history'])){
        quantityProductOfCus += getInfoProducer[item]['history'][i]['quantity'];
      }  
    } 
    quantity = getInfoProducer[item]["quantity"] - quantityProductOfCus; 
    if(email && quantity !== 0 && date){  
      return [email,date,quantity] 
    }
    return []
  }
  const getCustomer = (arr,item) => { 
    const getInfoCustomer = arr[2][item]['history'];
    let date = '';
    let quantity = 0;
    let cusId = '';
    let listCus = [];
    if(getInfoCustomer){  
      for(const i in (getInfoCustomer)){
        let itemHistory = getInfoCustomer[i]; 
        date = new Date(itemHistory["time"]).toLocaleString(); 
        quantity=itemHistory['quantity']; 
        cusId = itemHistory['customerId']; 
        listCus.push({date,quantity,cusId})
      }  
      console.log(listCus);
      return listCus;
    }  
    return [];
  }
  useEffect(() => {   
    const dbRef = ref(getDatabase());  
    let params = searchParams.get("makeby"); 
    let item = searchParams.get("item"); 
    if(params && item){  
    const arr = []; 
    get(child(dbRef,'/user_data/list_user_data/'+ params)).then((snapshot) => {
      if (snapshot.exists()) { 
        for (const variable in snapshot.val()) {
          arr.push(snapshot.val()[variable])
        } 
        setListProperties(arr[2][item]["listProperties"]);  
        setInfoCustomer(getCustomer(arr,item));
        setInfoProducer(getProducer(arr,item));
      } else {
        console.log("No data available");
        return;
      }
    }).catch((error) => {
      console.error(error);
      return
    }); 
   }
  },[searchParams]) 
 
  const showInfoToast= () =>{
    Notification({
      title: "Thông báo!",
      message: "Đây là nhà sản xuất.",
      type: "info",
      duration: 2000
    });
  }
  const handlerCus = ()=>{ 
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
  console.log(infoCustomer.length);
  if(infoProducer.length === 0 && infoCustomer.length === 0){
    return <h1>Loading...</h1>;
  }
  return (
    <Container>
      <div className="detail-product-container">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product__image">
              <QRCode value="Hello everyone" />
              {/* <img src={""} alt="Ảnh sản phẩm" /> */}
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product-listInfo">
              <h3 className="detail-product__name">Thông tin sản phẩm </h3>
              {listProperties.map((info, index) => {
                return (
                  <div key={index} className="detail-product-item">
                    <Row >
                      <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__name">{info.name}</div>
                      </Col>
                      <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__desc">
                          {info.value}
                        </div>
                      </Col>
                    </Row>
                  </div> 
                );
              })}
              <div className="detail-product-item__note">
                *** Chú ý:  Nếu bạn đã mua sản phẩm này. Hãy kiểm tra các giao dịch với khách vãng lai sau, nếu không có thời gian nào trùng khớp với giao dịch của bạn thì rất có thể sản phẩm này là giả.
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
                    <div><span>{ 1}</span> <span>Khách vãng lai</span></div>
                    <div><span>Số lượng</span><span>{  1}</span></div> 
                  </button>
                </Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                  <button onClick={showInfoToast} className="list-producer-item__producer"> 
                      <div><span>{infoProducer[0]}</span> <span>{infoProducer[1]}</span></div>
                      <div><span>Số lượng</span> <span>{infoProducer[2] }</span></div>
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
            {infoCustomer.map((Customer,index) =>{
                    return <div key={index} className="list-custommer-item__detail">
                       <div><span> CustomerID: {Customer.cusId}</span> <span></span></div>
                      <div><span>{Customer.date}</span><span></span></div>
                    </div>
            })}
          </div>
      </div> 
    </Container>
  );
}
