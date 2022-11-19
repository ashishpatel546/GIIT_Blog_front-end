import { useState, Redirect } from "react";
import Button from "react-bootstrap/Button";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const SearchBlogs = () => {
    const [searchKeys, setSearchKeys] = useState([]);
    

    const navigate = useNavigate();

   

    

    

    const toNextPage=()=>{
          navigate('/search-results',
                {
                    state: {
                        keys:searchKeys
                    }
                });
    }


    return (
        <>
            <div className="search-bar">
                <input type="text" className="search-input" value={searchKeys}
                    onChange={e => setSearchKeys(e.target.value.split(','))} name="searchKeys" placeholder="enter search tags" />
                <Button onClick={toNextPage} className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></Button>
                {/* <Button onClick={() => abc(searchKeys)} className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></Button> */}
            </div>
            {/* <SearchResults blogs={searchResults}/> */}
        </>
    )

}

export default SearchBlogs;