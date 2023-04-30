import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";

import AddIcon from "@mui/icons-material/Add";

import { Box, Button,  Menu, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from "@material-ui/core";
import { data } from "./data";
import { DataContext } from "app/providers/DataContext";
import Table2 from "./Table";


const Projects = () => {
  const { name } = useParams();

 const priority = ["Urgent", "High", "Medium", "Low"];
 const status = ["Open", "Completed", "Overdue"]

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

  const { data, setData} = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ group, setGroup] = useState('priority')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUnclick = () => {
    setAnchorEl(null);
  };


  // useEffect(() => {
  //   // your code to fetch data from the server
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   // your code to fetch data from the server
  //   const fetchedData = await response.json();

  //   // your custom condition to filter data
  //   const filteredData = fetchedData.filter((item) => {
  //     return item.category === 'fruit';
  //   });

  //   setData(filteredData);
  // }


  
  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  const [open, setOpen] = useState(false);

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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddRow = (newData) => {
    handleOpen();
    setData([...data, newData]);
  };

  const handleSubmit = () => {
    handleClose();
  };

  const handleUpdate = (task, value, groupBy) => {
    const updatedData = data.map(item => {
      if (item.name === task.name) {
        // update the property you want to modify
        return {
          ...item,
          [groupBy]: value
        };
      }
      return item; // return the unchanged item for all other cases
    });
    setData(updatedData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gridTemplateColumns: { xs: "auto", lg: "1fr 1fr" },
        background: "#eabfff",
        gap: "1rem",
        overflow: "auto",
        p: "20px",
      }}
    >
      <div style={{  display: "flex", justifyContent: "space-between"  }} >
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "1.5rem"}} >
        <h3 className="text-black text-4xl">{name}</h3>
        <Button
          onClick={handleAddRow}
          variant="contained"
          endIcon={<AddIcon />}
        >
          New Task
        </Button>
      
      </div>
      <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="success" onClick={handleClick}>
        Group By
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleUnclick}
      >
        <MenuItem onClick={() => {handleUnclick(); setGroup('priority')}}>Priority</MenuItem>
        <MenuItem onClick={() => {handleUnclick(); setGroup('status')}}>Status</MenuItem>
       
      </Menu>
    </div>
    </div>


{
  group=="priority" &&
  priority.map((priorityItem, key) =>
  (
    <Table2 groupBy={group} value={priorityItem} handleUpdate={handleUpdate}/>
  ))

  }{
    group=="status" &&
  status.map((priorityItem, key) =>
  (
    <Table2 groupBy={group} value={priorityItem} handleUpdate={handleUpdate}/>
  ))
}

    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <form>
            <Grid container direction="column" spacing={3}>
              {columns.map((columnItem, index) => (
                <Grid item>
                  <TextField
                    id={columnItem.accessorKey}
                    label={columnItem.header}
                    variant="outlined"
                  />
                </Grid>
              ))}
             
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
