import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from './logo1.png'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const NavBar = ({ setAuth, isauth }) => {

  //const navigate = useNavigate()

  const setAuth1 = boolean => {
    setAuth(boolean);
  }
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");

    setAuth1(false);
  }

  return (
    <>
      <Navbar expand="lg" variant="light" className="my-nav">
        <Container className="nav-container">
          <div>

          </div>
          <Navbar.Brand as={Link} to="/">
            {/* <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '} */}
            GIIT Blogs
          </Navbar.Brand>


          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div className="before-left">
                {isauth ?
                  <div className="after-login">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/myblogs">MyBlogs</Nav.Link>


                  </div>
                  : null
                }
                <Nav.Link as={Link} to="/newblog">Write a Blog<i class="fa-solid fa-feather-pointed"></i>
                </Nav.Link>
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                </NavDropdown>


                <div className="search-bar">
                  <input type="text" className="search-input" />
                  <Button className="search-btn"><i class="fa-solid fa-magnifying-glass"></i></Button>
                </div>
              </div>












            </Nav>
            {!isauth ?
              <div className="left">
                <Nav.Link className="btn-login" as={Link} to="/login">Login<i class="fa-solid fa-arrow-right-to-bracket"></i></Nav.Link>
                <Nav.Link className="btn-login" as={Link} to="/signup">Signup<i class="fa-solid fa-user-plus"></i>
                </Nav.Link>
              </div>
              : null
            }
            {isauth ?
              <div className="left">
                <Nav.Link className="btn-login" as={Link} to="/profile" role="button" >
                My Profile<i class="fa-solid fa-user"></i></Nav.Link>
                 <Nav.Link className="btn-login" as={Link} to="/landing" role="button" onClick={e => logout(e)} >
                Logout<i class="fa-solid fa-right-from-bracket"></i></Nav.Link>
              </div>
              

              : null
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;