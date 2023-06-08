import React from "react"

//this is the error message that displays under the input fields and this makes a div for it

function FormError(props) {
    return (
        <div class="error">
            {props.children}
        </div>
    )
}

export default FormError