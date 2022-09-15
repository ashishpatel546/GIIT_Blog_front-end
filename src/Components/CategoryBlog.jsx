import NavBar from "./NavBar";
import { useLocation,NavLink } from "react-router-dom";
import { useState,useEffect } from "react";
import blogimg from './pic2.jpg';

const CategoryBlog=({setAuth,isauth})=>{

    const location = useLocation()
    const { cat } = location.state
    console.log(cat);                   

    const [blog,setBlog]=useState([]);
   

    const fetchblog=async ()=>{
        try{
        const response= await fetch(`http://[::1]:8000/blogs/category/${cat}`,{
            headers:{
                
                "Authorization":`Bearer ${localStorage.getItem('token')}`
                          
                },
        })
        // const response= await fetch(process.env.REACT_APP_API_URL)
        //console.log(response);
        const data = await response.json()
        console.log(data);
       
        setBlog(data)
        
        
        }catch(err){
            console.error(err.message);
          }
        
    }

    

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    useEffect(()=>{
        fetchblog()
        
    },[])


       return (
        <>
           <NavBar setAuth={setAuth} isauth={isauth}/>
           {cat}
           {blog.map(b => (
                <div key={b.id} className="container blog">
                   
                    <div className='blog-container'>
                    
                    <img className="img-fluid"alt="blog-img" src={blogimg} height="100"/>
                    <div className='text-center published-by'><em>Published on {formatDate(b.created_on)}</em></div>
                    <h3 className='text-center'>{b.title}</h3>
                    <div className='text-center'><em>By <span className='name'>{b.user.name}</span></em></div>
                    <p className='text-center blog-desc'>{b.description.substring(0,250)}
                              { b.description.length>250 ?
                                <NavLink state={{id:b.id}} className="read-more" to="/fullblog">...Read More</NavLink>
                                :null
                              }
                               
                    </p>
                    { b.urls.length>0 ?
                   
                       <div className='useful-links text-center'>Useful Links:<br/>
                       {
                        b.urls.map(u=>(
                          <NavLink className="urls" to={u}>{u} , </NavLink>
                        ))
                       }
                      </div>
                      
                       :null
                   }
                    
                    </div>

                </div>   
              ))
             }
        </>
       )
}

export default CategoryBlog;