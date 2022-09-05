import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import Blog from './Blog';


const Home=({setAuth,isauth})=>{
    return (
        <>
        <NavBar setAuth={setAuth} isauth={isauth}/>
        
        <div>
        <Blog url="find-all?sorted_by=DESC&limit=5"/>
        </div>
        </>
    )
}

export default Home;