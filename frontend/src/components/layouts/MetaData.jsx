import React from 'react'
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types'

const MetaData = ({title}) => {
  return (
<Helmet>
    <title>{`${title} - Urban Resource`}</title>
</Helmet>
)
}

MetaData.propTypes = {
    title: PropTypes.string,
}


export default MetaData