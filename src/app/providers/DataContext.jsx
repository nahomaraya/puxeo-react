import React, { useState, createContext } from "react";
import { data as initData  } from "./data";
export const DataContext = createContext();

export const DataContextProvider = ({children})=> {
    const [data, setData] = useState(initData);
    // const [data1, setData1] = useState(() => data.slice(0, 5));
    // const [data2, setData2] = useState(() => data.slice(5, 10));
    // const [data3, setData3] = useState(() => data.slice(10, 15));
    // const [data4, setData4] = useState(() => data.slice(15, 20));

    return(
        <DataContext.Provider value={{ data, setData}}>

            {children}
        </DataContext.Provider> 

    )
    }