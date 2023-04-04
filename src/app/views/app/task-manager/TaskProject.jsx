import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@gull";
import { Dropdown, Accordion, Card, Button } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Container,
  DropContainer,
  Legend,
  ShowBadge,
} from "./task-dnd/components";
import { data } from "./data";
import { connect } from "react-redux";
import { getTaskList } from "app/redux/actions/TaskActions";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

class TaskProject extends Component {
  state = { ...data };

  componentDidMount() {}

  onDragEnd = ({ source, destination, draggableId }) => {
    // dropped inside of the list

    if (source && destination) {
      this.setState((prevState) => {
        // source container index and id
        const { index: sourceIndex, droppableId: sourceId } = source;

        // destination container index and id
        const { index: destinationIndex, droppableId: destinationId } =
          destination;

        // source container object
        const sourceContainer = prevState.statusColumns.find(
          (column) => column.id === sourceId
        );

        // desination container object
        const destinationContainer = prevState.columns.find(
          (column) => column.id === destinationId
        );

        // source container "userIds" array
        const sourceIds = Array.from(sourceContainer.userIds);

        // destination container "userIds" array
        const destinationIds = Array.from(destinationContainer.userIds);

        // check if source and destination container are the same
        const isSameContainer = sourceContainer.id === destinationContainer.id;

        //  remove a userId from the source "userIds" array via the sourceIndex
        sourceIds.splice(sourceIndex, 1);

        // add a userId (draggableId) to the source or destination "userIds" array
        if (isSameContainer) {
          sourceIds.splice(destinationIndex, 0, draggableId);
        } else {
          destinationIds.splice(destinationIndex, 0, draggableId);
        }

        // update the source container with changed sourceIds
        const newSourceContainer = {
          ...sourceContainer,
          userIds: sourceIds,
        };

        // update the destination container with changed destinationIds
        const newDestinationContainer = {
          ...destinationContainer,
          userIds: destinationIds,
        };

        // loop through current statusColumns and update the source
        // and destination containers
        const statusColumns = prevState.statusColumns.map((column) => {
          if (column.id === newSourceContainer.id) {
            return newSourceContainer;
          } else if (
            column.id === newDestinationContainer.id &&
            !isSameContainer
          ) {
            return newDestinationContainer;
          } else {
            return column;
          }
        });

        return {
          ...prevState,
          statusColumns,
        };
      });
    }
  };

  render() {
    let { statusColumns, priorityColumns, tasks } = this.state;

    return (
      <>
        <Accordion>
          <Accordion.Item>
            <Accordion.Header className="">
              <div className="d-flex gap-4">
                <h1>Enhancment Requests</h1>

                <i className="text-20 mt-12 i-Information"></i>
                <Button
                  key={"light"}
                  variant={"light"}
                  className="btn-rounded m-1 text-capitalize"
                >
                  + New Task
                </Button>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <Container>
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    {/* <Legend>
            <Title>Legend</Title>
            {responses.map(response => (
              <ShowBadge
                key={response}
                response={response}
                style={{ fontSize: 17 }}
                showLast
              >
                {response}
              </ShowBadge>
            ))}
          </Legend> */}

                    {statusColumns.map(({ id, title, taskIds }) => (
                      <DropContainer
                        id={id}
                        key={id}
                        title={title}
                        tasks={taskIds.map((id) =>
                          tasks.find((task) => task.id === id)
                        )}
                      />
                    ))}
                  </DragDropContext>
                </Container>
              </div>
              
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </>
    );
  }
}

export default TaskProject;
