import React, { useState } from "react"

const useFormData = (INITIAL_DATA) => {
    const [data, setData] = useState(INITIAL_DATA)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }

    const resetData = () => {

        setData(INITIAL_DATA)
    }
    console.log('after setting value, this is data', data)
    return [data, setData, handleChange, resetData]
}
export default useFormData