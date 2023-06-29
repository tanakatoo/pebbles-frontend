const truncateText = (txt, numChar) => {
    let message = txt
    if (txt.length > numChar) {
        message = txt.slice(0, numChar) + "..."
    }
    return message
}

export default truncateText