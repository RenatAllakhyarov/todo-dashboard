import Dashboard from "@components/Dashboard";
import useTodoItems from "@hooks/useTodoItem";
import TodoDashboardContext from "@context/TodoDashboardContext";
import TodoItemConstructor from "@components/TodoItemConstructor";
import { type ReactElement } from "react";
import "./style.css";

const App = (): ReactElement => {
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
            </div>
        </TodoDashboardContext.Provider>
    );
};

export default App;
