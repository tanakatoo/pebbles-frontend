import React from "react"

const PasswordInput = () => {
    return (
        <div className="grid grid-cols-1 gap-6">
            <label class="block">
                <input type="password"
                    className="mt-1 block w-full rounded-md bg-grey-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
            </label>
        </div>
    )
}

export default PasswordInput