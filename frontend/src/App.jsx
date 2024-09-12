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
// import Loader from './components/layouts/Loader'


function App() {

  return (
    <Router>
      <div className='App'>
        <HelmetProvider>
          <Topbar />
          <Header />
          <div className='container container-fluid'>
          <ToastContainer theme='dark' />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
          </div>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  )
}

export default App
