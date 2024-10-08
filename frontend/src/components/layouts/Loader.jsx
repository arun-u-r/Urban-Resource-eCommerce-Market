import React from 'react'
import '../../styles/loader.css'

const Loader = () => {
    return (
        <div className='load'>
            <div className="hourglassBackground">
                <div className="hourglassBackgroundBorder"></div>
                <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader