
import {useDraggable} from '@dnd-kit/react';

export default function Todo({ todo }) {

    const {ref} = useDraggable({
        id: todo.id,
    });

    return (
        <div ref={ref} className="todo-item">
            <p>{todo.text}</p>
        </div>
    )

}