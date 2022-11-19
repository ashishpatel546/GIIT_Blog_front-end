import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import EditBlog from './EditBlog';
import blogimg from './pic2.jpg';
import backend from './backend.jpg';
import devops from './devops.png';
import frontend from './frontend.png'
import java from './java.webp.png'
import javascript from './javascript.png'
import nestjs from './nestjs.jpg'
import nodejs from './nodejs.png'
import reactjs from './reactjs.jpg'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Blog=({url})=>{
    const [blog,setBlog]=useState([]);
    const [user, setUser] = useState({});
    const [isLiked,setIsLiked]=useState(false)

    useEffect(()=>{
      fetchblog()
      fetchUser()
      
  },[url,isLiked])
  
 

  const fetchUser=async()=>{
      const resp = await fetch(`${process.env.REACT_APP_URL_PREFIX}/user/fetch/currentuser`, {
                  headers: {
                      "Authorization": `Bearer ${localStorage.getItem('token')}`
                  }
              });
              const data = await resp.json();
  
              setUser(data)
              //console.log(user);
  }
    const fetchblog=async ()=>{
        try{
           
        const response= await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/${url}`,{
            headers:{
                
                "Authorization":`Bearer ${localStorage.getItem('token')}`
                          
                },
        })
        // const response= await fetch(process.env.REACT_APP_API_REACT_APP_URL)
        //console.log(response);
        const data = await response.json()
        //console.log(data);
    
        setBlog(data)
        //console.log(blog);
        
        }catch(err){
            //console.error(err.message);
            toast.error(err.message)
          }
        
    }

    const deletePost=async(id)=>{
        try{
         const deletePost= await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/${id}`,{
          method:"DELETE",
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
         })
    
         setBlog(blog.filter(b=>b.id!==id));        //to delete from page instantly without refreshing
        }catch(err){
          //console.error(err.message);
          toast.error(err.message)
        }
      }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    const likeBlog=async (id)=>{
          try {
            //console.log('liked');
             const response=await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/like/${id}`,{
              method:"PATCH",
              headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
              },
             })
             const resp=await response.json()
             console.log(resp);
             if(resp.statusCode===401)
             {
              throw new Error("You are not logged in!!")
             }
             //setBlog(blog.filter(b=> b.id===b.id));
             setIsLiked(true)

          } catch (error) {
            //console.error(error.message);
            console.log(error)
            toast.error(error.message)
          }
    }

    const unlikeBlog=async (id)=>{
      try {
        //console.log('unliked');
         const response=await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/unlike/${id}`,{
          method:"PATCH",
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
         })
         const resp=await response.json()
         //console.log(resp);
        
         setIsLiked(false)
      } catch (error) {
        //console.error(error.message);
        toast.error(error.message)
      }
}

    return(
        <>
        
        {
          blog.length===0?
          <h5 className="">No Blogs to show.</h5>
          :null
        }
              {blog.map(b => (
                <div key={b.id} className="container blog">
                   
                    <div className='blog-container'>
                   
                    
                    {
                      b.category==='NodeJS'?
                      <img className="img-fluid"alt="blog-img" src={nodejs} height="100"/>:null
                     }
                      { b.category==='Devops'?
                      <img className="img-fluid"alt="blog-img" src={devops} height="100"/>:null
                     } 
                      { b.category==='ReactJS'?
                      <img className="img-fluid"alt="blog-img" src={reactjs} height="100"/>:null
                     } 
                      { b.category==='NestJS'?
                      <img className="img-fluid"alt="blog-img" src={nestjs} height="100"/>:null
                     } 
                      { b.category==='Java'?
                      <img className="img-fluid"alt="blog-img" src={java} height="100"/>:null
                     } 
                      { b.category==='Javascript'?
                      <img className="img-fluid"alt="blog-img" src={javascript} height="100"/>:null
                     } 
                      { b.category==='Frontend'?
                      <img className="img-fluid"alt="blog-img" src={frontend} height="100"/>:null
                     } 
                      { b.category==='Backend'?
                      <img className="img-fluid"alt="blog-img" src={backend} height="100"/>:null
                     } 
                      { b.category==='Other' || b.category==null?
                      <img className="img-fluid"alt="blog-img" src={blogimg} height="100"/>:null
                     } 


                    <div className='text-center published-by'><em>Published on {formatDate(b.created_on)}</em></div>
                    <h3 className='text-center'>{b.title}</h3>
                    <div className='text-center'><em>By <span className='name'>{b.user.name}</span></em></div>
                    <p className='text-center blog-desc'>{b.description.substring(0,250)}
                              { b.description.length>250 ?
                                <NavLink state={{id:b.id}} className="read-more" to="/fullblog">...Read More</NavLink>
                                :null
                              }
                               
                    </p>
                    {/* { b.urls.length>0 ?
                   
                       <div className='useful-links text-center'>Useful Links:<br/>
                       {
                        b.urls.map(u=>(
                          <NavLink className="urls" to={u}>{u} , </NavLink>
                        ))
                       }
                      </div>
                      
                       :null
                   } */}
                     { window.location.pathname=='/myblogs' ?
                        <div className='icons-container'>
                    
                        <EditBlog b={b}/>
                        <i className="fa-solid fa-trash-can" onClick={()=>deletePost(b.id)}></i>
                        
                        </div>
                        :null
                    }
                    <div className='like-btn'>
                    { b.liked_by && b.liked_by.includes(user.id)?
                      <i className="fa-solid fa-thumbs-up" onClick={()=>unlikeBlog(b.id)}></i>
                      :<i className="fa-regular fa-thumbs-up" onClick={()=>likeBlog(b.id)}></i>
                    } 
                    {b.liked_by ? 
                       <p className='likes-number'>{b.liked_by.length} Likes</p> 
                        :<p>0 Likes</p>}
                    </div>
                   
                    
                    </div>

                </div>   
              ))
             }
    
        </>
    )
   
}

export default Blog;