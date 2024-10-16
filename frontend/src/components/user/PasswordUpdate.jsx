import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAuthError, changePassword } from '../../actions/userActions';
import { LiaEyeSlashSolid, LiaEye } from "react-icons/lia";
import { TbEyeglassOff, TbEyeglass } from "react-icons/tb";

const PasswordUpdate = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState("")
    const [showNewPassword, setShowNewPassword] = useState("");
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState);


    const submitHandler = (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("oldPassword", oldPassword);
        // formData.append("newPassword", newPassword);
        // formData.append("confirmNewPassword", confirmNewPassword);

        const passwordData = {
            oldPassword,
            newPassword,
            confirmNewPassword,
        }
        dispatch(changePassword(passwordData));
    };

    useEffect(() => {
        if (isUpdated) {
            toast('Profile Updated Succesfully', {
                type: 'success',
                position: 'top-right',
            })

            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            return;
        }

        if (error) {
            toast(error, {
                type: 'error',
                position: 'top-right',
                onOpen: () => dispatch(clearAuthError()) 

            })
            return;
        }
    }, [isUpdated, error, dispatch]);



    return (
        <section>
            <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                    <div className="flex flex-col">
                        <div>
                            <h2 className="text-4xl text-black">Reset password</h2>
                        </div>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="mt-4 space-y-6">
                                <label className="block mb-3 text-sm font-medium text-gray-600"> Old Password   </label>
                            <div className="relative col-span-full flex justify-center">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="******"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showOldPassword ? <TbEyeglassOff size={20}/> : <TbEyeglass size={20} />
                                    }
                                </button>
                            </div>
                                <label className="block mb-3 text-sm font-medium text-gray-600"> Password   </label>
                            <div className="relative col-span-full flex justify-center">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="******"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <LiaEyeSlashSolid size={20}/> : <LiaEye size={20} />}
                                </button>
                            </div>
                                <label className="block mb-3 text-sm font-medium text-gray-600"> Confirm passord   </label>
                            <div className="relative col-span-full flex justify-center">
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    placeholder="******"
                                    value={confirmNewPassword}
                                    onChange={e => setConfirmNewPassword(e.target.value)}
                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmNewPassword ? <LiaEyeSlashSolid/> : <LiaEye size={20}/>}
                                </button>
                            </div>

                            <div className="col-span-full">
                                <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"> Submit your request   </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}


export default PasswordUpdate