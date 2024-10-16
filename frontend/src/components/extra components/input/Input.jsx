import React, { useState } from 'react';
import './input.css'
import PropTypes from 'prop-types';

const Input = ({ email, setEmail, password, setPassword }) => {

    const isEmail = email !== undefined && setEmail !== undefined;
    const isPassword = password !== undefined && setPassword !== undefined;

    return (
        <div>
            <div className={`input__container mb-5 ${isEmail ? "email" : "password"}`}>
                <div className="shadow__input"></div>
                <button className="input__button__shadow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#000000"
                        width="20px"
                        height="20px"
                    >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        ></path>
                    </svg>
                </button>
                <input
                    type={isEmail ? "email" : isPassword ? "password" : "text"}
                    name={isEmail ? "email" : "password"}
                    className="input__search"
                    placeholder={isEmail ? "Enter email" : "Enter password"}
                    value={isEmail ? email : password}
                    onChange={e => isEmail ? setEmail(e.target.value) : setPassword(e.target.value)}
                    autoComplete={isEmail ? "email" : "current-password"}
                />
            </div>

        </div>
    )
}

Input.propTypes = {
    email: PropTypes.string,
    setEmail: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func


}

export default Input