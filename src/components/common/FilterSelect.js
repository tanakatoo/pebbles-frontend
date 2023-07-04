import React from 'react'


function FilterSelect({ lang, options, label, name }) {

    return (
        <div className='flex flex-col w-full px-2'>
            <label className={`mb-1 text-mobile-section-header 
            font-medium`}
                htmlFor={name}>
                {label}
            </label>
            <select name={name}
                className={`${lang === "JA" ? 'font-NotoSansJPRegular' : 'font-poppins'} grow mb-2 rounded-ml py-3 ps-4 pe-12 text-black placeholder-gray `}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.key}</option>))
                }
            </select>
        </div>
    )
}

export default FilterSelect