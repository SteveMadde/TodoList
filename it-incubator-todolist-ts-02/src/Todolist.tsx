import React from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (taskID: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    const MapMassive = props.tasks.map( t =>
            <li>
                <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
                <button onClick={ () =>{props.deleteTask(t.id)} }>delete</button>
        </li>
        )

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button >+</button>
        </div>
        <ul>
            {MapMassive}
        </ul>
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
