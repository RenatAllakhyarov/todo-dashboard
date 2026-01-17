import useTodoItems from "@hooks/useTodoItem";
import TodoColumn from "@components/TodoColumn";
import TodoItem, { TodoStatus } from "@domains/TodoItem";
import TodoItemConstructor from "@components/TodoItemConstructor";
import { useMemo, type ReactElement } from "react";
import { ItemStatus } from "@utils/constants";
import "./style.css";

interface IToDoColumns {
    toDoItems: TodoItem[];
    inProgressItems: TodoItem[];
    doneItems: TodoItem[];
}

const App = (): ReactElement => {
    const { cards, setCards, addCard, toDoItems, inProgressItems, doneItems } =
        useTodoItems();

    const handleCardStatusChange = (cardId: string, newStatus: TodoStatus) => {
        const cardWithCurrentId = cards.find(
            (card: TodoItem) => card.getId() === cardId,
        );

        if (!cardWithCurrentId) {
            return;
        }

        console.log(
            "Selected Card with old status: ",
            cardWithCurrentId.getStatus(),
        );

        cardWithCurrentId.setStatus(newStatus);

        console.log(
            "Selected Card with old status: ",
            cardWithCurrentId.getStatus(),
        );

        setCards([...cards]);
    };


    // -----------------------------------------

    const taskFilterToColumns: IToDoColumns = useMemo(() => {
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
