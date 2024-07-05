import {useSelector, useDispatch } from 'react-redux'
import { remove , complete } from '../redux/todoSlice'
import s from './TodoList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


export default function TodoList() {
    const todolist = useSelector(state => state.todo)
    const dispatch = useDispatch()

    const trash = <FontAwesomeIcon icon={faTrashCan} />


    console.log(todolist)

    const todolistView = todolist.map((todo, idx) => (
        
    <li className={s.list}key={todolist[idx].id}>
        <input className={s.checkbox} type="checkbox" 
        onChange={()=> dispatch(complete(todolist[idx].id))}/>
        <div className={s.todolist}>{todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}</div>
        <button className={s.deleteBtn} type="button" onClick={() => dispatch(remove(todolist[idx].id))}>{trash}</button>
    </li> 
    )
    )


  return (
      <>
     <ul>{todolistView}</ul>   
      </>
  )
}

// useSelector를 import 해주기
// useSelector를 이용해야 리듀서에 있는 state에 접근 할 수 있음.
// remove와 complete 액션을 불러오기

// checkbox 버튼과 휴지통 버튼을 누르면 dispatch()로 리듀서에 id값을 넘겨 remove와 complete 액션을 통해 새로운 값을 반환