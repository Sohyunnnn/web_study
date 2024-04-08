import './App.css'
import { useState } from 'react';
import Modal from './components/Modal'

function App() {

  const [showModal, setShowModal] = useState(false);

  const ModalOpen = () => {
    setShowModal(!showModal);
    console.log("모달이 켜짐");
  };

  const modalClose = () => {
    setShowModal(false);
    console.log("모달이 꺼짐");
}

  return (
    <>
      <div>
      <h1>안녕하세요!</h1>
    <h3>내용내용내용</h3>
    <button onClick={ModalOpen}>버튼 열기</button>
    {showModal && <Modal closeModal={modalClose}/>}
      </div>
    </>
  )
}

export default App
