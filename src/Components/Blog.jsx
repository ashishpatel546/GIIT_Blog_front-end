import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import EditBlog from './EditBlog';
import blogimg from './pic2.jpg';

const Blog=({url})=>{

    const [blog,setBlog]=useState([]);
   

    const fetchblog=async ()=>{
        try{
            console.log('Fetching data');
        const response= await fetch(`http://[::1]:8000/blogs/${url}`,{
            headers:{
                
                "Authorization":`Bearer ${localStorage.getItem('token')}`
                          
                },
        })
        // const response= await fetch(process.env.REACT_APP_API_URL)
        //console.log(response);
        const data = await response.json()
        console.log(data);
        // let resp = JSON.parse(response);
        // const res = JSON.parse(resp);
        // console.log(res)
        // const data= Array.from(res.data);
        setBlog(data)
        
        
        }catch(err){
            console.error(err.message);
          }
        
    }

    const deletePost=async(id)=>{
        try{
         const deletePost= await fetch(`http://[::1]:8000/blogs/${id}`,{
          method:"DELETE",
          headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
         })
    
         setBlog(blog.filter(b=>b.id!==id));        //to delete from page instantly without refreshing
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

    return(
        <>
        
        
              {blog.map(b => (
                <div key={b.id} className="container blog">
                   
                    <div className='blog-container'>
                    { window.location.pathname=='/myblogs' ?
                        <div className='icons-container'>
                    
                        <EditBlog id={b.id}/>
                        <i class="fa-solid fa-trash-can" onClick={()=>deletePost(b.id)}></i>
                        </div>
                        :null
                    }
                    
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

export default Blog;