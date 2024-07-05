import {useState} from 'react'
import {useDispatch  } from 'react-redux'
import {add} from '../redux/todoSlice'
import s from './InputTodo.module.css'

export default function InputTodo() {
    const dispatch = useDispatch()

    const [todolist, setTodolist] = useState(
    {
        id : 0,
        text : "",
    }
    )

    function handleText(e) {
        setTodolist({text : e.target.value})
    }

    function onReset () {
        setTodolist({text : ""})
    }
  
    
  return (
      <div className={s.InputTodo}>
      <form onSubmit={(e) => {
        e.preventDefault()
        if(todolist.text !== ""){dispatch(add(todolist.text))}
        else(alert("할 일을 입력해주세요!"))
        onReset()
        }}>
            <div>
            <input className={s.textbar} type="text"  
            value = {todolist.text} onChange={handleText}></input>
            <input className={s.submitbutton} type="submit" value="+"></input>
            </div>
        </form>
      </div>

    )
}

  // useState를 사용하여 todolist라는 state를 만들어주고,
  // submit 버튼을 클릭 or 엔터키를 치면 dispatch를 통해 todolist.text 값을 넘겨준다.