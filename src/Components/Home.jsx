import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import Blog from './Blog';


const Home=({setAuth,isauth})=>{
    return (
        <>
        <NavBar setAuth={setAuth} isauth={isauth}/>
        <div className="home-div1 d-flex justify-content-center">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Blogs"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
           
          </Form>
          <NavLink to="/newblog" className="btn new-blog-btn" type="button"><i class="fa-solid fa-plus"></i>New Blog</NavLink>

        </div>
        <div>
        <Blog url="find-all?sorted_by=DESC&limit=5"/>
        </div>
        </>
    )
}

export default Home;