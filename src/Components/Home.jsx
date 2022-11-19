import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import Blog from './Blog';


const Home=({setAuth,isauth})=>{
    return (
        <>
        <NavBar setAuth={setAuth} isauth={isauth}/>
        
        <div className="blogs-grid">
        <Blog url="find-all?sorted_by=DESC"/>
        </div>
        </>
    )
}

export default Home;