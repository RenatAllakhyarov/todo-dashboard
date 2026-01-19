import TodoItem, { type TodoStatus } from "@domains/TodoItem";
import type { ChangeEvent, ReactElement } from "react";
import "./style.css";

interface ITodoCardProps {
    item: TodoItem;
    onEditStart: (id: string) => void;
    onRemove: (id: string) => void;
    onStatusChange: (id: string, newStatus: TodoStatus) => void;
}

const TodoCard = ({
    item,
    onRemove,
    onEditStart,
    onStatusChange,
}: ITodoCardProps): ReactElement => {
    const itemId: string = item.getId();

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(itemId, event.target.value as TodoStatus);
    };

    const handleRemoveCard = () => {
        onRemove(itemId);
    };

    const showEditForm = () => {
        onEditStart(itemId);
    };

    return (
        <div className="todo-item">
            <div className="todo-item-name">Name: {item.getName()}</div>
            <div className="todo-item-description">
                Description: {item.getDescription()}
            </div>
            <select
                className="todo-item-status"
                onChange={handleStatusChange}
                value={item.getStatus()}
            >
                <option value={"TODO"}>TODO</option>
                <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
                <option value={"DONE"}>DONE</option>
            </select>
            <div className="todo-card-buttons">
                <button onClick={handleRemoveCard}>Remove</button>
                <button onClick={showEditForm}>Edit</button>
            </div>
        </div>
    );
};

export default TodoCard;
