import TodoCard from "@components/TodoCard";
import TodoItem, { type TodoStatus } from "@domains/TodoItemClass";
import { memo, type ReactElement } from "react";
import "./style.css";

interface ITodoColumProps {
    items: TodoItem[];
    onCardStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoColumn = memo(
    ({ items, onCardStatusChange }: ITodoColumProps): ReactElement => (
        <div className="todo-column">
            {items.map((item: TodoItem) => (
                <TodoCard item={item} onStatusChange={onCardStatusChange} />
            ))}
        </div>
    )
);

export default TodoColumn;
