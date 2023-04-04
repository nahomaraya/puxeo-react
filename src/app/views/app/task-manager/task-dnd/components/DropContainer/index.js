import React from "react";
import isEmpty from "lodash/isEmpty";
import { Accordion } from "react-bootstrap";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Column,
  Footer,
  NoData,
  ShowBadge,
  Title,
  User,
  UserContainer,
} from "../index";
import styled from "styled-components";

const AddTask = styled.h6`
font-size: 0.5em;
text-align: start;
`;

const SubTaskkTitle = styled.h2`
  font-size: 1em;
  text-align: center;
  margin-right: 100px;
  color: palevioletred;
`;

const TaskColumn = styled.h2`
  padding-left: 40px;
  font-size: 1em;
  text-align: start;
  color: palevioletred;
`;

const TaskTitle = styled.h2`
  padding-left: 40px;
  font-size: 1.3em;
  text-align: start;
  color: palevioletred;
`;

const TaskSubject = styled.h1`
  padding-left: 40px;
  font-size: 1.3em;
  text-align: start;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles

const Flexrow = styled.div`
  display: flex;
`;

const Flexcolumn = styled.div`
  text-align: center;
  color: white;
  margin: 2px;
  width: ${(props) => (props.size / 24) * 100}vw;
`;

const DropContainer = ({ id, title, tasks }) => {
  console.log(tasks);
  return (
    <Column>
      <Title style={{ marginBottom: 5 }}>
        <div className="">
          {/* <span>{title} </span> &nbsp;&nbsp;&nbsp;
          <span>{tasks.length} Tasks</span>
          <span className="flex-grow-1"></span>
          <div className="d-flex align-items-center gap-5">
            <TaskHeader>Project</TaskHeader>
            <TaskHeader>Status</TaskHeader>
            <TaskHeader>Prority</TaskHeader>
            <TaskHeader>Type</TaskHeader>
          </div> */}
          <Flexrow>
            <Flexcolumn size={6}>
              <Flexrow>
                <span ><TaskSubject>{title}</TaskSubject> </span> &nbsp;&nbsp;&nbsp;
                <span><AddTask> {tasks.length} Tasks</AddTask></span>
                {/* <span>{priority} </span>
                                <span className="flex-grow-1"></span> */}
              </Flexrow>
            </Flexcolumn>

            <Flexcolumn size={12}>
              <Flexrow>
                <Flexcolumn size={4}>
                  <TaskTitle>Project</TaskTitle>
                </Flexcolumn>
                <Flexcolumn size={4}>
                  <TaskTitle>Status</TaskTitle>
                </Flexcolumn>
                <Flexcolumn size={4}>
                  <TaskTitle>Priority</TaskTitle>
                </Flexcolumn>
                <Flexcolumn size={4}>
                  <TaskTitle>Project</TaskTitle>
                </Flexcolumn>
              </Flexrow>
            </Flexcolumn>
          </Flexrow>
        </div>
      </Title>

      <Droppable droppableId={id}>
        {({ innerRef, placeholder }, { isDraggingOver }) => (
          <UserContainer ref={innerRef} isDraggingOver={isDraggingOver}>
            <Accordion>
              {!isEmpty({ tasks }) ? (
                tasks.map(({ id, priority, project, status }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(
                      {
                        draggableProps,
                        dragHandleProps: eventHandlers,
                        innerRef,
                      },
                      { isDragging }
                    ) => (
                      <User
                        ref={innerRef}
                        {...draggableProps}
                        {...eventHandlers}
                        isDragging={isDragging}
                      >
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header className="">
                            <div className="d-flex  flex-row align-items-center">
                              <Flexrow>
                                <Flexcolumn size={6}>
                                  <TaskTitle>{priority}</TaskTitle>
                                  {/* <span>{priority} </span>
                                <span className="flex-grow-1"></span> */}
                                </Flexcolumn>

                                <Flexcolumn size={12}>
                                  <Flexrow>
                                    <Flexcolumn size={4}>
                                      <TaskColumn>{project}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={4}>
                                      <TaskColumn>{status}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={4}>
                                      <TaskColumn>{priority}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={4}>
                                      <TaskColumn>{project}</TaskColumn>
                                    </Flexcolumn>
                                  </Flexrow>
                                </Flexcolumn>
                              </Flexrow>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div id="custom-toggle">
                              {/* <div className="d-flex align-items-center gap-4 ">
                                <SubTaskkTitle>{priority}</SubTaskkTitle>
                                <span className="flex-grow-1"></span>

                                <div className="d-flex align-items-center gap-5">
                                  <TaskTitle>{project}</TaskTitle>
                                  <TaskTitle>{status}</TaskTitle>
                                  <TaskTitle>{priority}</TaskTitle>
                                  <TaskTitle>{project}</TaskTitle>
                                </div>
                              </div> */}

                              <div className="mt-3 mb-4 border-top"></div>
                              <Flexrow>
                                <Flexcolumn size={12}>
                                  <SubTaskkTitle>{priority}</SubTaskkTitle>
                                  {/* <span>{priority} </span>
                           <span className="flex-grow-1"></span> */}
                                </Flexcolumn>

                                <Flexcolumn size={6}>
                                  <Flexrow>
                                    <Flexcolumn size={2}>
                                      <TaskColumn>{project}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={2}>
                                      <TaskColumn>{status}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={2}>
                                      <TaskColumn>{priority}</TaskColumn>
                                    </Flexcolumn>
                                    <Flexcolumn size={2}>
                                      <TaskColumn>{project}</TaskColumn>
                                    </Flexcolumn>
                                  </Flexrow>
                                </Flexcolumn>
                              </Flexrow>
                            </div>
                            {/* <textarea
                              className=""
                              placeholder="Type your message"
                              name="message"
                              id="message"
                              cols="30"
                              rows="3"
                              // onChange={}
                              // onKeyUp={}
                              // value={message}
                            ></textarea> */}
                          </Accordion.Body>
                        </Accordion.Item>

                        {/* <ShowBadge response={status} style={{ margin: 0 }}>
                      {project} {status}
                    </ShowBadge>
                    <span />
                    {subject && (
                      <p style={{ margin: 0, fontStyle: "italic" }}>{subject}</p>
                    )} */}
                      </User>
                    )}
                  </Draggable>
                ))
              ) : (
                <NoData />
              )}
              {placeholder}
              <Footer />
            </Accordion>
          </UserContainer>
        )}
        
      </Droppable>
    </Column>
  );
};

export default DropContainer;
