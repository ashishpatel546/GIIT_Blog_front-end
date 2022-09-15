import { NavLink } from "react-router-dom";


const CategoryButton=({c})=>{
       return (
        <>
         <NavLink className="category-btn" 
         to="category"
         state={{ cat: `${c}` }}
        >{c}</NavLink>
        </>
       )
}

export default CategoryButton;