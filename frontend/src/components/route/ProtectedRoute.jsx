import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  
    const { isAuthenticated } = useSelector(state => state.authState)
  
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node
}

export default ProtectedRoute