import TodoItem from "@domains/TodoItem";
import TodoCard from "@components/TodoCard";
import { memo, type ReactElement } from "react";
import "./style.css";

interface ITodoColumProps {
    items: TodoItem[];
    title: string;
}

const TodoColumn = memo(({ items, title }: ITodoColumProps): ReactElement => {
    return (
        <div key="todo-column" className="todo-column">
            <div className="todo-column-title">
                <h2>{title}</h2>
            </div>
            {!items.length && (
                <div className="todo-column-empty">There are no tasks</div>
            )}
            {items.map((item: TodoItem) => (
                <TodoCard item={item} key={item.getId()} />
            ))}
        </div>
    );
});

export default TodoColumn;
