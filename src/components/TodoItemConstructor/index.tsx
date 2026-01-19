import TodoItem from "@domains/TodoItem";
import type { FormEvent, ReactElement } from "react";
import { genRandomHex } from "@utils/functions";
import "./style.css";

interface ITodoItemConstructorProps {
    onSubmit: (card: TodoItem) => void;
}

const TodoItemConstructor = ({
    onSubmit,
}: ITodoItemConstructorProps): ReactElement => {
    const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);

        const cardName = formData.get("Name");
        const cardDescription = formData.get("Description");

        if (!cardName || !cardDescription) {
            throw new Error("Insufficient data for card creation");
        }

        onSubmit(
            TodoItem.fromData(
                genRandomHex(),
                cardName as string,
                cardDescription as string,
                "TODO",
            ),
        );

        form.reset();
    };

    return (
        <div className="todo-item-constructor">
            <h2>Task Constructor</h2>
            <form onSubmit={onFormSubmit}>
                <div className="constructor-card-name">
                    <label htmlFor="card-name">Name</label>
                    <input id="card-name" name="Name" required minLength={5} />
                </div>
                <div className="constructor-card-description">
                    <label htmlFor="card-description">Description</label>
                    <input
                        id="card-description"
                        name="Description"
                        required
                        minLength={10}
                    />
                </div>
                <div className="constructor-submit-button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default TodoItemConstructor;
