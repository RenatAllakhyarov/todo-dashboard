import TodoColumn from "@components/TodoColumn";
import TodoItem, { TodoStatus } from "@domains/TodoItem";
import TodoItemConstructor from "@components/TodoItemConstructor";
import { ItemStatus, localStorageKey } from "@utils/constants";
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

    const handleCardStatusChange = (cardId: string, newStatus: TodoStatus) => {
        const cardWithCurrentId = cards.find((card:TodoItem) => card.getId() === cardId);

        if (!cardWithCurrentId) {
            return;
        }
        
        console.log("Selected Card with old status: ", cardWithCurrentId.getStatus());
        
        cardWithCurrentId.setStatus(newStatus);

        console.log("Selected Card with old status: ", cardWithCurrentId.getStatus());

        setCards([...cards]);
    };

    const saveToLocalStorage = (cards: TodoItem[]) => {
        const cardsToString = cards.map((card) => card.toString());

        console.log("CARDS FOR LS: ", cardsToString);

        localStorage.setItem(localStorageKey, JSON.stringify(cardsToString));
    };

    const taskFilterToColumns: IToDoColumns = useMemo(() => {
        const toDoItems: TodoItem[] = [];
        const inProgressItems: TodoItem[] = [];
        const doneItems: TodoItem[] = [];

        cards.forEach((item: TodoItem) => {
            const itemStatus: string = item.getStatus();

            if (itemStatus === ItemStatus.TODO) {
                toDoItems.push(item);

                return;
            }

            if (itemStatus === ItemStatus.IN_PROGRESS) {
                inProgressItems.push(item);

                return;
            }

            if (itemStatus === ItemStatus.DONE) {
                doneItems.push(item);

                return;
            }
        });

        return {
            toDoItems,
            inProgressItems,
            doneItems,
        };
    }, [cards]);

    useEffect(() => {
        const storageItems: string | null = localStorage.getItem(localStorageKey);

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
        saveToLocalStorage(cards);
    }, [cards]);

    return (
        <div className="to-do">
            <header>
                <h1>TO-DO List</h1>
            </header>
            <div className="task-constructor">
                <TodoItemConstructor onCreate={addCard} />
            </div>
            <div className="dashboard">
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.toDoItems}
                        onCardStatusChange={handleCardStatusChange}
                        title="TO-DO"
                    />
                </div>
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.inProgressItems}
                        onCardStatusChange={handleCardStatusChange}
                        title="In progress"
                    />
                </div>
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.doneItems}
                        onCardStatusChange={handleCardStatusChange}
                        title="Done"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
