const Button = ({type='button',disabled, onClick, children, className='',title=''}) => {
  return (
    <button
      type= {type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${className}`}
      title={title}
    >
      {/* 아이콘이 있으면 React 컴포넌트로 렌더링 */}
      {children}
    </button>
  )
}
export default Button;