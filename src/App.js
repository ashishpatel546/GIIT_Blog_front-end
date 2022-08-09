import {Routes,Route,Navigate} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { useState ,useEffect} from 'react';
import Home from './Components/Home';
import NewBlog from './Components/NewBlog';
import MyBlogs from './Components/MyBlogs';
import FullBlog from './Components/FullBlog';

const App=()=> {
  const [isAuthenticated,setAuthenticated]=useState(false);

  const setAuth= boolean=>{
    setAuthenticated(boolean);
  } 

  var isauth;
  async function isAuth(){
    try{
      const response=await fetch("http://[::1]:8000/app-check/validate-jwt",{
        method:"GET",
        headers:{
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      })

      const parseRes= await response.json();
      console.log(parseRes);
      parseRes.isTokenVerified ? (setAuthenticated(true)):setAuthenticated(false);
      parseRes.isTokenVerified ? isauth=true:isauth=false;
      
    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isAuth();
  })

  return (
    <>
     <Routes>
      <Route path="/" element={<LandingPage setAuth={setAuth} />} ></Route>
      <Route path="/home" element={isAuthenticated?(<Home setAuth={setAuth} isauth={isAuthenticated} />):(<Login setAuth={setAuth}/>)}></Route>
      <Route path="/myblogs" element={isAuthenticated?(<MyBlogs setAuth={setAuth} isauth={isAuthenticated} />):(<Login setAuth={setAuth}/>)}></Route>
      <Route path="/signup" element={!isAuthenticated?(<SignUp setAuth={setAuth}/>):<Home setAuth={setAuth} isauth={isAuthenticated}/>}></Route>
      <Route path="/login" element={!isAuthenticated?(<Login setAuth={setAuth}/>):(<Home setAuth={setAuth} isauth={isAuthenticated}/>)}></Route>
      <Route path="/newblog" element={isAuthenticated?(<NewBlog setAuth={setAuth} isauth={isAuthenticated}/>):(<Login setAuth={setAuth}/>)}></Route>
      <Route path="/fullblog" element={isAuthenticated?(<FullBlog setAuth={setAuth} isauth={isAuthenticated}/>):(<Login setAuth={setAuth}/>)}></Route>
     </Routes>
     
    </>
  
  );
}

export default App;
