import TodoColumn from "@components/TodoColumn";
import TodoItemConstructor from "@components/TodoItemConstructor";
import TodoItem, { TodoStatus } from "@domains/TodoItemClass";
import { useEffect, useMemo, useState, type ReactElement } from "react";
import "./style.css";

interface IToDoColumns {
    toDoItems: TodoItem[];
    inProgressItems: TodoItem[];
    doneItems: TodoItem[];
}

const App = (): ReactElement => {
    const [cards, setCards] = useState<TodoItem[]>([]);

    const addCard = (card: TodoItem) => {
        setCards([...cards, card]);
    };

    const onCardStatusChange = (cardId: string, newStatus: TodoStatus) => {
        const newStatusCards = cards.map((card: TodoItem) => {
            console.log("OLD STATUS", card);

            if (card.getId() === cardId) {
                card.setStatus(newStatus);
            }

            return card;

        });

        console.log("NEW STATUS: ", newStatusCards);

        setCards(newStatusCards);
    };

    const handleLocalStorageSaving = (cards: TodoItem[]) => {
        const cardsToString = cards.map((card) => card.toString());

        console.log("CARDS FOR LS: ", cardsToString);

        localStorage.setItem("todo-card", JSON.stringify(cardsToString));

    };

    const taskFilterToColumns: IToDoColumns = useMemo(() => {
        const toDoItems: TodoItem[] = [];
        const inProgressItems: TodoItem[] = [];
        const doneItems: TodoItem[] = [];

        cards.forEach((item: TodoItem) => {
            if (item.getStatus() === "TODO") {
                toDoItems.push(item);
            }

            if (item.getStatus() === "IN_PROGRESS") {
                inProgressItems.push(item);
            }

            if (item.getStatus() === "DONE") {
                doneItems.push(item);
            }
        });

        return {
            toDoItems,
            inProgressItems,
            doneItems,
        };
    }, [cards]);

    useEffect(() => {
        const storageItems: string | null = localStorage.getItem("todo-card");

        console.log("ITEMS FROM STORAGE:", storageItems);

        if (!storageItems) {
            return;
        }

        const stringStorageItems: string[] = JSON.parse(storageItems);

        console.log("PARSED ITEMS:", stringStorageItems);

        const parsedItems = stringStorageItems.map((item) =>
            TodoItem.fromRaw(item)
        );

        console.log(parsedItems);

        setCards(parsedItems);

    }, []);

    useEffect(() => {
        handleLocalStorageSaving(cards);
    }, [cards]);

    return (
        <div className="to-do">
            <header>
                <h1>TO-DO List</h1>
            </header>
            <div className="task-constructor">
                <h2>Task Constructor</h2>
                <TodoItemConstructor onCreate={addCard} />
            </div>
            <div className="todo-list">
                <div className="items-column">
                    <h2>TO-DO Tasks</h2>
                    <TodoColumn
                        items={taskFilterToColumns.toDoItems}
                        onCardStatusChange={onCardStatusChange}
                    />
                </div>
                <div className="items-column">
                    <h2>In progress Tasks</h2>
                    <TodoColumn
                        items={taskFilterToColumns.inProgressItems}
                        onCardStatusChange={onCardStatusChange}
                    />
                </div>
                <div className="items-column">
                    <h2>Done Tasks</h2>
                    <TodoColumn
                        items={taskFilterToColumns.doneItems}
                        onCardStatusChange={onCardStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
