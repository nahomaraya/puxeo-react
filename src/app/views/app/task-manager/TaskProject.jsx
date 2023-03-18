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
import {data} from './task-dnd/data'
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
    state = {
        groupBy :"priority",
        grouped: false,
        loading: true,
        ...data,
       
      };

    //   componentDidMount(){
    //     const timer = setTimeout(()=> {
    //       this.setState({loading: false})
    //    }, 5000);
       
    //    this.props.fetchTask();
     
    //    return () => {
    //      clearTimeout(timer);
        
    //   }
     
    // }

    onDragEnd = ({ source, destination, draggableId }) => {
        // dropped inside of the list
     
        
        if (source && destination) {
          this.setState(prevState => {
            let initColumns = [];
            let sourceContainer = [{}];
            let destinationContainer = [{}] ;
    
              // source container index and id
          
           
          
            // destination container index and id
    
            const { index: sourceIndex, droppableId: sourceId } = source;
            const {
              index: destinationIndex,
              droppableId: destinationId
            } = destination;
           
              // source container object
              // desination container object
            if(this.state.groupBy=="priority"){
              
                sourceContainer = prevState.priorityColumns.find(column => column.id === sourceId)
                console.log(sourceContainer)
                destinationContainer =  prevState. priorityColumns.find( column => column.id === destinationId )
            }
            else if(this.state.groupBy=="status"){
              sourceContainer = prevState.statusColumns.find(column => column.id === sourceId);
              console.log(sourceContainer)
              destinationContainer =  prevState.statusColumns.find( column => column.id === destinationId )
              
            }
          
          
           
          
            
            
    
            // source container "userIds" array
           
            const sourceIds = Array.from(sourceContainer.taskIds);
    
            // destination container "userIds" array
            const destinationIds = Array.from(destinationContainer.taskIds);
    
            // check if source and destination container are the sataskIdme
            const isSameContainer = sourceContainer.id === destinationContainer.id;
            console.log(sourceIndex)
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
              taskIds: sourceIds
            };
    
            // update the destination container with changed destinationIds
            const newDestinationContainer = {
              ...destinationContainer,
              taskIds: destinationIds
            };
    
            // loop through current columns and update the source
            // and destination containers
            const statusColumns = 
           
            prevState.statusColumns.map(column => {
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
            const priorityColumns = 
              prevState.priorityColumns.map(column => {
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
              })
            
              console.log(priorityColumns)
            
            
           
            
            return {
              ...prevState,
              statusColumns,
              priorityColumns
            };
          });
        }
      };


      render() {

        return (
            <>
             <Accordion>
             <Accordion.Item >
                <Accordion.Header className="" >
                    <div className="d-flex gap-4">
                    <h1>Enhancment Requests</h1>
                   
                    <i className='text-20 mt-12 i-Information'></i>
                    <Button
                    key={'light'}
                    variant={'light'}
                    className="btn-rounded m-1 text-capitalize"
                  >
                    + New Task
                  </Button>

                    </div>

                </Accordion.Header>
                <Accordion.Body>

                </Accordion.Body>

                </Accordion.Item>
             </Accordion>
            
            
            </>
        )


      }


}

export default TaskProject;
