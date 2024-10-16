import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {

    const { user } = useSelector(state => state.authState);


    return (
        <div className="flex flex-col md:flex-row justify-around mt-10 p-5 bg-gray-100 rounded-lg shadow-lg user-info">
            {/* Profile Picture Section */}
            <div className="w-full md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
                <figure className="avatar avatar-profile mb-5">
                    <img className="rounded-full w-36 h-36 object-cover shadow-md border-4 border-white" src={user.avatar ?? './avatar.png'} alt="Profile" />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out">
                    Edit Profile
                </Link>
            </div>
            {/* Profile Info Section */}
            <div className="w-full md:w-1/2  md:mt-0 space-y-6">
                <div>
                    <h4 className="text-2xl font-bold text-gray-800">Full Name</h4>
                    <p className="text-gray-600 text-lg">{user.name}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-bold text-gray-800">Email Address</h4>
                    <p className="text-gray-600 text-lg">{user.email}</p>
                </div>
                <div>
                    <h4 className="text-xl font-bold text-gray-800">Joined</h4>
                    <p className="text-gray-600 text-lg">{String(user.createdAt).substring(0, 10)}</p>
                </div>
                <a href="#" className="block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-center transition-all duration-300">
                    My Orders
                </a>
                <Link to="/myprofile/update/password" className="block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-center transition-all duration-300 mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    )
}

export default Profile;
