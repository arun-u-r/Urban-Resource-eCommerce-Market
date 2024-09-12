import React, { useEffect, useState } from 'react'
import Loader from '../layouts/Loader';
import { getProducts } from '../../actions/productsActions';
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

const ProductSearch = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 10000]);

    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.productsState);

    const { keyword } = useParams();


    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center",
            })
        }
        dispatch(getProducts(keyword, price, currentPage))
    }, [error, dispatch, currentPage, keyword, price]);

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1
        setCurrentPage(selectedPage)
    }


    const pageCount = Math.ceil(productsCount / resultPerPage)

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Shop Top Quality'} />
                    <h1 id="products_heading">Search Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className='col-6 col-md-3 mb-5 mt-5'>
                                {/* price filter slider */}
                                <div className="px-5">
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
                                <hr className='my-5'/>
                                {/* category filter */}
                            </div>
                            <div className='col-6 col-md-9'>
                                <div className='row'>
                                    {products && products.map(product => (
                                        <Product product={product} col={5} key={product._id} />
                                    ))}
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