import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import "./Header.css";
import { MenuItems} from "./MenuItems";


import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


function SchemeContainer({MenuItems, state}) { 
  return (
    <ul className={state ? "menu-list active" : "menu-list"}>
      {MenuItems.map((item, index) => {
        return (
          <li className="menu-item" key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon + `   desktop`}></i>
              <div className="menu-item__title"> {item.title}</div>
            </Link>
          </li>
        );
      })}
      <div className="btn-signIn">
        <Button buttonStyle={"btn--primary"}>Sign In</Button>
      </div>
    </ul>
  );
}
export default function Header() {  
  const [clicked, setClicked] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollNavbar, setScrollNavbar] = useState();
 
  const handleScroll = () => {
    const position = window.pageYOffset;  
    setScrollNavbar(position);
     setClicked(false);
    if (position > 200 ) {
      document.querySelector("header").classList.add("header-text-scroll");
    } else  {
      document.querySelector("header").classList.remove("header-text-scroll");
    }
  };

   useEffect(() => {
     window.addEventListener("scroll", handleScroll); 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

    useEffect(() => { 
       setShowNavbar( clicked);
    }, [clicked]); 


    return (
      <div className="fluid">
        <Container>
          <div className="header">
            <Link className="header-logo" to="/">
              <h1>Hang That</h1>
            </Link>

            <div className="menu-icon" onClick={() => setClicked(!clicked)}>
              <i className={showNavbar ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <SchemeContainer
              MenuItems={MenuItems}
              state={clicked}
            ></SchemeContainer>
          </div>
        </Container>
      </div>
    ); 
}


