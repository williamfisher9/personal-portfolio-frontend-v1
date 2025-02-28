const ToolButton = ({children, active, onClick}) => {
    return <button className={`${active ? 'text-white bg-black' : ''}`} onClick={onClick}>{children}</button>
}

export default ToolButton