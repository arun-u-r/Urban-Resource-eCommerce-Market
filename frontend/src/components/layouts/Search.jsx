import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './search.css';


const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const location = useLocation();


    const searchHandler = (e) => {
        e.preventDefault(); //prevent browserloading
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if (location.pathname == '/') {
            clearKeyword();
        }
    }, [location])

    return (
        <div>
            <form onSubmit={searchHandler}>
                <div className="input-group w-full">
                    <input
                        type="text"
                        id="search_field"
                        className=" input"
                        placeholder="Search Products"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
            
        </div>

    )
}

export default Search