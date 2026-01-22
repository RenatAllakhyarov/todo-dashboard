import TodoItem, { type TodoStatus } from "@domains/TodoItem";
import { useDashboardContext } from "@context/TodoDashboardContext";
import {
    useEffect,
    useState,
    type ChangeEvent,
    type ReactElement,
} from "react";
import "./style.css";

interface ITodoCardProps {
    item: TodoItem;
}

const TodoCard = ({ item }: ITodoCardProps): ReactElement => {
    const { handleCardEdit, removeCard } = useDashboardContext();

    const itemId: string = item.getId();

    const [editingName, setEditingName] = useState(item.getName());
    const [editingDescription, setEditingDescription] = useState(
        item.getDescription(),
    );
    const [editingStatus, setEditingStatus] = useState<TodoStatus>(
        item.getStatus(),
    );

    const [isCardEditFormVisible, setIsCardEditFormVisible] =
        useState<boolean>(false);

    const handleEditingStatusChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setEditingStatus(event.target.value as TodoStatus);
    };

    const handleCancelEditingCard = () => {
        setIsCardEditFormVisible(false);
    };

    const handleConfirmCard = () => {
        let isCardChanged: boolean = false;

        if (editingName !== item.getName()) {
            item.setName(editingName);

            isCardChanged = true;
        }

        if (editingDescription !== item.getDescription()) {
            item.setDescription(editingDescription);

            isCardChanged = true;
        }

        if (editingStatus !== item.getStatus()) {
            item.setStatus(editingStatus);

            isCardChanged = true;
        }

        if (isCardChanged) {
            handleCardEdit(itemId);
        }

        setIsCardEditFormVisible(false);
    };

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        handleCardEdit(itemId, { status: event.target.value as TodoStatus });
    };

    const handleRemoveCard = () => {
        removeCard(itemId);
    };

    const showEditForm = () => {
        setIsCardEditFormVisible(true);
    };

    useEffect(() => {
        if (!isCardEditFormVisible) {
            return;
        }

        setEditingName(item.getName());
        setEditingDescription(item.getDescription());
        setEditingStatus(item.getStatus());
    }, [isCardEditFormVisible, item]);

    if (isCardEditFormVisible) {
        return (
            <div className="todo-item">
                <div className="todo-item-name">
                    <strong>Name:</strong>
                    <input
                        value={editingName}
                        onChange={(event) => setEditingName(event.target.value)}
                    />
                </div>
                <div className="todo-item-description">
                    <strong>Description:</strong>
                    <input
                        value={editingDescription}
                        onChange={(event) =>
                            setEditingDescription(event.target.value)
                        }
                    />
                </div>
                <select
                    className="todo-item-status"
                    onChange={handleEditingStatusChange}
                    value={editingStatus}
                >
                    <option value={"TODO"}>TODO</option>
                    <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
                    <option value={"DONE"}>DONE</option>
                </select>
                <div className="todo-card-buttons">
                    <button onClick={handleCancelEditingCard}>Cancel</button>
                    <button onClick={handleConfirmCard}>Confirm</button>
                </div>
            </div>
        );
    }

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
