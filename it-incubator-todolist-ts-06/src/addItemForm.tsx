import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemForm = {
    addTask: (todolistId: string) => void
}

export const AddItemForm = (props: AddItemForm) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addTask(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
  return (
      <div>
          <input value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 className={error ? "error" : ""}
          />
          <button onClick={addItem}>+</button>
          {error && <div className="error-message">{error}</div>}
      </div>
  )
}