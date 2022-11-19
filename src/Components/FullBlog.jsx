import NavBar from "./NavBar";
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FullBlog = ({ setAuth, isauth }) => {

  const location = useLocation();
  const {state} =location;

 

  const [blog, setBlog] = useState([]);

 
  useEffect(() => {
    getblog()
  }, [])

  const getblog = async () => {
    // setBlog({name: 'ashish'})
    try {
    
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/${state.id}`, {
        headers: {

          "Authorization": `Bearer ${localStorage.getItem('token')}`

        },
      })

      const data = await response.json()
      setBlog([data])

    } catch (err) {
      //console.error(err.message);
      toast.error(err.message)
    }
  }
 

  const deletePost = async (id) => {
    try {
      const deletePost = await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      })

      setBlog(blog.filter(b => b.id !== id));        //to delete from page instantly without refreshing
    } catch (err) {
      //console.error(err.message);
      toast.error(err.message)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }




  return (
    <>
      <NavBar setAuth={setAuth} isauth={isauth} />

      {blog.map(b => (
    <div key={b.id} className="container blog">

        <div className='blog-container'>
         

          <div className='text-center published-by'><em>Published on {formatDate(b.created_on)}</em></div>
          <h3 className='text-center'>{b.title}</h3>
          <div className='text-center'><em>By <span className='name'>{b.user.name}</span></em></div>
          <p className='text-center blog-desc'>{b.description} 
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

        </p>
        </div>
      </div> 
 ))
}

    </>
  )
}

export default FullBlog;