import Blog from './Blog';

const Blogs = () => {


    return (

        <>
            <div className="blogs-container container">
                <div className='latest-posts'>
                    <h4 className='text-center'>Latest Posts 
                    <i class="fa-solid fa-file-lines"></i></h4>
                    <Blog url="find-all?sorted_by=DESC&limit=5" />
                </div>
                <div className='most-popular'>
                    <h4 className='text-center'>Most Popular 
                      <i class="fa-solid fa-fire-flame-curved"></i></h4>
                    <Blog url="find-all?sorted_by=DESC&limit=5" />
                </div>


            </div>
        </>
    )
}

export default Blogs;