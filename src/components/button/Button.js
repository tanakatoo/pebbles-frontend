import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

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
    noShadow = false,
    disabled = false,
    hashLink = null,
    testid = false }
) => {

    return (
        <>
            <button onClick={clickMethod}
                data-testid={testid ? testid : ''}
                className={`${noShadow ? '' : 'drop-shadow'} 
                inline-flex
                items-center
                justify-center
                gap-2
                ${bkColor} 
                ${textColor} 
                ${py} 
                ${px} 
                rounded-xl
                disabled:opacity-50 ${extraClasses}
                hover:opacity-75`}
                type={type} disabled={isSubmitting || disabled}>
                {hashLink ?
                    <HashLink to={hashLink} className={`font-medium`}>{btnText}</HashLink>
                    :
                    (link && !disabled) ?
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
