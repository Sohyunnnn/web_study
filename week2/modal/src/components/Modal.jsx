import './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ closeModal }) => {

  return (
    <div>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-title">안녕하세요</div>
          <p>모달 내용은 어쩌고 저쩌고..</p>
          <div className="close-wrapper">
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

export default Modal;