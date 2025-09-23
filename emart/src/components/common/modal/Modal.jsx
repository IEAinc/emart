import Button from '../../common/forms/Button.jsx'
import { HiX } from "react-icons/hi";
const Modal = ({isOpen, onClose, title, children,footerButtons}) => {
  if (!isOpen) return null;
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} data-modal-type={`${footerButtons} ? fixed-btn-ver : ''`}>
      {/* 배경 (Backdrop) */}
      <div
        className="modal-bg"
        onClick={onClose} // 배경 클릭 시 닫힘
      />
      <div className="modal-content">
        <div className="title-wrap">
          {title && (<h3>{title}</h3>)}
          <Button onClick={onClose}>
            <HiX/>
            <span className="sr-only">닫기</span>
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footerButtons && (
          <div className="modal-footer-wrap">
            {footerButtons}
          </div>
        )}
      </div>
    </div>
  );
}
export default Modal;