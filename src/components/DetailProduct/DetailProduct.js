import { child, get, getDatabase, ref } from "firebase/database";
import React,{ useEffect, useState, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";  
import { QRCode } from "react-qrcode-logo";
import {  useSearchParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Notification } from "../Notification/Notification";
import "./DetailProduct.css"; 
import logo from "../../images/logo.png";

export default function DetailProduct(props) { 
  const [listProperties,setListProperties] = useState();
  const [searchParams, setSearchParams] = useSearchParams();    
  const [infoProducer, setInfoProducer] = useState([]);
  const [infoCustomer,setInfoCustomer] = useState([]);
  const [checkinfo,setCheckinfo] = useState(false);
  const [lastcus, setLastcus] = useState({}); 
  const [checkInfoCus,setCheckInfoCus] = useState(true);
  const [urlQr, setUrlQr] = useState("");
  // const [email, setEmail] = useState([]);
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
    if(email && date){  
      return [email,date,quantity] 
    }
    console.log([email,date,quantity] );
    return [] 
  }
  const getInfoCus =  (id,dbRef)=>{
    if(id === "") return;
    let email = [];
    get(child(dbRef,'/user_data/list_user_data/'+ id)).then((snapshot) => {
          if (snapshot.exists()) {    
            // return snapshot.val()["loginName"];  
            return snapshot.val();
          }  
      }).then((user) => { 
        email.push(user["loginName"]) 
        return ;
      }); 
    return email; 
  }
  const getCustomer = useCallback(
    (arr,item) => { 
      const dbRef = ref(getDatabase());  
      const getInfoCustomer = arr[2][item]['history'];
      let date = '';
      let quantity = 0;
      let cusEmail = '';
      let listCus = [];
      let total = 0;
      if(getInfoCustomer) {   
        for(const i in getInfoCustomer){
          let itemHistory = getInfoCustomer[i]; 
          date = new Date(itemHistory["time"]).toLocaleString(); 
          quantity=itemHistory['quantity']; 
          cusEmail = getInfoCus(itemHistory["ownerId"],dbRef); 
          total+=itemHistory['quantity'];   
          listCus.push({date,quantity,cusEmail}); 
        }   
       
        setLastcus(
          {
            datetime: listCus[listCus.length-1].date,
            total: total
          }
        ) 
        return listCus;
      }  
      return [];
    },[]  
  )
   
  useEffect(() => {     
    const dbRef = ref(getDatabase());  
    let params = searchParams.get("makeby"); 
    let item = searchParams.get("item"); 
    if(params && item){  
    setUrlQr('https://hang-that.herokuapp.com/tracuu?makeby='+params+'&item='+item);
    const arr = []; 
    get(child(dbRef,'/user_data/list_user_data/'+ params)).then((snapshot) => {
      if (snapshot.exists()) { 
        for (const variable in snapshot.val()) { 
          arr.push(snapshot.val()[variable])
        } 
        if(arr[2][item]===undefined) return;
        setListProperties(arr[2][item]["name"]);  
        setInfoCustomer(getCustomer(arr,item));
        setInfoProducer(getProducer(arr,item));
         return;
      } else {
        console.log("No data available");
        return;
      }  
    }).catch((error) => {
      console.error(error);
      return
    });      
   }  
  },[searchParams,getCustomer])  

  
  useEffect(() => { 
    if(infoCustomer.length === 0){
      setCheckInfoCus(false);
    }else setCheckInfoCus(true);
    return;
  },[infoCustomer]);

  const showInfoToast= () =>{
    Notification({
      title: "Th??ng b??o!",
      message: "????y l?? nh?? s???n xu???t.",
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
 
  if (infoProducer.length === 0 && infoCustomer.length === 0 ) { 
    setTimeout(async() => { 
      await setCheckinfo(true); 
    }, 3000); 
    return <div className="detail-product-loading">
      {checkinfo?<div className="no-info-detail-product">Kh??ng t??m th???y th??ng tin c???a s???n ph???m n??y.</div>: <Loading />}
    </div>
  }
  return (
    <Container>
      <div className="detail-product-container">
        <Row>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product__image">
              <QRCode value={urlQr}   
                  removeQrCodeBehindLogo = {true}
                  quietZone = {8}
                  bgColor = "#FFFFFF"
                  logoImage={logo}  
                  logoWidth={30}
                   /> 
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className="detail-product-listInfo">
              <h3 className="detail-product__name">Th??ng tin s???n ph???m </h3>  
                  <div className="detail-product-item">
                    <Row >
                      <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__name">{"T??n s???n ph???m"}</div>
                      </Col>
                      <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                        <div className="detail-product-item__desc">
                          {listProperties}
                        </div>
                      </Col>
                    </Row>
                  </div>  
              <div className="detail-product-item__note">
                *** Ch?? ??:  N???u b???n ???? mua s???n ph???m n??y. H??y ki???m tra c??c giao d???ch v???i kh??ch v??ng lai sau, n???u kh??ng c?? th???i gian n??o tr??ng kh???p v???i giao d???ch c???a b???n th?? r???t c?? th??? s???n ph???m n??y l?? gi???.
              </div>
            </div>
          </Col>
        </Row>
          <div className="detail-customer-in-product">
            <div className="detail-customer-in-product__wrapper">
              <div className="detail-customer-in-product__header">
              <i className="fas fa-users"></i>S??? h???u hi???n t???i:
              </div>
              <div className="detail-customer-in-product__search">
                <input type="text" placeholder="T??m ki???m"></input>
                <button className="detail-customer-in-product__buttonSearch" >
                  <i className="fas fa-search"></i>
                  <span>Search</span></button>
              </div>  
              <div className="info-custommer">
              <Row>
                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                 
                  <button onClick={!checkInfoCus?null:handlerCus} className="list-custommer-item__passersby"> 
                  {
                    !checkInfoCus?<span>Ch??a c?? giao d???ch n??o cho s???n ph???m n??y!</span>:
                    <div>
                      <div><span>{lastcus.datetime}</span> <span>Kh??ch v??ng lai</span></div>
                      <div><span>T???ng s??? l?????ng</span><span>{lastcus.total}</span></div> 
                    </div>
                  }
                  </button>
                </Col>
                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                  <button onClick={showInfoToast} className="list-producer-item__producer"> 
                      <div><span>{infoProducer[0]}</span> <span>{infoProducer[1]}</span></div>
                      <div><span>S??? l?????ng</span> <span>{infoProducer[2] }</span></div>
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
           <h3>???????c mua t???: </h3> 
           <button onClick={handlerCloseListCus} className="list-custommer__close"><i className="fas fa-times"></i></button>
           </div>
            {infoCustomer.map((Customer,index) =>{  
                    return <div key={index} className="list-custommer-item__detail"> 
                       <div><span> Customer: {Customer.cusEmail[0]}</span> <span></span></div>
                      <div><span>{Customer.date}</span><span></span></div>
                    </div>
            })}
          </div>
      </div> 
    </Container>
  );
}
