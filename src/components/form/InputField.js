const InputField = ({ id, type, style, onChange }) => (
    <>
        <input id={id} type={type} onChange={onChange} style={style}></input>
    </>
)
export default InputField