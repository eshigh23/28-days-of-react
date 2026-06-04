
import './ToDoList.css'
import { useState } from 'react'
import {useDraggable} from '@dnd-kit/react';
import Todo from './Todo';
import {useDroppable} from '@dnd-kit/react';
import { DragDropProvider } from '@dnd-kit/react';
import {Trash2} from 'lucide-react'

export function Droppable({id, children}) {
  const {ref} = useDroppable({
    id,
  });

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

const droppableMap = {
    1: 'to-do',
    2: 'in-progress',
    3: 'done'
}

const droppableIds = [1, 2, 3]


export default function ToDoList({ todos }) {

    const [newTodo, setNewTodo] = useState('')
    const [todoss, setTodoss] = useState(todos)


    // 1. sort todos based on status
    const todo = todoss.filter(t => (
        t.status === 'to-do'
    ))

    const inprogress = todoss.filter(t => (
        t.status === 'in-progress'
    ))

    const done = todoss.filter(t => (
        t.status === 'done'
    ))


    // add a new todo
    const addNewTodo = () => {
        setTodoss([
            ...todoss,
            { 
                id: todoss.length + 1,
                text: newTodo,
                status: 'to-do'
            }
        ])

        setNewTodo('')
    }


    // delete a todo by hovering over trash
    const deleteTodo = (draggableId) => {
        const updated = todoss.filter(todo => todo.id !== draggableId)
        setTodoss(updated)
    }


    // change todo status
    const changeTodoStatus = (draggableId, droppableId) => {
        setTodoss(prev =>
            prev.map(todo => {
                if (todo.id === draggableId) {
                    return {...todo, status: droppableMap[droppableId]}
                }
                else {
                    return todo
                }
            })
        )
    }


    return (
        <div className="todolist">
            <h2>看板</h2>
            <div className="todolist--add-new">
                <label> New todo:
                    <input
                        name="newtodo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                </label>
                <button onClick={addNewTodo}>Add</button>
            </div>


            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    const draggableId = event.operation.source?.id
                    const droppableId = event.operation.target?.id

                    if (droppableId === 'trash') {
                        deleteTodo(draggableId)
                    } else {
                        changeTodoStatus(draggableId, droppableId)
                    }
                }}
            >
            <div className="todolist--kanbans">
                <Droppable id={1}>
                    <div className="kanban">
                        <h3> To-Do </h3>
                        
                        { todo.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </div>

                </Droppable>

                <Droppable id={2}>
                    <div className="kanban">
                        <h3> In Progress </h3>

                        { inprogress.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </div>
                </Droppable>


                <Droppable id={3}>
                    <div className="kanban">      
                        <h3> Done </h3>

                        { done.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </div>
                </Droppable>
            </div>

            <Droppable id="trash">
                <Trash2 color="black" className="todolist--trash" />
            </Droppable>

            </DragDropProvider>
        </div>
    )

}