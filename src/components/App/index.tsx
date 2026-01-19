import useTodoItems from "@hooks/useTodoItem";
import TodoColumn from "@components/TodoColumn";
// import CardEditForm from "@components/CardEditForm";
import TodoItem, { TodoStatus } from "@domains/TodoItem";
import TodoItemConstructor from "@components/TodoItemConstructor";
import { useState, type ReactElement } from "react";
import "./style.css";

const App = (): ReactElement => {
    const {
        cards,
        addCard,
        setCards,
        removeCard,
        getCardById,
        taskFilterToColumns,
    } = useTodoItems();

    const [isCardEditFormVisible, setIsCardEditFormVisible] =
        useState<boolean>(false);

    const handleCardStatusUpdate = (id: string, newStatus: TodoStatus) => {
        handleCardEdit(id, { status: newStatus });
    };

    const handleCardEdit = (
        cardId: string,
        data?: { name?: string; description?: string; status?: TodoStatus },
    ) => {
        const cardWithCurrentId = cards.find(
            (card: TodoItem) => card.getId() === cardId,
        );

        if (!cardWithCurrentId) {
            return;
        }

        data?.name && cardWithCurrentId.setName(data.name);

        data?.description && cardWithCurrentId.setDescription(data.description);

        data?.status && cardWithCurrentId.setStatus(data.status);

        setCards([...cards]);
    };

    const showEditForm = (id: string) => {
        const card = getCardById(id);

        alert(JSON.stringify(card));

        setIsCardEditFormVisible(true);
    };

    return (
        <div className="to-do">
            <header>
                <h1>TO-DO List</h1>
            </header>
            <div className="task-constructor">
                <TodoItemConstructor onSubmit={addCard} />
            </div>
            <div className="dashboard">
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.toDoItems}
                        showEditForm={showEditForm}
                        onCardStatusChange={handleCardStatusUpdate}
                        title="TO-DO"
                        removeCard={removeCard}
                    />
                </div>
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.inProgressItems}
                        showEditForm={showEditForm}
                        onCardStatusChange={handleCardStatusUpdate}
                        title="In progress"
                        removeCard={removeCard}
                    />
                </div>
                <div className="items-column">
                    <TodoColumn
                        items={taskFilterToColumns.doneItems}
                        showEditForm={showEditForm}
                        onCardStatusChange={handleCardStatusUpdate}
                        title="Done"
                        removeCard={removeCard}
                    />
                </div>
            </div>
            {isCardEditFormVisible && (
                <div className="card-edit-form">
                    {/* <CardEditForm getCardById={getCardById}/> */}
                </div>
            )}
        </div>
    );
};

export default App;
