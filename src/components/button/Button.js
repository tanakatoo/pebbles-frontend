import { Link } from "react-router-dom"

export const Button = ({
    icon = null,
    btnText,
    clickMethod = null,
    type = 'button',
    bkColor = 'bg-primary border-primary',
    textColor = "text-white",
    py = "py-3",
    px = "px-4",
    isSubmitting = false,
    extraClasses = '',
    link = null,
    disabled = false }
) => {

    return (
        <>
            <button onClick={clickMethod}
                className={`drop-shadow inline-flex items-center justify-center gap-2 ${bkColor} ${textColor} ${py} ${px} rounded-xl disabled:opacity-50 ${extraClasses}`}
                type={type} disabled={isSubmitting || disabled}>
                {link ?
                    icon ? <>
                        {icon}
                        <Link to={link} className={`font-medium`}>{btnText}</Link>
                    </>
                        :
                        <Link to={link} className={`font-medium`}>{btnText}</Link>
                    :
                    icon ? <>
                        {icon}
                        <span className={`font-medium`}>{btnText}</span>
                    </>
                        : <span className={`font-medium`}>{btnText}</span>
                }


            </button >
        </>
    )
}
