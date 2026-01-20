import TodoItem, { type TodoStatus } from "@domains/TodoItem";
import { useDashboardContext } from "@context/TodoDashboardContext";
import type { ChangeEvent, ReactElement } from "react";
import "./style.css";

interface ITodoCardProps {
    item: TodoItem;
}

const TodoCard = ({ item }: ITodoCardProps): ReactElement => {
    const itemId: string = item.getId();

    const { handleCardEdit, removeCard } = useDashboardContext();

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleCardEdit(itemId, { status: event.target.value as TodoStatus });
    };

    const handleRemoveCard = () => {
        removeCard(itemId);
    };

    const showEditForm = () => {
        handleCardEdit(itemId);
    };

    return (
        <div className="todo-item">
            <div className="todo-item-name">
                <strong>Name:</strong> {item.getName()}
            </div>
            <div className="todo-item-description">
                <strong>Description:</strong> {item.getDescription()}
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
