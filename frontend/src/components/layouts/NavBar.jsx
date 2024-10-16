import { useState } from 'react'
import { FaFacebook, FaTwitter, FaGooglePlusG, FaInstagram, FaBars, FaChevronDown } from 'react-icons/fa'
import { IoCloseSharp } from "react-icons/io5";
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';

// ````````````````````````````````````````

//_________________________________________

const NavBar = () => {
    const [nav, setNav] = useState(false)

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => setNav(!nav)

    const logoutHandler = () => {
        dispatch(logout)
    }



    return (
        <div className='flex justify-between items-center w-full min-h-[50px] text-white bg-gray-700/80'>
            <ul className='hidden sm:flex px-4 space-x-6 '>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <a href='#about'>About</a>
                </li>
                <li>
                    <a href='#gallery'>gallery</a>
                </li>
                <li>
                    <a href='#contact'>Contact</a>
                </li>
            </ul>
            <div className='w-full sm:w-1/2 md:w-1/3 px-4'>

                <Search />
            </div>

            <div className='justify-between hidden sm:flex'>
                <FaFacebook className='mx-2' />
                <FaTwitter className='mx-2' />
                <FaGooglePlusG className='mx-2' />
                <FaInstagram className='mx-2' />
            </div>

            {/* login and cart button */}
            <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end space-x-4 mx-3">
                {isAuthenticated ?
                    (
                        <Dropdown className="">
                            <Dropdown.Toggle variant='default text-white pr-5 ' id='dropdown-basic'
                                className="flex items-center space-x-3 py-2 px-4 bg-gray-500 rounded-full focus:outline-none hover:bg-gray-600">
                                <figure className='avatar avatar-nav'>
                                    <Image src={user.avatar ?? '/avatar.png'} alt='Avatar' width='50px' className='rounded-full' />
                                </figure>
                                <span>{user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="mt-2 w-48 bg-white shadow-lg rounded-lg divide-gray-200">
                                <Dropdown.Item onClick={()=>navigate('/myprofile')} className="py-2 px-4 hover:bg-gray-100 text-gray-700">
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item className="py-2 px-4 hover:bg-gray-100 text-gray-700">
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler} className='py-2 px-4 hover:text-red-500 hover:bg-gray-100 text-red-600'>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    :
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </Link>
                }
                <div className="flex items-center space-x-1 sm:flex">
                    <span id="cart" className="cursor-pointer">
                        Cart
                    </span>
                    <span id="cart_count" className="text-sm bg-gray-200 rounded-full px-2 py-1">
                        2
                    </span>
                </div>
            </div>


            {/* hamburger icon */}

            <div onClick={handleClick} className='sm:hidden z-10 justify-between'>
                {!nav ? <FaBars size={22} className='mr-4 cursor-pointer' /> : <IoCloseSharp size={22} className='mr-4 cursor-pointer' />}
            </div>

            {/* mobile view */}

            <div className={nav ? 'overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 left-0 top-0 h-screen w-full bg-black/90 px-4 py-7 flex flex-col'
                : 'absolute top-0 h-screen left-[-100%] ease-in duration-500'}>

                <ul className='h-full w-full text-center pt-12'>
                    <li className='text-2xl py-8 hover:text-white hover:scale-105  duration-300'>
                        <a href='#home' >Home</a>
                    </li>
                    <li className='text-2xl py-8 hover:text-white hover:scale-105  duration-300'>
                        <a href='#about' >About</a>
                    </li>
                    <li className='text-2xl py-8 hover:text-white hover:scale-105  duration-300'>
                        <a href='#Deals' >About</a>
                    </li>
                    <li className='text-2xl py-8 hover:text-white hover:scale-105  duration-300'>
                        <a href='#gallery'>Gallery</a>
                    </li>
                    <li className='text-2xl py-8 hover:text-white hover:scale-105  duration-300'>
                        <a href='#contact'>Contact</a>
                    </li>
                </ul>
            </div>



        </div>
    )
}

export default NavBar