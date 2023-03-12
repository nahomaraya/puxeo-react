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
  UserContainer
} from "../index";

const DropContainer = ({ id, title, tasks }) => (
  <Column>
    <Title style={{ marginBottom: 5 }}>
    <div className="d-flex  flex-row align-items-center">
   
      <span>{title} </span> 
      <span className="flex-grow-1"></span>
    
      <div className="d-flex align-items-center gap-4" >
      <span style={{ }}> Project</span>
      <span > Status</span>
      <span style={{ }}> Prority</span>
      <span > Type</span>
      </div>
      </div>

    </Title>
   
    <Droppable droppableId={id}>
      {({ innerRef, placeholder }, { isDraggingOver }) => (
        <UserContainer ref={innerRef} isDraggingOver={isDraggingOver}>
              <Accordion defaultActiveKey="search">   
          {!isEmpty(tasks) ? (
            tasks.map(({ id, project, subject, status }, index) => (
            
              <Draggable key={id} draggableId={id} index={index}>
                {(
                  { draggableProps, dragHandleProps: eventHandlers, innerRef },
                  { isDragging }
                ) => (
                  <User
                    ref={innerRef}
                    {...draggableProps}
                    {...eventHandlers}
                    isDragging={isDragging}
                  >
              
              <Accordion.Item eventKey={index} >
                <Accordion.Header className="" >
              
 
                
  
   <span className="">{project}</span>
 
  
               
                </Accordion.Header>
                <Accordion.Body >
                  <div id="custom-toggle">
                 
                     <div className="d-flex  flex-row align-items-center">
   
   <span>{project} </span> 
   <span className="flex-grow-1"></span>
 
   <div className="d-flex align-items-center gap-4" >
   <span style={{ }}> {project}</span>
   <span >{status}</span>
   <span style={{ }}>priority</span>
   <span >type</span>
   </div>
   </div>

   <div className="mt-3 mb-4 border-top"></div>
          <div className="row mb-5">
            <div className="col-md-6 mb-3 mb-sm-0">
              <h5 className="font-weight-bold">Bill From</h5>
              <p>billing date</p>
              <span className="white-space-pre-line">
                billing address
              </span>
            </div>
            <div className="col-md-6 text-sm-right">
              <h5 className="font-weight-bold">Bill To</h5>
              <p>buying data</p>
              <span className="white-space-pre-line">
                buying date
              </span>
            </div>
          </div>
      
                  </div>
                  <textarea
                  className=""
                  placeholder="Type your message"
                  name="message"
                  id="message"
                  cols="30"
                  rows="3"
                  // onChange={}
                  // onKeyUp={}
                  // value={message}
                ></textarea>
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

export default DropContainer;
