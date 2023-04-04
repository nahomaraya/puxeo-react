import React, { useState, createContext } from "react";

export const HoverContext = createContext();

export const HoverContextProvider = ({children})=> {
    const [hoveredTable, setHoveredTable] = useState(null);
    // const [data1, setData1] = useState(() => data.slice(0, 5));
    // const [data2, setData2] = useState(() => data.slice(5, 10));
    // const [data3, setData3] = useState(() => data.slice(10, 15));
    // const [data4, setData4] = useState(() => data.slice(15, 20));

    return(
        <HoverContext.Provider value={{ hoveredTable, setHoveredTable}}>

            {children}
        </HoverContext.Provider> 

    )
    }