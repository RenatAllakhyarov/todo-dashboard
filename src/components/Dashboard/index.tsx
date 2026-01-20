import TodoColumn from "@components/TodoColumn";
import { useDashboardContext } from "@context/TodoDashboardContext";
import { ReactElement } from "react";
import "./style.css";

const Dashboard = (): ReactElement => {
    const {taskFilterToColumns} = useDashboardContext();

    return (
        <div className="dashboard">
            <div className="items-column">
                <TodoColumn
                    items={taskFilterToColumns.toDoItems}
                    title="TO-DO"
                />
            </div>
            <div className="items-column">
                <TodoColumn
                    items={taskFilterToColumns.inProgressItems}
                    title="In progress"
                />
            </div>
            <div className="items-column">
                <TodoColumn
                    items={taskFilterToColumns.doneItems}
                    title="Done"
                />
            </div>
        </div>
    );
};

export default Dashboard;