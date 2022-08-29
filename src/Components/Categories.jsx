import { NavLink } from "react-router-dom";

const Categories=()=>{
    return(
        <>
         <h2 className="categories-title text-center mt-5">
            CATEGORIES
         </h2>

        <div className="categories">
            <NavLink className="category-btn" to="/">Frontend</NavLink>
            <NavLink className="category-btn" to="/">Backend </NavLink>
            <NavLink className="category-btn" to="/">ReactJS</NavLink>
            <NavLink className="category-btn" to="/">NodeJS</NavLink>
            <NavLink className="category-btn" to="/">NestJS</NavLink>
            <NavLink className="category-btn" to="/">Javascript</NavLink>
            <NavLink className="category-btn" to="/">Java</NavLink>
            <NavLink className="category-btn" to="/">Devops</NavLink>
        </div>
        </>
    )
}

export default Categories;