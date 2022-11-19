import NavBar from "./NavBar";
import { useLocation,NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import blogimg from './pic2.jpg';
import Blog from "./Blog";

const CategoryBlog=({setAuth,isauth})=>{
    const location = useLocation()
    // const [cat, setCat]= useState(location.state.cat)
    let cat=location.state.cat                 

    
   


       return (
        <>
           <NavBar setAuth={setAuth} isauth={isauth}/>
           {
            cat=='Other'?
            <h2 className="categories-title text-center mt-2">
            Miscellaneous
            </h2>
            :
            <h2 className="categories-title text-center mt-2">
            {cat}
            </h2>
           }
           
            <div className="blogs-grid">
            <Blog url={`category/${cat}`}/> 
            </div>
           
           
        </>
       )
}

export default CategoryBlog;