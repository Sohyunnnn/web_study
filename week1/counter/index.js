const number = document.getElementById("number");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");

console.log(number);
console.log(increase);
console.log(decrease);

console.log(number.innerText); // 내용
console.log(increase.offsetTop); // top 위치
console.log(decrease.id); // id

increase.onclick = () => {
  const current = parseInt(number.innerText, 10);
  number.innerText = current + 1;
  console.log("increase 가 클릭됨");
};

decrease.onclick = () => {
  const current = parseInt(number.innerText, 10);
  number.innerText = current - 1;
  console.log("decrease 가 클릭됨");
};

//parseInt 는 문자열을 숫자로 변환해주는 함수
//10을 넣어준 것은, 10진수로 숫자를 받아오겠다는 의미