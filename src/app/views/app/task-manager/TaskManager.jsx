import React, { Component } from "react";
import { Breadcrumb } from "@gull";
import { Dropdown, Accordion, Card } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Container,
  DropContainer,
  Legend,
  ShowBadge,
  Title
} from "./task-dnd/components";
import {data} from './task-dnd/data'
import { connect } from "react-redux";
import { getTaskList } from "app/redux/actions/TaskActions";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

class TaskManager extends Component {
  state = {
    groupBy :"status",
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
            destinationContainer =  prevState. priorityColumns.find( column => column.id === destinationId )
        }
        else if(this.state.groupBy=="status"){
          sourceContainer = prevState.statusColumns.find(column => column.id === sourceId);
          destinationContainer =  prevState.statusColumns.find( column => column.id === destinationId )
          
        }
      
      
       
      
        
        

        // source container "userIds" array
       
        const sourceIds = Array.from(sourceContainer.taskIds);

        // destination container "userIds" array
        const destinationIds = Array.from(destinationContainer.taskIds);

        // check if source and destination container are the sataskIdme
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

        
        
       
        
        return {
          ...prevState,
          statusColumns,
          priorityColumns
        };
      });
    }
  };

  handlePageClick = (data) => {
    let currentPage = data.selected;
    this.setState({ currentPage });
  };

  render() {
    let { notificationList, currentPage, itemPerPage, tasks, groupBy, statusColumns, priorityColumns  } = this.state;
    
    return (
      <div>
        <Breadcrumb
          routeSegments={[
            { name: "Home", path: "/" },
            { name: "Task Manager" },
          ]}
        ></Breadcrumb>

        <div className="row mb-4">
          <div className="col-xl-10">
            <div className="navbar navbar-expand-lg navbar-light navbar-component rounded">
              <div className="text-center d-lg-none w-100">
                <button
                  type="button"
                  className="task-manager-button navbar-toggler text-white"
                  data-toggle="collapse"
                  data-target="#navbar-filter"
                >
                  <i className="i-Filter-2"> </i>
                </button>
              </div>

              <div className="navbar-collapse collapse" id="navbar-filter">
                <div className="filter-mobile">
                  <span className="navbar-text fw-semibold ">Filter:</span>
                </div>

                <ul className="navbar-nav flex-wrap">
                  <Dropdown className="nav-item mx-2">
                    <Dropdown.Toggle
                      as="span"
                      className="toggle-hidden cursor-pointer"
                    >
                      <Link className="navbar-nav-link" to="#">
                        <i className="i-Time-Window "> </i> By date
                      </Link>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Show all</Dropdown.Item>
                      <Dropdown.Divider></Dropdown.Divider>
                      <Dropdown.Item>Today</Dropdown.Item>
                      <Dropdown.Item>Yesterday</Dropdown.Item>
                      <Dropdown.Item>This week</Dropdown.Item>
                      <Dropdown.Item>This month</Dropdown.Item>
                      <Dropdown.Item>This year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="nav-item mx-2">
                    <Dropdown.Toggle
                      as="span"
                      className="toggle-hidden cursor-pointer"
                    >
                      <Link className="navbar-nav-link" to="#">
                        <i className="i-Bar-Chart-2 "></i> By status
                      </Link>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Show all</Dropdown.Item>
                      <Dropdown.Divider></Dropdown.Divider>
                      <Dropdown.Item>Open</Dropdown.Item>
                      <Dropdown.Item>On hold</Dropdown.Item>
                      <Dropdown.Item>Resolved</Dropdown.Item>
                      <Dropdown.Item>Closed</Dropdown.Item>
                      <Dropdown.Item>Duplicate</Dropdown.Item>
                      <Dropdown.Item>Invalid</Dropdown.Item>
                      <Dropdown.Item>Wontfix</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown className="nav-item mx-2">
                    <Dropdown.Toggle
                      as="span"
                      className="toggle-hidden cursor-pointer"
                    >
                      <Link className="navbar-nav-link" to="#">
                        <i className="i-Arrow-Turn-Right "></i> By priority
                      </Link>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Show all</Dropdown.Item>
                      <Dropdown.Divider></Dropdown.Divider>
                      <Dropdown.Item>Highest</Dropdown.Item>
                      <Dropdown.Item>High</Dropdown.Item>
                      <Dropdown.Item>Normal</Dropdown.Item>
                      <Dropdown.Item>Low</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </div>
              <label>
                    <span   className="col-sm-2 col-form-label me-2">Group By</span>
                    <select>
                    <option value="15" onClick={() => {this.setState({groupBy:"status"}); console.log(this.state.groupBy)}}>Status</option>
                    <option value="50"  onClick={() => {this.setState({groupBy:"priority"}); console.log(this.state.groupBy)}} defaultValue>Priortiy</option>
                    
                     
                    </select>
                  </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9">
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
         
         {groupBy=="priority" && 
          priorityColumns.map(({ id, title, taskIds }) => (
            <DropContainer
              id={id}
              key={id}
              title={title}
              tasks={taskIds.map(id => tasks.find(task => task.id === id))}
            />
          ))}
           {groupBy=="status" && 
          statusColumns.map(({ id, title, taskIds }) => (
            <DropContainer
              id={id}
              key={id}
              title={title}
              tasks={taskIds.map(id => tasks.find(task => task.id === id))}
            />
          ))}
        </DragDropContext>
      </Container>
              {/* {notificationList
                .slice(
                  currentPage * itemPerPage,
                  (currentPage + 1) * itemPerPage
                )
                .map((item, ind) => (
                  <div key={ind} className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="d-sm-flex align-item-sm-center flex-sm-nowrap">
                          <div>
                            <h6>
                              <Link to="#">{item.title}</Link>
                            </h6>
                            <p className="ul-task-manager__paragraph mb-3">
                              {item.text}
                            </p>

                            <Link to="#">
                              <img
                                src="/assets/images/faces/1.jpg"
                                className="rounded-circle"
                                width="36"
                                height="36"
                                alt="corrupted"
                              />
                            </Link>
                            <Link to="#">
                              <img
                                src="/assets/images/faces/1.jpg"
                                className="rounded-circle"
                                width="36"
                                height="36"
                                alt="corrupted 2"
                              />
                            </Link>
                            <Link to="#">
                              <img
                                src="/assets/images/faces/1.jpg"
                                className="rounded-circle"
                                width="36"
                                height="36"
                                alt="corrupted 2"
                              />
                            </Link>
                            <Link to="#">
                              <i className="ml-1 ul-task-manager__fonts i-Add text-32 align-middle"></i>
                            </Link>
                          </div>

                          <ul className="list list-unstyled mb-0 mt-3 mt-sm-0 ms-auto">
                            <li>
                              <small className="ul-task-manager__font-date text-muted">
                                {item.date}
                              </small>
                            </li>
                            <Dropdown className="list-inline-item my-1">
                              <Dropdown.Toggle
                                as="span"
                                className="toggle-hidden cursor-pointer d-flex flex-wrap align-items-center"
                              >
                                <span>Priority: &nbsp;</span>
                                <Link
                                  className="badge bg-danger align-top dropdown-toggle"
                                  data-toggle="dropdown"
                                  to="#"
                                >
                                  Blocker
                                </Link>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <span className="badge bg-mark mr-2 border-danger"></span>
                                  Blocker
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <span className="badge bg-mark mr-2 border-warning-400"></span>
                                  High priority
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <span className="badge bg-mark mr-2 border-success"></span>
                                  Normal priority
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <span className="badge bg-mark mr-2 border-grey-300"></span>
                                  Low priority
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                            <li>
                              <Link to="#">Eternity app</Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="card-footer d-sm-flex justify-content-sm-between align-items-sm-center">
                        <span>
                          Due:
                          <span className="fw-semibold">18 hours</span>
                        </span>

                        <ul className="list-inline mb-0 mt-2 mt-sm-0">
                          <Dropdown className="list-inline-item">
                            <Dropdown.Toggle
                              as="span"
                              className="toggle-hidden cursor-pointer"
                            >
                              On Hold
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>Open</Dropdown.Item>
                              <Dropdown.Item>On hold</Dropdown.Item>
                              <Dropdown.Item>Resolved</Dropdown.Item>
                              <Dropdown.Item>Closed</Dropdown.Item>
                              <Dropdown.Divider></Dropdown.Divider>
                              <Dropdown.Item>Dublicate</Dropdown.Item>
                              <Dropdown.Item>Invalid</Dropdown.Item>
                              <Dropdown.Item>Wontfix</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>

                          <Dropdown className="list-inline-item">
                            <Dropdown.Toggle
                              as="span"
                              className="toggle-hidden cursor-pointer"
                            >
                              <i className="i-Gear-2"> </i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <i className="i-Bell"> </i> Check in
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="i-Favorite-Window"> </i> Attach
                                screenshot
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="i-Medal-3"> </i> Reassign
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="i-Edit"> </i> Edit task
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i className="i-Paint-Brush"> </i> Remove
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))} */}
            </div>

            {/* <!-- pagination --> */}
            <div className="row mt-4">
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(notificationList.length / itemPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={itemPerPage}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination pagination-lg"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <Accordion className="mb-3" defaultActiveKey="search">
              <Accordion.Item eventKey="search">
                <Accordion.Header className="w-100" eventKey="search">
                  Search Task
                </Accordion.Header>
                <Accordion.Body eventKey="search">
                  <div id="custom-toggle">
                    <input
                      type="text"
                      placeholder="type  &  hit enter"
                      className="form-control"
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-3" defaultActiveKey="actions">
              <Accordion.Item eventKey="actions">
                <Accordion.Header className="w-100" eventKey="search">
                  Actions
                </Accordion.Header>
                <Accordion.Body eventKey="actions">
                  <div id="custom-toggle2">
                    <h5 className="card-title">Light card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-3" defaultActiveKey="navigation">
              <Accordion.Item eventKey="navigation">
                <Accordion.Header className="w-100" eventKey="search">
                  Navigation
                </Accordion.Header>
                <Accordion.Body eventKey="navigation">
                  <div id="custom-toggle3">
                    <p className="card-text">Actions</p>

                    <div className="list-group">
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <span className="custom-font">
                          <i className="i-Add-Window"> </i>
                        </span>
                        Create Task
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action "
                      >
                        <i className="i-Empty-Box"> </i> Create Project
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Edit"> </i> Edit Task List
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Add-User"> </i> Assign User
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action disabled"
                      >
                        <i className="i-Business-Mens"> </i> Create Team
                      </Link>
                    </div>
                    <div className="mb-4"></div>

                    <p className="card-text">Tasks</p>

                    <div className="list-group">
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <span className="custom-font">
                          <i className="i-Folders"> </i>
                        </span>
                        All Tasks
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action "
                      >
                        <i className="i-Add-File"> </i> Active Tasks
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Close-Window"> </i> Closed Tasks
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Administrator"> </i> Assigned To Me
                        <span className="badge badge-primary badge-pill ml-4">
                          14
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Conference"> </i> Assigned To My Team
                        <span className="badge badge-primary badge-pill ml-4">
                          14
                        </span>
                      </Link>
                      <Link
                        to="#"
                        className="list-group-item list-group-item-action"
                      >
                        <i className="i-Gears"> </i> Settings
                      </Link>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-3" defaultActiveKey="Assigners">
              <Accordion.Item eventKey="Assigners">
                <Accordion.Header className="w-100" eventKey="search">
                  Assigners
                </Accordion.Header>
                <Accordion.Body eventKey="Assigners">
                  <div id="custom-toggle4">
                    <ul className="media-list">
                      <li className="media mb-2">
                        <Link to="#" className="mr-4">
                          <img
                            src="../assets/images/faces/1.jpg"
                            className="rounded-circle"
                            width="36"
                            alt="asd"
                            srcSet=""
                          />
                        </Link>
                        <div className="ul-task-manager__media">
                          <Link to="#">James Alexander gull</Link>
                          <div className="font-size-sm text-muted">
                            Santa Ana,CA
                          </div>
                        </div>
                        <div className="ml-3 align-self-center">
                          <span className="badge bg-mark"></span>
                        </div>
                      </li>

                      <li className="media mb-2">
                        <Link to="#" className="mr-4">
                          <img
                            src="../assets/images/faces/1.jpg"
                            className="rounded-circle"
                            width="36"
                            alt="asd"
                            srcSet=""
                          />
                        </Link>
                        <div className="ul-task-manager__media">
                          <Link to="#">James Alexander</Link>
                          <div className="font-size-sm text-muted">
                            Santa Ana,CA
                          </div>
                        </div>
                        <div className="ml-3 align-self-center">
                          <span className="badge bg-mark "></span>
                        </div>
                      </li>

                      <li className="media mb-2">
                        <Link to="#" className="mr-4">
                          <img
                            src="../assets/images/faces/1.jpg"
                            className="rounded-circle"
                            width="36"
                            alt="asd"
                            srcSet=""
                          />
                        </Link>
                        <div className="ul-task-manager__media">
                          <Link to="#">James Alexander</Link>
                          <div className="font-size-sm text-muted">
                            Santa Ana,CA
                          </div>
                        </div>
                        <div className="ml-3 align-self-center">
                          <span className="badge bg-mark"></span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-3" defaultActiveKey="Revisions">
              <Accordion.Item eventKey="Revisions">
                <Accordion.Header className="w-100" eventKey="search">
                  Revisions
                </Accordion.Header>
                <Accordion.Body eventKey="Revisions">
                  <div id="custom-toggle5">
                    <li className="media mb-3">
                      <Link to="#" className="revision-font mt-1">
                        <i className="i-Arrow-Down-in-Circle mr-2 text-28"></i>
                      </Link>
                      <div className="ul-task-manager__media">
                        <p className="revisions-p">
                          Add full font overrides for popovers and tooltips
                        </p>
                        <div className="font-size-sm text-muted">
                          24 minutes ago
                        </div>
                      </div>
                    </li>

                    <li className="media mb-3">
                      <Link to="#" className="revision-font mt-1">
                        <i className="i-Arrow-Down-in-Circle mr-2 text-28 align-middle"></i>
                      </Link>
                      <div className="ul-task-manager__media">
                        <p className="revisions-p">
                          Add full font overrides for popovers and tooltips
                        </p>
                        <div className="font-size-sm text-muted">
                          24 minutes ago
                        </div>
                      </div>
                    </li>

                    <li className="media mb-3">
                      <Link to="#" className="revision-font mt-1">
                        <i className="i-Arrow-Down-in-Circle mr-2 text-28"></i>
                      </Link>
                      <div className="ul-task-manager__media">
                        <p className="revisions-p">
                          Chris Arney created a new Design branch
                        </p>
                        <div className="font-size-sm text-muted">
                          2 hours ago
                        </div>
                      </div>
                      <div className="ml-3 align-self-center">
                        <span className="badge bg-mark"></span>
                      </div>
                    </li>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Accordion className="mb-3" defaultActiveKey="Completeness">
              <Accordion.Item eventKey="Completeness">
                <Accordion.Header className="w-100" eventKey="search">
                  Completeness Stats
                </Accordion.Header>
                <Accordion.Body eventKey="Completeness">
                  <div id="custom-toggle6">
                    <ul className="list-unstyled mb-0">
                      <li className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          Blockers
                          <span className="text-muted ml-auto">50%</span>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "0.125rem" }}
                        >
                          <div className="progress-bar bg-danger w-50">
                            <span className="sr-only">50% Complete</span>
                          </div>
                        </div>
                      </li>

                      <li className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          High priority
                          <span className="text-muted ml-auto">70%</span>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "0.125rem" }}
                        >
                          <div
                            className="progress-bar bg-warning-400"
                            style={{ width: "70%" }}
                          >
                            <span className="sr-only">70% Complete</span>
                          </div>
                        </div>
                      </li>

                      <li className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          Normal priority
                          <span className="text-muted ml-auto">80%</span>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "0.125rem" }}
                        >
                          <div
                            className="progress-bar bg-success-400"
                            style={{ width: "80%" }}
                          >
                            <span className="sr-only">80% Complete</span>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="d-flex align-items-center mb-1">
                          Low priority
                          <span className="text-muted ml-auto">60%</span>
                        </div>
                        <div
                          className="progress"
                          style={{ height: "0.125rem" }}
                        >
                          <div
                            className="progress-bar bg-grey-400"
                            style={{ width: "60%" }}
                          >
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//       tasks: state.taskReducer.taskList,
    
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//       fetchTask: ()=> dispatch(getTaskList())
//   };
// };

export default TaskManager;
