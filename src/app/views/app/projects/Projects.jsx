import React, { useEffect, useMemo, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MaterialReactTable from "material-react-table";

import AddIcon from "@mui/icons-material/Add";
import { Breadcrumb } from "@gull";
import {
  Card,
  Accordion,
  AccordionButton,
  AccordionCollapse,
} from "react-bootstrap";

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
import projectRoutes from "./projectRoutes";
import { projectsData } from "app/data";

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
  const { data, setData } = useContext(DataContext);
  const priority = ["Urgent", "High", "Medium", "Low"];
  const [status, setStatus] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosWithAuth.get(
          `/api/resource/Puxeo Statuses?fields=["name1","color"]&filters=[["space", "=", "${space}"]]`
        );
        const data = await response.data;
        const statusNames = data.data;
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

  // const { data, setData } = React.useContext(DataContext);
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
  const [activeKeys, setActiveKeys] = useState([0]);

  const handleAccordionClick = (eventKey) => {
    if (activeKeys.includes(eventKey)) {
      setActiveKeys(activeKeys.filter((key) => key !== eventKey));
    } else {
      setActiveKeys([...activeKeys, eventKey]);
    }
  };

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
    // setData([...data, newData]);
  };

  const handleSubmit = () => {
    handleClose();
  };

  const handleUpdate = (task, value, groupBy) => {
    const updatedData = data.map((item) => {
      if (item.name === task.name) {
        // update the property you want to modify
        console.log(task.name)
        console.log(value)

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
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Breadcrumb
          routeSegments={[
            { name: "List", path: "/projects" },
            { name: "Kanban", path: "/kanban" },
            { name: space, path: "/" },
          ]}
        />
        <div style={{ marginLeft: "auto" }}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="success"
            onClick={handleClick}
            style={{ marginRight: "10px" }}
          >
            Group By
          </Button>
          <Button variant="contained" color="primary">
            Create a new project
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
      <Accordion activeKey={activeKeys}>
        {projectsData.map((project, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gridTemplateColumns: { xs: "auto", lg: "1fr 1fr" },
              background: "whitesmoke",
              gap: "1rem",
              overflow: "auto",
              p: "10px", // decrease padding
              mt: "5px",
              mb:"30px", // decrease margin-top
              fontSize: "0.6rem", // decrease font size
             // decrease height
            }}
          >
            <Accordion.Item
              eventKey={project}
              className="ul-card__border-radius border-0 p-0 card"
            >
              <Accordion.Header
                className="mt-6"
                onClick={() => handleAccordionClick(project)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    
                    gap: "1.5rem"
                  }}
                >
                  
                    <h3 style={{fontSize: "1rem", marginTop: "2px"}} >
                      {project.project_name}
                    </h3>
                    <Button
                    size="small"
                   
                      onClick={handleAddRow}
                      variant="contained"
                      endIcon={<AddIcon />}
                    >
                      New Task
                    </Button>
                  
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Accordion activeKey={activeKeys}>
                  {group == "priority" &&
                    priority.map((priorityItem, key) => (
                      <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        
                        background: "whitesmoke",
                        gap: "1rem",
                        overflow: "auto",
                        p: "0.5px", // decrease padding
                        mt: "5px", // decrease margin-top
                        fontSize: "0.6rem", // decrease font size
                        // decrease height
                      }}
                    >
                      <Accordion.Item
                        eventKey={priorityItem}
                        className="ul-card__border-radius border-0 p-0 card"
                      >
                        <Accordion.Header
                          onClick={() => handleAccordionClick(priorityItem)}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "1.25rem",
                            }}
                          >
                            <span
                              style={{
                              //  backgroundColor: `${props.color}`,
                                borderRadius: "0.375px",
                                padding: "0.5px",
                                paddingLeft: "2px",
                                paddingRight: "2px",
                                fontSize: "0.8rem",
                                lineHeight: "2.25rem",
                              }}
                            >
                              {" "}
                              {priorityItem}{" "}
                            </span>
                            <span
                              style={{ fontSize: "0.8rem" }}
                              className="texl-xl"
                            >{` ${
                              data.filter(
                                (item) => item[group] === priorityItem
                              ).length
                            } tasks`}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table2
                            projectName={project.project_name}
                            groupBy={group}
                            value={priorityItem}
                            handleUpdate={handleUpdate}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      </Box>
                    ))}
                  {group == "status" && status.length > 0 ? (
                    status.map((priorityItem, key) => (
                      <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gridTemplateColumns: { xs: "auto", lg: "1fr 1fr" },
                        background: "whitesmoke",
                        gap: "1rem",
                        overflow: "auto",
                        p: "0.5px", // decrease padding
                        mt: "5px", // decrease margin-top
                        fontSize: "0.6rem", // decrease font size
                        height: "40%", // decrease height
                      }}
                    >
                      <Accordion.Item
                        eventKey={priorityItem}
                        className="ul-card__border-radius border-0 p-0 card"
                      >
                        <Accordion.Header  onClick={() => handleAccordionClick(priorityItem)}>
                        <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "1.25rem",
                            }}
                          >
                            <span
                              style={{
                              //  backgroundColor: `${props.color}`,
                                borderRadius: "0.375rem",
                                padding: "0.5rem",
                                paddingLeft: "2rem",
                                paddingRight: "2rem",
                                fontSize: "1rem",
                                lineHeight: "2.25rem",
                              }}
                            >
                              {" "}
                              {priorityItem}{" "}
                            </span>
                            <span
                              style={{ fontSize: "1rem" }}
                              className="texl-xl"
                            >{` ${
                              data.filter(
                                (item) => item[group] === priorityItem
                              ).length
                            } tasks`}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table2
                            projectName={project.project_name}
                            groupBy={group}
                            value={priorityItem.name1}
                            color={priorityItem.color}
                            handleUpdate={handleUpdate}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                      </Box>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </Accordion>

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
              </Accordion.Body>
            </Accordion.Item>
          </Box>
        ))}
      </Accordion>
    </div>
  );
};

export default Projects;
