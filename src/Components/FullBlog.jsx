import NavBar from "./NavBar";
import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import EditBlog from "./EditBlog";

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
      console.log('Fetching data');
      const response = await fetch(`http://[::1]:8000/blogs/${state.id}`, {
        headers: {

          "Authorization": `Bearer ${localStorage.getItem('token')}`

        },
      })

      const data = await response.json()
      setBlog([data])

    } catch (err) {
      console.error(err.message);
    }
  }
  console.log(blog);

  const deletePost = async (id) => {
    try {
      const deletePost = await fetch(`http://[::1]:8000/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      })

      setBlog(blog.filter(b => b.id !== id));        //to delete from page instantly without refreshing
    } catch (err) {
      console.error(err.message);
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
            

        </p>
        </div>
      </div> 
 ))
}

    </>
  )
}

export default FullBlog;