import { lazy } from "react";

const Project = lazy(()=> import("./Projects"))

const projectRoutes = [
    {
      path: "/projects/:name",
      component: Project
    },
  
  ];

export default projectRoutes