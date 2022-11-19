import NavBar from "./NavBar";
import { useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
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


const SearchResults = ({setAuth,isauth}) => {

  const [blogs, setBlogs] = useState([])
  const location = useLocation();


  const searchKeys = location.state.keys;

  const searchBlogs = async () => {

    const keys = "keys=" + searchKeys.join('&keys=');
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_PREFIX}/blogs/find-by-keys?${keys}`, {
        headers: {

          "Authorization": `Bearer ${localStorage.getItem('token')}`

        },
      });

      const data = await response.json();
      //console.log(data);

      const flatData= data.flat(1);
     
      setBlogs(flatData)
     




    } catch (err) {
      //console.log(err.message)
      toast.error(err.message)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    searchBlogs()
  }, [searchKeys])


  return (

    <>
      <NavBar setAuth={setAuth} isauth={isauth}/>
      <h4 className="text-center mt-3 search-results">Search Results corresponding to : "{searchKeys}"</h4>

      {
        blogs.length === 0 ?
          <h5 className="">No Blogs to show.</h5>
          : null
      }
      <div className="searched-blogs">
      {
        blogs.map(b => (
          <div key={b.id} className="container blog">

            <div className='blog-container'>


              {
                b.category === 'NodeJS' ?
                  <img className="img-fluid" alt="blog-img" src={nodejs} height="100" /> : null
              }
              {b.category === 'Devops' ?
                <img className="img-fluid" alt="blog-img" src={devops} height="100" /> : null
              }
              {b.category === 'ReactJS' ?
                <img className="img-fluid" alt="blog-img" src={reactjs} height="100" /> : null
              }
              {b.category === 'NestJS' ?
                <img className="img-fluid" alt="blog-img" src={nestjs} height="100" /> : null
              }
              {b.category === 'Java' ?
                <img className="img-fluid" alt="blog-img" src={java} height="100" /> : null
              }
              {b.category === 'Javascript' ?
                <img className="img-fluid" alt="blog-img" src={javascript} height="100" /> : null
              }
              {b.category === 'Frontend' ?
                <img className="img-fluid" alt="blog-img" src={frontend} height="100" /> : null
              }
              {b.category === 'Backend' ?
                <img className="img-fluid" alt="blog-img" src={backend} height="100" /> : null
              }
              {b.category === 'Other' || b.category == null ?
                <img className="img-fluid" alt="blog-img" src={blogimg} height="100" /> : null
              }


              <div className='text-center published-by'><em>Published on {formatDate(b.created_on)}</em></div>
              <h3 className='text-center'>{b.title}</h3>
              <div className='text-center'><em>By <span className='name'>{b.user.name}</span></em></div>
              <p className='text-center blog-desc'>{b.description.substring(0, 250)}
                {b.description.length > 250 ?
                  <NavLink state={{ id: b.id }} className="read-more" to="/fullblog">...Read More</NavLink>
                  : null
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


            </div>

          </div>
        ))
       
      }
       </div>
    </>
  )
}

export default SearchResults;