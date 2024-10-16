import axios from "axios";
import {
  changePasswordFail,
  changePasswordRequest,
  changePasswordSuccess,
  clearError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlice";

//login-----------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//register----------------------------
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};


//clearing auth errors------------------------
export const clearAuthError = () => (dispatch) => {
  dispatch(clearError());
};

//user profile-----------------------
export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());
        
    const { data } = await axios.get(`/api/v1/myprofile`);
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};


export const logout = async (dispatch) => {
  try {
        
    await axios.get(`/api/v1/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};


//update profile----------------------------
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`/api/v1/updateuser`, userData, config);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};



export const changePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch(changePasswordRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
        },
    }
   
    await axios.put(`/api/v1/password/change`, passwordData, config);
    dispatch(changePasswordSuccess());
  } catch (error) {
    dispatch(changePasswordFail(error.response.data.message));
  }
};