import React, {useState} from 'react';

type EditableSpanPropsType = {
    value: string
    changeValue: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    return editMode
        ? <input value={props.value}/>
        : <span onDoubleClick={activatedEditMode}>{props.value}</span>
}