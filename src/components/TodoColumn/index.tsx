import TodoCard from "@components/TodoCard";
import TodoItem, { TodoStatus } from "@domains/TodoItem";
import { memo, type ReactElement } from "react";
import "./style.css";

interface ITodoColumProps {
    items: TodoItem[];
    title: string;
    removeCard: (id: string) => void;
    showEditForm: (formForCardId: string) => void;
    onCardStatusChange: (id: string, newStatus: TodoStatus) => void;
}

const TodoColumn = memo(
    ({
        items,
        title,
        onCardStatusChange,
        showEditForm,
        removeCard,
    }: ITodoColumProps): ReactElement => (
        <div key="todo-column" className="todo-column">
            <div className="todo-column-title">
                <h2>{title}</h2>
            </div>
            {items.map((item: TodoItem) => (
                <TodoCard
                    item={item}
                    key={item.getId()}
                    onRemove={removeCard}
                    onEditStart={showEditForm}
                    onStatusChange={onCardStatusChange}
                />
            ))}
        </div>
    ),
);

export default TodoColumn;
