import Blog from './Blog';

const Blogs=()=>{

   
    return(
        
        <>
        <div className="blogs-container container">
        <div className='welcome-text text-center'><h2>Welcome to GIIT Blogs</h2></div>
         <Blog url="find-all?sorted_by=DESC&limit=5"/>
        </div>
        </>
    )
}

export default Blogs;