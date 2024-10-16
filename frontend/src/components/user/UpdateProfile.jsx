import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, updateProfile } from '../../actions/userActions';
import { toast } from 'react-toastify';
 


const UpdateProfile = () => {

  const { loading, error, user, isUpdated } = useSelector(state => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");

  const dispatch = useDispatch();


  const onChangeAvatar = (e) => {
    const reader = new FileReader();//take data of the choossen file
      console.log(reader)
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(e.target.files[0]);
        }
      }
      reader.readAsDataURL(e.target.files[0])//data take as a url
    }

    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name",name);
      formData.append("email",email);
      formData.append("avatar", avatar);
  
      dispatch(updateProfile(formData));
    }


    useEffect(()=>{
      if(user){
        setName(user.name);
        setEmail(user.email);
        if(user.avatar){
          setAvatarPreview(user.avatar);
        }
      }

      if(isUpdated){
        toast('Profile Updated succesfully',{
          type: 'success',
          position: 'top-right',
        })
        return; 
      }
      if(error){
        toast(error,{
          type: 'error',
          position: 'top-right',
          onOpen: () => { dispatch(clearAuthError)}
        })
        return; 
      }


    },[isUpdated,user, error, dispatch])

    return (
      <div
        className="max-w-xl mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Update Your Profile</h2>

        <form method="post" action="#" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="name"
            >Full Name</label>
            <input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              type="text"
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="email"
            >Email Address</label>
            <input
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              name="email"
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 p-2">
            <label htmlFor="avatar_upload" className="block font-medium text-gray-300">Avatar</label>
            <div className="flex items-center">
              <div>
                <figure className="avatar mr-3 rtl:ml-3">
                  <img
                    src={avatarPreview}
                    className="rounded-full w-16 h-16"
                    alt="Avatar Preview"
                  />
                </figure>
              </div>
              <div className="relative">
                <input
                  type="file"
                  name="avatar"
                  id="customFile"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-gray-700 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={onChangeAvatar}
                />
                {/* <label className="block text-gray-500 text-sm" htmlFor="customFile">
                Choose Avatar
            </label> */}
              </div>
            </div>
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300" htmlFor="bio"
            >Bio</label>
            <textarea
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              rows="3"
              name="bio"
              id="bio"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

    )
  }

  export default UpdateProfile