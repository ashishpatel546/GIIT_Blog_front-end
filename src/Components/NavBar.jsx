import { Navbar,Container,Nav,NavDropdown } from "react-bootstrap";
import logo from './logo1.png'
import { Link } from "react-router-dom";

const NavBar=({setAuth,isauth})=>{
   
  //const navigate = useNavigate()

  const setAuth1=boolean=> {
    setAuth(boolean);
}
   const logout=e=>{
    e.preventDefault();
    localStorage.removeItem("token");
   
    setAuth1(false);
}
  
    return(
        <>
                   <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">
        <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      GIIT Blogs
      </Navbar.Brand>

    
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
          
            { !isauth ?
            <div className="left">
               <Nav.Link className="login" as={Link} to="/login">Login</Nav.Link>
               <Nav.Link className="signup" as={Link} to="/signup">Signup</Nav.Link>
            </div>
            :null
            }
            
            { isauth ?
            <div className="after-login">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/myblogs">MyBlogs</Nav.Link>
                
               
            </div>
            :null
            }
            { isauth ?
               
                <Nav.Link className="btn log-out" as={Link} to="/landing" role="button" onClick={e=>logout(e)} >
                Logout</Nav.Link>
  
            :null
            }
        
            </Nav>
          </Navbar.Collapse>
           </Container>
          </Navbar>
        </>
    )
}

export default NavBar;