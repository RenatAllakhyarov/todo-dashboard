import TodoDashboardContext, {
    useDashboardContext,
} from "@context/TodoDashboardContext";
import Dashboard from "@components/Dashboard";
import useTodoItems from "@hooks/useTodoItem";
import TodoItemConstructor from "@components/TodoItemConstructor";
import { useState, type ReactElement } from "react";
import "./style.css";
// import CardEditForm from "@components/CardEditForm";

const App = (): ReactElement => {
    const { getCardById } = useDashboardContext();

    const [isCardEditFormVisible, setIsCardEditFormVisible] =
        useState<boolean>(false);

    const showEditForm = (id: string) => {
        const card = getCardById(id);

        alert(JSON.stringify(card));

        setIsCardEditFormVisible(true);
    };

    return (
        <TodoDashboardContext.Provider value={useTodoItems()}>
            <div className="to-do">
                <header>
                    <h1>TO-DO List</h1>
                </header>
                <div className="task-constructor">
                    <TodoItemConstructor />
                </div>
                <Dashboard />
                {isCardEditFormVisible && (
                    <div className="card-edit-form">
                        {/* <CardEditForm getCardById={getCardById}/> */}
                    </div>
                )}
            </div>
        </TodoDashboardContext.Provider>
    );
};

export default App;
