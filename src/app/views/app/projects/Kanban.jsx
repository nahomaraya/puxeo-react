import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { data } from "./data";
import { DataContext } from "app/providers/DataContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanCard from "./KanbanCard";
import { Breadcrumb } from "@gull";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  // const { data, setData } = useContext(DataContext);
  const { name, space } = useParams();

  const [columns, setColumns] = useState(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const priority = ["Urgent", "High", "Medium", "Low"];
  const status = ["Open", "Completed", "Overdue"];

  const [group, setGroup] = useState("status");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUnclick = () => {
    setAnchorEl(null);
  };
  const onDragEnd = (result, tasks, setTasks) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    // Get the source and destination columns
    switch (group) {
      case "status":
        const sourceTasksStatus = tasks.filter(
          (task) => task.status === source.droppableId
        );
        const destTasksStatus = tasks.filter(
          (task) => task.status === destination.droppableId
        );
  
        if (source.droppableId !== destination.droppableId) {
          // Move task to new column
          const sourceItems = [...sourceTasksStatus];
          const destItems = [...destTasksStatus];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
  
          // Update state with new columns
          setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.forEach((task, index) => {
              if (task.status === source.droppableId) {
                newTasks[index].order = sourceItems.findIndex(
                  (item) => item.name === task.name
                );
              }
              if (task.status === destination.droppableId) {
                newTasks[index].order = destItems.findIndex(
                  (item) => item.name === task.name
                );
              }
              if (task.name === removed.name) {
                newTasks[index].status = destination.droppableId;
                newTasks[index].order = destination.index;
              }
            });
            return newTasks;
          });
        } else {
          // Move task within same column
          const items = [...sourceTasksStatus];
          const [removed] = items.splice(source.index, 1);
          items.splice(destination.index, 0, removed);
  
          // Update state with new column
          setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.forEach((task, index) => {
              if (task.status === source.droppableId) {
                newTasks[index].order = items.findIndex(
                  (item) => item.name === task.name
                );
              }
            });
            return newTasks;
          });
        }
        break; // Add a break statement here
  
      case "priority":
        const sourceTasksPriority = tasks.filter(
          (task) => task.priority === source.droppableId
        );
        const destTasksPriority = tasks.filter(
          (task) => task.priority === destination.droppableId
        );
  
        if (source.droppableId !== destination.droppableId) {
          // Move task to new column
          const sourceItems = [...sourceTasksPriority];
          const destItems = [...destTasksPriority];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
  
          // Update state with new columns
          setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.forEach((task, index) => {
              if (task.priority === source.droppableId) {
                newTasks[index].order = sourceItems.findIndex(
                  (item) => item.name === task.name
                );
              }
              if (task.priority === destination.droppableId) {
                newTasks[index].order = destItems.findIndex(
                  (item) => item.name === task.name
                );
              }
              if (task.name === removed.name) {
                newTasks[index].priority = destination.droppableId;
                newTasks[index].order = destination.index;
              }
            });
            return newTasks;
          });
        } else {
          // Move task within same column
          const items = [...sourceTasksPriority];
          const [removed] = items.splice(source.index, 1);
          items.splice(destination.index, 0, removed);
  
          // Update state with new column
          setTasks((prevTasks) => {
            const newTasks = [...prevTasks];
            newTasks.forEach((task, index) => {
              if (task.priority === source.droppableId) {
                newTasks[index].order = items.findIndex(
                  (item) => item.name === task.name
                );
              }
            });
            return newTasks;
          });
        }
        break;
  
      default:
        break;
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Breadcrumb
          routeSegments={[
            { name: "List", path: `/projects/${space}` },
            { name: "Kanban", path: `/kanban/${space}` },
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
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container>
          <TaskColumnStyles>
            {group == "status" &&
              status.map((statusId, index) => {
                const filteredColumns = columns.filter(
                  (item) => item.status === statusId
                );
                console.log(statusId);
                return (
                  <Droppable key={statusId} droppableId={statusId}>
                    {(provided, snapshot) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Title>{statusId}</Title>
                        {filteredColumns.map((item, index) => (
                          <KanbanCard key={index} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                );
              })}
            {group == "priority" &&
              priority.map((statusId, index) => {
                const filteredColumns = columns.filter(
                  (item) => item.priority === statusId
                );
                console.log(statusId);
                return (
                  <Droppable key={statusId} droppableId={statusId}>
                    {(provided, snapshot) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <Title>{statusId}</Title>
                        {filteredColumns.map((item, index) => (
                          <KanbanCard key={index} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                );
              })}
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    </>
  );
};

export default Kanban;
