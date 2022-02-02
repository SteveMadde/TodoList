import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = "all" | "active" | "completed"


function App() {


    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    function deleteTask(id: number) {
        let FilteredTasks = tasks.filter(t=> t.id !=id)
        setTasks(FilteredTasks)
    }
    let [filter, setFilter] = useState<'completed'| 'all'| 'active'>('all')
    let TaskForTodoList = tasks
    if (filter === 'active') {
        TaskForTodoList = tasks.filter(t=> t.isDone ===false)
    }
    if (filter === 'completed') {
        TaskForTodoList = tasks.filter(t=> t.isDone ===true)
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={TaskForTodoList} deleteTask={deleteTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
