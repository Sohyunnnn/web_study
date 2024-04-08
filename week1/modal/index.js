const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.querySelector(".modal-wrapper");

open.onclick = () => {
  modal.style.display = "flex";
};
close.onclick = () => {
  modal.style.display = "none";
};

//id 가 아닌 클래스로 DOM을 선택하고 싶을땐 document.getElementsByClassName 또는 document.querySelector 를 사용
//document.querySelector 를 사용하여 class 값으로 DOM 을 선택 할 때에는 텍스트 앞에 . 을 붙여줘야 함.