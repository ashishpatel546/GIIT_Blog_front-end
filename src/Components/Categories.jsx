
import { useEffect } from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import CategoryButton from "./CategoryButton";


const Categories = ({setAuth,isauth}) => {
    const categories1=["Frontend","Backend","NodeJS","NestJS"]
    const categories2=["ReactJS","Java","Javascript","Devops","Other"]

    const [categories,setCategories]=useState([]);

    const getCategories=async()=>{
        const response= await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/all/categories`,{
         
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
              },
             
        })

        const data=await response.json()
        setCategories(data)
        console.log(data);
    }

    useEffect(()=>{
        getCategories()
    },[])

    return (
        <>
            <div className="categories-container">
                <h2 className="categories-title text-center mt-5">
                    CATEGORIES
                </h2>


                <Carousel interval={null} className="carousel">
                    <Carousel.Item >
                        <div className="categories">
                       {
                         categories1.map(c=>
                            
                                <CategoryButton c={c} setAuth={setAuth} isauth={isauth} />
                            
                            )
                        
                       }
                          
                            {/* <NavLink className="category-btn" to="/">Frontend</NavLink>
                            <NavLink className="category-btn" to="/">Backend </NavLink>
                            <NavLink className="category-btn" to="/">ReactJS</NavLink>
                            <NavLink className="category-btn" to="/">NodeJS</NavLink> */}

                        </div>

                    </Carousel.Item>
                    <Carousel.Item >
                        <div className="categories">

                            {/* <NavLink className="category-btn" to="/">NestJS</NavLink>
                            <NavLink className="category-btn" to="/">Javascript</NavLink>
                            <NavLink className="category-btn" to="/">Java</NavLink>
                            <NavLink className="category-btn" to="/">Devops</NavLink>
                            <NavLink className="category-btn" to="/">Others</NavLink> */}
                            {
                         categories2.map(c=>
                            
                                <CategoryButton c={c} setAuth={setAuth} isauth={isauth} />
                            
                            )
                        
                       }
                          

                        </div>

                    </Carousel.Item>

                </Carousel>
            </div>

        </>
    )
}

export default Categories;