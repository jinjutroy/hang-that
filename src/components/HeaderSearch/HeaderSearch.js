import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeaderSearch.css"
export default function HeaderSearch(){
    return (
      <div className="header-search">
        <Container>
          <Link className="header-search-logo" to="/">
            <h1>Hang That</h1>
          </Link>
        </Container>
      </div>
    );
}