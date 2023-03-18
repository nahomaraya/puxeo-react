import todoRoutes from "./todo/todoRoutes";
import { lazy } from "react";

const TaskManager = lazy(() => import("./TaskManager"));

const TaskManagerList = lazy(() => import("./TaskManagerList"));

const TaskProject = lazy(()=> import("./TaskProject"));

const taskManagerRoutes = [
  {
    path: "/task-manager",
    component: TaskManager
  },
  {
    path: "/task-manager-list",
    component: TaskManagerList
  },
  {
    path: "/task-project",
    component: TaskProject
  },

  ...todoRoutes
];

export default taskManagerRoutes;
