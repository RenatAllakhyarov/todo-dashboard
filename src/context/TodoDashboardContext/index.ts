import { ITodoHookReturn } from "@hooks/useTodoItem";
import { createContext, useContext } from "react";

const TodoDashboardContext = createContext({} as ITodoHookReturn);

export const useDashboardContext = () => useContext(TodoDashboardContext);

export default TodoDashboardContext;
