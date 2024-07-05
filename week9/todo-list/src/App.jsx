
import './App.css'
import InputTodo from './components/InputTodo.jsx'
import TodoList from './components/TodoList.jsx';

function App() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <InputTodo />
        <TodoList />
      </div>
    );
}

export default App

