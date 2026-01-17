import TodoCard from "@components/TodoCard";
import TodoItem, { type TodoStatus } from "@domains/TodoItem";
import { memo, type ReactElement } from "react";
import "./style.css";

interface ITodoColumProps {
    items: TodoItem[];
    title: string;
    onCardStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoColumn = memo(
    ({ items, onCardStatusChange, title }: ITodoColumProps): ReactElement => (
        <div key="todo-column" className="todo-column">
            <div className="todo-column-title">
                <h2>{title}</h2>
            </div>
            {items.map((item: TodoItem) => (
                <TodoCard
                    item={item}
                    onStatusChange={onCardStatusChange}
                    key={item.getId()}
                />
            ))}
        </div>
    ),
);

export default TodoColumn;
