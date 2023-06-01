import React, { useState } from "react"
import usePageText from "../hooks/usePageText";
import { useSelector, useDispatch } from "react-redux";
import useFormData from "../hooks/useFormData";
import AuthApi from "../api/auth";
import { LOGIN } from "../reducers/actionTypes";


const LoginPage = () => {
    const dispatch = useDispatch()
    const [pageText] = usePageText("login")
    const INITIAL_DATA = {
        username: '',
        password: ''
    }
    const [formData, handleChange, resetFormData] = useFormData(INITIAL_DATA)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await AuthApi.login(formData.username, formData.password)
        //call dispatch to set token in local storage
        dispatch({ type: LOGIN, token: res })

    }

    return (
        <div className="Login">
            <h1>{pageText.H1}</h1>
            <form>
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">{pageText.USERNAME}</label>
                <input className="shadow border rounded py-2 px-3"
                    type="text"
                    name="username"
                    placeholder={pageText.USERNAME}
                    value={formData.username}
                    onChange={handleChange}
                    onSubmit={handleSubmit}></input>
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">{pageText.PASSWORD}</label>
                <input className="shadow  border rounded py-2 px-3"
                    type="password"
                    name="password"
                    placeholder={pageText.PASSWORD}
                    value={formData.password}
                    onChange={handleChange}
                    onSubmit={handleSubmit}></input>
                <button onClick={handleSubmit}
                    className="block bg-blue-500 border hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">{pageText.SUBMIT}</button>
            </form>
            <p>{pageText.BODY}</p>
        </div>
    )
};

export default LoginPage;
