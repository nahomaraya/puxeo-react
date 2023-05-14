import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";

import AddIcon from "@mui/icons-material/Add";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  makeStyles,
  InputLabel,
  Divider,
} from "@material-ui/core";
import { data } from "./data";
import { DataContext } from "app/providers/DataContext";
import Table2 from "./Table";
import axios from "axios";

const useStyles = makeStyles({
  dialog: {
    borderRadius: "10px",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  },
  header: {
    backgroundColor: "#663399",
    color: "#f4f4f4",
  },
  button: {
    backgroundColor: "#2196F3",
    color: "white",
    "&:hover": {
      backgroundColor: "#0d8bf2",
    },
  },
});

const Projects = () => {
  const classes = useStyles();
  const handleSave = () => {
    // Handle save logic here
    handleClose();
  };
  const { name, space } = useParams();

  const axiosWithAuth = axios.create({
    auth: {
      username: "25780e2360f025d",
      password: "afec298ebaa3d92",
    },
  });

  const priority = ["Urgent", "High", "Medium", "Low"];
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth.get(`/api/resource/Puxeo Statuses?fields=["name1","color"]&filters=[["space", "=", "${space}"]]`);
        const data = await response.data;
        const statusNames = data.data
        setStatus(statusNames);
        console.log(statusNames);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  

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

  const { data, setData } = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [group, setGroup] = useState("priority");

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
    const updatedData = data.map((item) => {
      if (item.name === task.name) {
        // update the property you want to modify
        return {
          ...item,
          [groupBy]: value,
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
        background: "whitesmoke",
        gap: "1rem",
        overflow: "auto",
        p: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
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
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Group By
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleUnclick}
          >
            <MenuItem
              onClick={() => {
                handleUnclick();
                setGroup("priority");
              }}
            >
              Priority
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUnclick();
                setGroup("status");
              }}
            >
              Status
            </MenuItem>
          </Menu>
        </div>
      </div>

      {group == "priority" &&
        priority.map((priorityItem, key) => (
          <Table2
            groupBy={group}
            value={priorityItem}
            handleUpdate={handleUpdate}
          />
        ))}
      {group == "status" && status.length > 0 ? (
        status.map((priorityItem, key) => (
          <Table2
            groupBy={group}
            value={priorityItem.name1}
            color={priorityItem.color}
            handleUpdate={handleUpdate}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle className={classes.header}>New Task</DialogTitle>

        <DialogContent>
          <form>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={6}>
                {columns
                  .slice(0, Math.ceil(columns.length / 2))
                  .map((columnItem, index) => (
                    <>
                      <InputLabel htmlFor={columnItem.accessorKey}>
                        {columnItem.header}
                      </InputLabel>
                      <Divider />
                      <TextField
                        key={index}
                        id={columnItem.accessorKey}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </>
                  ))}
              </Grid>
              <Grid item xs={6}>
                {columns
                  .slice(Math.ceil(columns.length / 2))
                  .map((columnItem, index) => (
                    <>
                      <InputLabel htmlFor={columnItem.accessorKey}>
                        {columnItem.header}
                      </InputLabel>
                      <Divider />
                      <TextField
                        key={index}
                        id={columnItem.accessorKey}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </>
                  ))}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
