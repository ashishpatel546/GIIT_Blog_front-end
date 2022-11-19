import NavBar from "./NavBar";
import Blog from "./Blog";

const MyBlogs=({setAuth,isauth})=>{
    return(

        <>
        <NavBar setAuth={setAuth} isauth={isauth}/>
        <div className="blogs-grid">
        <Blog url="myblogs"/>
        </div>
        
        </>
    )
}

export default MyBlogs;
