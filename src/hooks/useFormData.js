import React, { useState } from "react"

const useFormData = (INITIAL_DATA) => {
    const [data, setData] = useState(INITIAL_DATA)
    console.log('data is', data)
    const handleChange = (e) => {
        console.log('e name is', e.target.name)
        console.log('e value is', e.target.name)
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