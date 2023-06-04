
export const Button = ({ btnText, clickMethod = null, type }) => {

    return (
        <>
            <button onClick={clickMethod}
                className="block bg-primary border text-white hover:bg-primary-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type={type}>{btnText}</button>
        </>
    )
}
