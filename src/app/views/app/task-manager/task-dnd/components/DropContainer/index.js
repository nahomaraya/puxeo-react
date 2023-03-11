import React from "react";
import isEmpty from "lodash/isEmpty";
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
    <Title style={{ marginBottom: 5 }}>{title}</Title>
    <Droppable droppableId={id}>
      {({ innerRef, placeholder }, { isDraggingOver }) => (
        <UserContainer ref={innerRef} isDraggingOver={isDraggingOver}>
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
                    <ShowBadge response={status} style={{ margin: 0 }}>
                      {project} {status}
                    </ShowBadge>
                    <span />
                    {subject && (
                      <p style={{ margin: 0, fontStyle: "italic" }}>{subject}</p>
                    )}
                  </User>
                )}
              </Draggable>
            ))
          ) : (
            <NoData />
          )}
          {placeholder}
          <Footer />
        </UserContainer>
      )}
    </Droppable>
  </Column>
);

export default DropContainer;
