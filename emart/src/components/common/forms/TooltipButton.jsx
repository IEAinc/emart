import Button from './Button.jsx'

const TooltipButton = ({ disabled, onClick, children, className = '', tooltip = '' }) => {
  return (
    <div className="tooltip-btn">
      <Button
        disabled={disabled}
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
      {tooltip && (
        <div className="insert-tooltip" role="tooltip">
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default TooltipButton
