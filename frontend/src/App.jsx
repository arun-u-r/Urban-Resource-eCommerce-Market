import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import Home from './components/Home'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import Topbar from './components/layouts/Topbar'
import ProductDetails from './components/product/ProductDetails';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
// import Loader from './components/layouts/Loader'
import store from './store/store'
import { loadUser } from './actions/userActions';
import NavBar from './components/layouts/NavBar';
import Profile from './components/user/Profile';
import HoverCard from './components/extra components/HoverCard';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import PasswordUpdate from './components/user/PasswordUpdate.jsx';


function App() {

  useEffect(() =>{
    store.dispatch(loadUser)
  })

  return (
    <Router>
      <div className='App'>
        <HelmetProvider>
          <Topbar />
          <NavBar/>
          {/* <Header /> */}
          <div className='container container-fluid'>
          <ToastContainer theme='dark' />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/myprofile/update/password" element={<ProtectedRoute><PasswordUpdate /></ProtectedRoute>} />
          </Routes>
          </div>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  )
}

export default App
