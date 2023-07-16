import { lazy } from "react";

const Project = lazy(()=> import("./Projects"))
const Kanban = lazy(()=>import("./Kanban"))

const projectRoutes = [
    {
      path: "/projects/:space",
      component: Project
    },
    {
      path: "/kanban/:space",
      component: Kanban
    },
  
  ];

export default projectRoutes