import React from 'react';
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Logo from '/urban_logo.svg'

const Topbar = () => {
  return (
    <Navbar bg="light" className="justify-content-between px-4 py-0">
      <Navbar.Brand className="d-flex align-items-center"style={{ fontSize: '1rem' }}>
        <img src={Logo} height={25}/>
      </Navbar.Brand>
      <Nav className=" align-items-center">
        <div className="d-md-flex d-none align-items-center mx-3">
          <AiOutlineClockCircle size={15} className="mr-2" />
          <p className="text-gray-700 mb-0"style={{ fontSize: '0.9rem' }}>8am - 9am</p> 
        </div>
        <div className="d-md-flex d-none align-items-center mx-3">
          <AiFillPhone size={15} className="text-violet-800 mr-2" />
          <p className="text-gray-700 mb-0" style={{ fontSize: '0.9rem' }}>123-456-7890</p>
        </div>
        <Button variant="primary" className="bg-gradient" style={{ background: 'linear-gradient(to right, violet, blue)', fontSize: '0.9rem', padding: '0.2rem 0.5rem' }}>
          Get Amazed
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Topbar;