import NavBar from './NavBar';
import Blogs from './Blogs';
import 'bootstrap/dist/css/bootstrap.css';
import Categories from './Categories';

const LandingPage=()=>{
    return(

        <>
          <NavBar/>
          <div className='welcome-text text-center'>Welcome to GIIT Blogs<br/>
           <span ><p className='tag-line'>...where you read and write awesome Tech Blogs</p></span>
        </div>
          <Categories/>
          <Blogs/>
          
        </>
    )
}

export default LandingPage;