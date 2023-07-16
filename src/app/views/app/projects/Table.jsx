import React, { useMemo, useState, useContext } from "react";
import MaterialReactTable from "material-react-table";

import AddIcon from "@mui/icons-material/Add";

import { Box, Button } from "@mui/material";

import { HoverContext } from "app/providers/HoverContext";
import { DataContext } from "app/providers/DataContext";

const Table2 = (props) => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "subject",
        header: "Subject",
      },
      {
        accessorKey: "project",
        header: "Project",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "priority",
        header: "Priority",
      },
      {
        accessorKey: "parent_task",
        header: "Parent Task",
      },

      {
        accessorKey: "department",
        header: "Department",
      },
      {
        accessorKey: "color",
        header: "Color",
      },
      {
        accessorKey: "is_group",
        header: "Is group",
      },
      {
        accessorKey: "exp_start_date",
        header: "Expected Start Date",
      },
      {
        accessorKey: "exp_end_date",
        header: "Expected End Date",
      },
      {
        accessorKey: "expected_time",
        header: "Expected Time",
      },
      {
        accessorKey: "total_costing_amount",
        header: "Total Costing Amount",
      },
      {
        accessorKey: "total_billing_amount",
        header: "Total Billing Amount",
      },
    ],
    []
    //end
  );

  //const [ rowData, setRowData ] = props.data;

  const { data, setData } = useContext(DataContext);
  const { hoveredTable, setHoveredTable } = useContext(HoverContext);
  const [draggingRow, setDraggingRow] = useState(null);

  const commonTableProps = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    muiTableContainerProps: {
      sx: {
        minHeight: "320px",
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
    
  };

  return (
    <MaterialReactTable
    style={{height: "30%"}}
      {...commonTableProps}
      data={data.filter(
        (item) =>
          item.project === props.projectName &&
          item[props.groupBy] === props.value
      )}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;

              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);

              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
      enableRowOrdering
      enableEditing={true}
      // onEditingRowSave={handleSaveRow}
      enableSorting
      filterFromLeafRows
     
      enableColumnActions
      positionActionsColumn="last"
      positionExpandColumn="last"
      initialState={{
        columnVisibility: {
          type: false,
          parent_task: false,
          department: false,
          color: false,
          is_group: false,
          exp_start_date: false,
          exp_end_date: false,
          expected_time: false,
          total_costing_amount: false,
          total_billing_amount: false,
        },
        
      }}
      paginateExpandedRows={false}
      pageCount={5}
      defaultColumn={{
        size: 30,
      }}
      
      getRowId={(originalRow) =>
        `table-${props.value}-${originalRow.firstName}`
      }
      muiTableBodyRowDragHandleProps={({ table }) => ({
        onDragEnd: () => {
          const { draggingRow, hoveredRow } = table.getState();
          console.log(draggingRow.original.priority);
          if (hoveredTable !== `table-${props.value}`) {
            props.handleUpdate(
              draggingRow.original,
              hoveredTable.slice(6),
              props.groupBy
            );
          
          } else if (hoveredRow && draggingRow) {
            data.splice(
              hoveredRow.index,
              0,
              data.splice(draggingRow.index, 1)[0]
            );
            setData([...data]);
          }
          setHoveredTable(null);
        
        },
      })}
      muiTablePaperProps={{
        onDragEnter: () => setHoveredTable(`table-${props.value}`),
        sx: {
          outline:
            hoveredTable === `table-${props.value}`
              ? "2px dashed pink"
              : undefined,
        },
      }}
      cellStyle={{ fontSize: "0.7rem", padding: "1px" }}
      headerStyle={{ fontSize: "0.7rem", padding: "1px" }}
      
      // renderTopToolbarCustomActions={() => (
      //   <div
      //     style={{
      //       display: "flex",
      //       justifyContent: "flex-start",
      //       alignItems: "center",
      //       gap: "1.25rem",
      //     }}
      //   >
      //     <span
      //       style={{
      //         backgroundColor: `${props.color}`,
      //         borderRadius: "0.375rem",
      //         padding: "0.5rem",
      //         paddingLeft: "2rem",
      //         paddingRight: "2rem",
      //         fontSize: "1rem",
      //         lineHeight: "2.25rem",
      //       }}
      //     >
      //       {" "}
      //       {props.value}{" "}
      //     </span>
      //     <span style={{ fontSize: "1rem" }} className="texl-xl">{` ${
      //       data.filter((item) => item[props.groupBy] === props.value).length
      //     } tasks`}</span>
      //   </div>
      // )}
      renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: "grid",

            margin: "auto",

            gridTemplateColumns: "1fr 1fr",

            width: "100%",
            
          }}
        >
          {/* <textarea>sfkdjksdfjk</textarea> */}
        </Box>
      )}
    />
  );
};

export default Table2;
