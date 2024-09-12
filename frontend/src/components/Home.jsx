import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { getProducts } from '../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './layouts/Loader';
import Product from './product/Product';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';



const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);


    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.productsState);
    // console.log("product data is -", products)

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center",
            })
        }
        dispatch(getProducts(null,null ,currentPage))
    }, [error, dispatch, currentPage]);

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
                    <h1 id="products_heading">Latest Products</h1>
                    <div>
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
                    </div>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product product={product} col={3} key={product._id} />
                            ))}
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

export default Home