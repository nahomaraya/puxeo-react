import { lazy } from "react";

const Project = lazy(()=> import("./Projects"))

const projectRoutes = [
    {
      path: "/projects/:space",
      component: Project
    },
  
  ];

export default projectRoutes