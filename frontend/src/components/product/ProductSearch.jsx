import React, { useEffect, useState } from 'react'
import Loader from '../layouts/Loader';
import { getProducts } from '../../actions/productActions';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Product from './Product';
import MetaData from '../layouts/MetaData';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
// import NillLoading from '../extra components/NillLoading';

const ProductSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 10000]);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.productsState);
    const { keyword } = useParams();

    const categories = [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food and beverage",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Automobile",
        "Sports",
        "Outdoor",
        "Home",
    ];

    const ratings = [1, 2, 3, 4, 5];

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center",
            })
        }
        dispatch(getProducts(keyword, price, category, rating, currentPage))
    }, [error, dispatch, currentPage, keyword, price, category, rating]);


    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1
        setCurrentPage(selectedPage)
    }

    const checkProductExists = (star) => {
        setRating(star)
    }


    const pageCount = Math.ceil(productsCount / resultPerPage)

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Shop Top Quality'} />
                    <h1 id="products_heading">Search Products</h1>
                    <h2 id='products_heading'>{category}</h2>
                    <h3 id='products_heading'>Search result for &quot;{keyword}&quot;</h3>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className='col-6 col-md-3 mb-5 mt-5'>
                                {/* price filter slider */}
                                <div className="px-5 ">
                                    {/* slider */}
                                    <Slider
                                        range={true}
                                        marks={
                                            {
                                                1: "$1",
                                                10000: "$10000"
                                            }
                                        }
                                        min={1}
                                        max={10000}
                                        // step={10}
                                        defaultValue={price}
                                        onChangeComplete={price => {
                                            setPrice(price)
                                        }}
                                        handleRender={
                                            renderProps => {
                                                return (
                                                    <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                                        <div {...renderProps.props}></div>
                                                    </Tooltip>
                                                )
                                            }
                                        }
                                    />
                                </div>
                                <hr className='my-5' />
                                {/* category filter */}
                                <div className="mt-5">
                                    <h3 className='mb-3'>Categories</h3>
                                    <ul className='pl-0'>
                                        {categories.map(category =>
                                            <li
                                                style={{
                                                    cursor: 'pointer',
                                                    listStyleType: 'none'
                                                }}
                                                key={category}
                                                onClick={() => { setCategory(category) }}
                                            >
                                                {category}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <hr className='my-5' />
                                {/* ratings filter */}
                                <div className='mt-5'>
                                    <h4 className='mt-5'>Ratings</h4>
                                    <ul className='pl-0'>
                                        {ratings.map(star =>
                                            <li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                key={star}
                                                onClick={() => { checkProductExists(star) }}
                                            >
                                                <div className='rating-outer'>
                                                    <div className='rating-inner' style={{ width: `${star * 20}%` }}></div>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                            </div>
                            <div className='col-6 col-md-9'>
                                <div className='row'>
                                    {products && products.length > 0 ? (products.map(product => (
                                        <Product product={product} col={5} key={product._id} />
                                        ))) : (
                                        <div>
                                            <h6 className='mt-5 ml-5 text-center'>No Products Found in this rating ({rating})</h6>
                                            {/* <NillLoading/> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    {productsCount > 0 && productsCount > resultPerPage ? (
                        <div className='d-flex justify-content-center mt-5'>
                            <ReactPaginate
                                previousLabel={'< Prev'}
                                nextLabel={'Next >'}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={3}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                renderOnZeroPageCount={null}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                                forcePage={currentPage - 1}
                            />
                        </div>) : null}
                </>
            }
        </>
    )
}


export default ProductSearch