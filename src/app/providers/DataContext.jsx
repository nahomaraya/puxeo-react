import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { data as initData } from "./data";
export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const projectName = window.location.pathname.split("/")[2];
    console.log(projectName === "all");
    const axiosWithAuth = axios.create({
      auth: {
        username: "25780e2360f025d",
        password: "afec298ebaa3d92",
      },
    });

    if (projectName === "all") {
      axiosWithAuth
        .get(
          `/api/resource/Task?fields=["name","subject","status","priority","color","is_group","type","exp_start_date","exp_end_date","expected_time","parent_task","department","total_costing_amount","total_billing_amount"]`
        )
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setData([]);
        });
    } else {
      axiosWithAuth

        .get(
          `/api/resource/Task?fields=["name","subject","status","priority","color","is_group","type","exp_start_date","exp_end_date","expected_time","parent_task","department","total_costing_amount","total_billing_amount"]&filters=[["project", "=", "${projectName}"]]`
        )
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          setData([]);
        });
    }
  }, [window.location.search]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
