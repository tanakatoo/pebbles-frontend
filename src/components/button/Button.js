import { Link } from "react-router-dom"



export const Button = ({
    btnText,
    clickMethod = null,
    type,
    bkColor = 'bg-primary border',
    textColor = "text-white",
    py = "py-3",
    isSubmitting = false,
    extraClasses = '',
    link = null }) => {

    console.log('issubmittin gi', isSubmitting)
    return (
        <>
            <button onClick={clickMethod}
                className={`block ${bkColor} ${textColor} ${py} px-4 rounded-xl disabled:opacity-50 ${extraClasses}`}
                type={type} disabled={isSubmitting}>
                {link ? <Link to={link}>{btnText}</Link> : btnText}

            </button >
        </>
    )
}
