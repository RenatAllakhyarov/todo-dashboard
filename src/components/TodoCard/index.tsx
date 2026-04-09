import TodoItem, {  type TodoStatus } from "@domains/TodoItem";
import type { ChangeEvent, ReactElement } from "react";
import "./style.css";

interface ITodoCardProps {
    item: TodoItem;
    onStatusChange: (id: string, status: TodoStatus) => void;
}

const TodoCard = ({ item, onStatusChange }: ITodoCardProps): ReactElement => {
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onStatusChange(item.getId(), event.target.value as TodoStatus);
    };

    return (
        <div className="todo-item">
            <div className="todo-item-name">Name: {item.getName()}</div>
            <div className="todo-item-description">
                Description: {item.getDescription()}
            </div>
            <select
                className="todo-item-status"
                value={item.getStatus()}
                onChange={handleStatusChange}
            >
                <option value={"TODO"}>TODO</option>
                <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
                <option value={"DONE"}>DONE</option>
            </select>
        </div>
    );
};

export default TodoCard;
