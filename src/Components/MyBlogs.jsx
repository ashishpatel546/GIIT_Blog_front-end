import NavBar from "./NavBar";
import Blog from "./Blog";

const MyBlogs=({setAuth,isauth})=>{
    return(

        <>
        <NavBar setAuth={setAuth} isauth={isauth}/>
        <Blog url="myblogs"/>
        </>
    )
}

export default MyBlogs;
