import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {KeyboardEvent} from "react";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    const OnAllClickHandler = () => {
        props.changeFilter("all")
    }
    const OnActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const OnCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    const [title, setTitle] = useState('')
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={OnChange}
                   onKeyPress={onKeyPress}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                const OnClickHandler = () => {
                    props.removeTask(t.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={OnClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={OnAllClickHandler}>
                All
            </button>
            <button onClick={OnActiveClickHandler}>
                Active
            </button>
            <button onClick={OnCompletedClickHandler}>
                Completed
            </button>
        </div>
    </div>
}

